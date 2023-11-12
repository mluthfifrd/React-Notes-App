import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getArchivedNotes } from '../utils/local-data'
import NotesEmptyPage from './NotesEmptyPage'
import NotesList from '../components/notes/NotesList'
import SearchBar from '../components/SearchBar'

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  function changeSearchParams(keyword) {
    setSearchParams({ keyword })
  }

  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || ''
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this)
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword
      }
    })

    this.props.keywordChange(keyword)
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    })

    if (this.state.notes.length <= 0) {
      return (
        <section className="archives-page">
          <h2>Catatan Arsip</h2>
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
          <NotesEmptyPage />
        </section>
      )
    } else {
      return (
        <section className="archives-page">
          <h2>Catatan Arsip</h2>
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
          <NotesList notes={notes} />
        </section>
      )
    }
  }
}

export default ArchivePageWrapper
