import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveNotes } from '../utils/local-data'
import NotesEmptyPage from './NotesEmptyPage'
import NotesList from '../components/notes/NotesList'
import AddButton from '../components/button/AddButton'
import SearchBar from '../components/SearchBar'

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  function changeSearchParams(keyword) {
    setSearchParams({ keyword })
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: getActiveNotes(),
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
        <section className="homepage">
          <h2>Catatan Aktif</h2>
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
          <NotesEmptyPage />
          <div className="homepage__action">
            <AddButton />
          </div>
        </section>
      )
    } else {
      return (
        <section className="homepage">
          <h2>Catatan Aktif</h2>
          <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
          <NotesList notes={notes} />
          <div className="homepage__action">
            <AddButton />
          </div>
        </section>
      )
    }
  }
}

export default HomePageWrapper
