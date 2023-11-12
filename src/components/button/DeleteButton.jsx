import React from 'react'
import PropTypes from 'prop-types'
import { MdDeleteOutline } from 'react-icons/md'

function DeleteButton({ id, onDelete }) {
  return (
    <button className="action" type="button" title="Hapus" onClick={() => onDelete(id)}>
      <MdDeleteOutline />
    </button>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default DeleteButton
