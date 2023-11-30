import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveNotes } from '../utils/network-data'
import NotesEmptyPage from './NotesEmptyPage'
import NotesList from '../components/notes/NotesList'
import AddButton from '../components/button/AddButton'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultKeyword = searchParams.get('keyword')

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState(defaultKeyword || '')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { error, data } = await getActiveNotes()
        if (error) {
          // Handle error accordingly
        } else {
          setNotes(data)
          setIsLoading(false)
        }
      } catch (error) {
        // Handle error accordingly
        setIsLoading(false)
      }
    }

    fetchData()
  }, []) // useEffect akan dijalankan hanya sekali setelah render pertama

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
        <h2>LOADING ...</h2>
      </section>
    )
  }

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
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
}

export default HomePage
