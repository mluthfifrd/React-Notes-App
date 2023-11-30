import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import ThemeButton from '../../components/button/ThemeButton'
import LocaleButton from '../../components/button/LocaleButton.'
import { ThemeProvider } from '../../context/ThemeContext'
import { LocaleConsumer } from '../../context/LocaleContext'
import { FiLogOut } from 'react-icons/fi'

function Header({ logout, name, authUser }) {
  const storedTheme = localStorage.getItem('theme') || 'light'

  const [theme, setTheme] = useState(storedTheme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const themeContextValue = {
    theme,
    toggleTheme
  }

  if (authUser === null) {
    return (
      <header>
        <ThemeProvider value={themeContextValue}>
          <h1>
            <Link to="/">Aplikasi Catatan</Link>
          </h1>
          <ThemeButton />
        </ThemeProvider>
      </header>
    )
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <header>
            <ThemeProvider value={themeContextValue}>
              <h1>
                <Link to="/">{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</Link>
              </h1>
              <Navigation />
              <ThemeButton />
              <LocaleButton />
              <button onClick={logout} className="button-logout">
                <FiLogOut /> {name}
              </button>
            </ThemeProvider>
          </header>
        )
      }}
    </LocaleConsumer>
  )
}

export default Header
