import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addNote } from '../utils/local-data'
import NoteAdd from '../components/notes/NoteAdd'

function AddNotePage() {
  const navigate = useNavigate()

  function onAddNoteHandler(note) {
    addNote(note)
    navigate('/')
  }

  return <NoteAdd addNote={onAddNoteHandler} />
}

export default AddNotePage
