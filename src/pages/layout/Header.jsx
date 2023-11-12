import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Aplikasi Catatan</Link>
      </h1>
      <Navigation />
    </header>
  )
}

export default Header
