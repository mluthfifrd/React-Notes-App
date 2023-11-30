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
import { LocaleProvider } from '../context/LocaleContext'

function NoteApp() {
  const navigate = useNavigate()
  const [authedUser, setAuthedUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const storedLocale = localStorage.getItem('locale') || 'id'

  const [locale, setLocale] = useState(storedLocale)

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id'
    localStorage.setItem('locale', newLocale)
    setLocale(newLocale)
  }

  const localeContextValue = {
    locale,
    toggleLocale
  }

  useEffect(() => {
    const fetchData = async () => {
      setInitializing(true)
      try {
        const { data } = await getUserLogged()
        setAuthedUser(data)
        setInitializing(false)
      } catch (error) {
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
    return
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={localeContextValue}>
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
      </LocaleProvider>
    )
  }

  return (
    <LocaleProvider value={localeContextValue}>
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
    </LocaleProvider>
  )
}

export default NoteApp
