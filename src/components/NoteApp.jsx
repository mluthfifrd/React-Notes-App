import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ArchivePage from '../pages/ArchivePage'
import AddNotePage from '../pages/AddNotePage'
import DetailPageWrapper from '../pages/DetailPage'
import NotFoundPage from '../pages/NotFoundPage'

function NoteApp() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archives" element={<ArchivePage />} />
        <Route path="/notes/new" element={<AddNotePage />} />
        <Route path="/notes/:id" element={<DetailPageWrapper />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export default NoteApp
