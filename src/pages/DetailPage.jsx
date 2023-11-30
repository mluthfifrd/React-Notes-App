import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data'
import { showFormattedDate } from '../utils'
import ArchiveButton from '../components/button/ArchiveButton'
import DeleteButton from '../components/button/DeleteButton'
import UnArchiveButton from '../components/button/UnArchiveButton'
import { chaoticOrbit } from 'ldrs'

function DetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  chaoticOrbit.register()

  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true)
      try {
        const fetchedNote = await getNote(id)
        setNote(fetchedNote)
        setIsLoading(false)
      } catch (error) {
        alert('Terjadi kegagalan saat melakukan mengambil data catatan :(')
        setIsLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDeleteSuccess = async () => {
    try {
      await deleteNote(id)
      setNote(null)
      navigate('/')
    } catch (error) {
      alert('Terjadi kegagalan saat menghapus catatan :(')
    }
  }

  const handleArchiveSuccess = async () => {
    try {
      await archiveNote(id)
      const updatedNote = await getNote(id)
      setNote(updatedNote)
      navigate('/')
    } catch (error) {
      alert('Terjadi kegagalan saat mengarsipkan catatan :(')
    }
  }

  const handleUnArchiveSuccess = async () => {
    try {
      await unarchiveNote(id)
      const updatedNote = await getNote(id)
      setNote(updatedNote)
      navigate('/')
    } catch (error) {
      alert('Terjadi kegagalan saat tidak mengarsipkan catatan :(')
    }
  }

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

  if (!note || note === null || note.data === null) {
    return (
      <section className="detail-page">
        <h2>Catatan Tidak Ditemukan</h2>
      </section>
    )
  }

  const { title, body, createdAt, archived } = note.data

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="detail-page__body">{body}</p>
      <div className="detail-page__action">
        {archived ? (
          <>
            <UnArchiveButton id={Number(id)} onUnArchive={handleUnArchiveSuccess} />
            <DeleteButton id={Number(id)} onDelete={handleDeleteSuccess} />
          </>
        ) : (
          <>
            <ArchiveButton id={Number(id)} onArchive={handleArchiveSuccess} />
            <DeleteButton id={Number(id)} onDelete={handleDeleteSuccess} />
          </>
        )}
      </div>
    </section>
  )
}

export default DetailPage
