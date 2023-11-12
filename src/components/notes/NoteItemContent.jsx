import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { showFormattedDate } from '../../utils'

function NoteItemContent({ id, title, createdAt, body }) {
  return (
    <div className="note-item__content">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{body}</p>
    </div>
  )
}

NoteItemContent.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default NoteItemContent
