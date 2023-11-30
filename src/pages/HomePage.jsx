import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveNotes } from '../utils/network-data'
import NotesEmptyPage from './NotesEmptyPage'
import NotesList from '../components/notes/NotesList'
import AddButton from '../components/button/AddButton'
import SearchBar from '../components/SearchBar'
import { LocaleConsumer } from '../context/LocaleContext'
import { chaoticOrbit } from 'ldrs'

const HomePage = () => {
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
        const { data } = await getActiveNotes()
        setNotes(data)
        setIsLoading(false)
      } catch (error) {
        alert('Terjadi kegagalan saat melakukan mengambil data catatan :(')
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
          <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            {notes.length <= 0 ? (
              <>
                <NotesEmptyPage />
                <div className="homepage__action">
                  <AddButton />
                </div>
              </>
            ) : (
              <>
                <NotesList notes={filteredNotes} />
                <div className="homepage__action">
                  <AddButton />
                </div>
              </>
            )}
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

export default HomePage
