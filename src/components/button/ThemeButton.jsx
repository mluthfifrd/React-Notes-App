import React from 'react'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { ThemeConsumer } from '../../context/ThemeContext'

function ThemeButton() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        )
      }}
    </ThemeConsumer>
  )
}

export default ThemeButton
