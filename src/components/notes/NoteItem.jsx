import React from 'react'
import PropTypes from 'prop-types'
import NoteItemContent from './NoteItemContent'

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <NoteItemContent id={id} title={title} body={body} createdAt={createdAt} />
    </div>
  )
}

NoteItem.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default NoteItem
