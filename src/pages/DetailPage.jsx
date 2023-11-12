import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data'
import { showFormattedDate } from '../utils'
import ArchiveButton from '../components/button/ArchiveButton'
import DeleteButton from '../components/button/DeleteButton'
import UnArchiveButton from '../components/button/UnArchiveButton'

function DetailPageWrapper() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note, setNote] = useState(getNote(id))

  useEffect(() => {
    setNote(getNote(id))
  }, [id])

  function handleDeleteSuccess() {
    deleteNote(id)
    setNote(getNote(id))
    navigate('/')
  }

  function handleArchiveSuccess() {
    archiveNote(id)
    setNote(getNote(id))
    navigate('/')
  }

  function handleUnArchiveSuccess() {
    unarchiveNote(id)
    setNote(getNote(id))
    navigate('/')
  }

  return (
    <DetailPage
      id={id}
      note={note}
      onDeleteSuccess={handleDeleteSuccess}
      onArchiveSuccess={handleArchiveSuccess}
      onUnArchiveSuccess={handleUnArchiveSuccess}
    />
  )
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      note: getNote(props.id)
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onArchiveHandler = this.onArchiveHandler.bind(this)
    this.onUnArchiveHandler = this.onUnArchiveHandler.bind(this)
  }

  onDeleteHandler(id) {
    deleteNote(id)

    this.props.onDeleteSuccess()
  }

  onArchiveHandler(id) {
    archiveNote(id)

    this.props.onArchiveSuccess()
  }

  onUnArchiveHandler(id) {
    unarchiveNote(id)

    this.props.onUnArchiveSuccess()
  }

  render() {
    const { id, title, body, createdAt, archived } = this.state.note

    if (this.state.note === null || this.state.note === undefined) {
      return (
        <section className="detail-page">
          <h2>Catatan Tidak Ditemukan</h2>
        </section>
      )
    } else if (archived === true) {
      return (
        <section className="detail-page">
          <h3 className="detail-page__title">{title}</h3>
          <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
          <p className="detail-page__body">{body}</p>
          <div className="detail-page__action">
            <UnArchiveButton id={Number(id)} onUnArchive={this.onUnArchiveHandler} />
            <DeleteButton id={Number(id)} onDelete={this.onDeleteHandler} />
          </div>
        </section>
      )
    } else {
      return (
        <section className="detail-page">
          <h3 className="detail-page__title">{title}</h3>
          <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
          <p className="detail-page__body">{body}</p>
          <div className="detail-page__action">
            <ArchiveButton id={Number(id)} onArchive={this.onArchiveHandler} />
            <DeleteButton id={Number(id)} onDelete={this.onDeleteHandler} />
          </div>
        </section>
      )
    }
  }
}

export default DetailPageWrapper
