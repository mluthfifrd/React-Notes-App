import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ArchivePage from '../pages/ArchivePage'
import AddNotePage from '../pages/AddNotePage'
import DetailPageWrapper from '../pages/DetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import Header from '../pages/layout/Header'
import { getUserLogged, putAccessToken } from '../utils/network-data'

function NoteApp() {
  const navigate = useNavigate()
  const [authedUser, setAuthedUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserLogged()
        setAuthedUser(data)
        setInitializing(false)
      } catch (error) {
        // Handle errors if necessary
        console.error('Error fetching user data:', error)
        setInitializing(false)
      }
    }

    fetchData()
  }, [])

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken)
    const { data } = await getUserLogged()
    setAuthedUser(data)
    navigate('/')
  }

  const onLogout = () => {
    setAuthedUser(null)
    putAccessToken('')
    navigate('/login')
  }

  if (initializing) {
    return (
      <div className="load-login">
        <h1>AMBIL DATA</h1>
      </div>
    )
  }

  if (authedUser === null) {
    return (
      <div className="app-container">
        <Header authUser={authedUser} />
        <main>
          <Routes>
            <Route path="/" element={authedUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route
              path="/archives"
              element={authedUser ? <ArchivePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/notes/new"
              element={authedUser ? <AddNotePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/notes/:id"
              element={authedUser ? <DetailPageWrapper /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Header logout={onLogout} name={authedUser.name} authUser={authedUser} />
      <main>
        <Routes>
          <Route path="/" element={authedUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route
            path="/archives"
            element={authedUser ? <ArchivePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/new"
            element={authedUser ? <AddNotePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/:id"
            element={authedUser ? <DetailPageWrapper /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default NoteApp
