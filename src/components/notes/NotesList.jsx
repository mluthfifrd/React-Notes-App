import React from 'react'
import NoteItem from './NoteItem'
import PropTypes from 'prop-types'

function NotesList({ notes }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </div>
  )
}

NotesList.prototype = {
  notes: PropTypes.object.isRequired
}

export default NotesList
