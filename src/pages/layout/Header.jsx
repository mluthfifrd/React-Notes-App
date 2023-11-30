import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi'

function Header({ logout, name, authUser }) {
  if (authUser === null) {
    return (
      <header>
        <h1>
          <Link to="/">Aplikasi Catatan</Link>
        </h1>
      </header>
    )
  }

  return (
    <header>
      <h1>
        <Link to="/">Aplikasi Catatan</Link>
      </h1>
      <Navigation />
      <button onClick={logout} className="button-logout">
        <FiLogOut /> {name}
      </button>
    </header>
  )
}

export default Header
