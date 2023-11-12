import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineUnarchive } from 'react-icons/md'

function UnArchiveButton({ id, onUnArchive }) {
  return (
    <button className="action" type="button" title="Aktifkan" onClick={() => onUnArchive(id)}>
      <MdOutlineUnarchive />
    </button>
  )
}

UnArchiveButton.propTypes = {
  id: PropTypes.number.isRequired,
  onUnArchive: PropTypes.func.isRequired
}

export default UnArchiveButton
