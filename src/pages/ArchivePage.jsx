import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getArchivedNotes } from '../utils/network-data'
import NotesEmptyPage from './NotesEmptyPage'
import NotesList from '../components/notes/NotesList'
import SearchBar from '../components/SearchBar'
import { LocaleConsumer } from '../context/LocaleContext'
import { chaoticOrbit } from 'ldrs'

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultKeyword = searchParams.get('keyword')

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState(defaultKeyword || '')

  chaoticOrbit.register()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await getArchivedNotes()
        setNotes(data)
        setIsLoading(false)
      } catch (error) {
        alert('Terjadi kegagalan saat melakukan mengambil data arsip catatan :(')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword)
    setSearchParams({ keyword: newKeyword })
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase())
  })

  if (isLoading) {
    return (
      <section className="homepage">
        <div className="load-data">
          <div className="loading">
            <l-chaotic-orbit size="100" speed="1.5" color="gray"></l-chaotic-orbit>
          </div>
          <h2>Loading...</h2>
        </div>
      </section>
    )
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="archives-page">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            {notes.length <= 0 ? (
              <>
                <NotesEmptyPage />
              </>
            ) : (
              <>
                <NotesList notes={filteredNotes} />
              </>
            )}
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

export default ArchivePage
