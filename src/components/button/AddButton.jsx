import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

function AddButton() {
  return (
    <Link to="/notes/new">
      <button className="action" type="button" title="Tambah">
        <AiOutlinePlus />
      </button>
    </Link>
  )
}

export default AddButton
