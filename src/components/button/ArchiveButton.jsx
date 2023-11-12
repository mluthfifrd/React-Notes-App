import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineArchive } from 'react-icons/md'

function ArchiveButton({ id, onArchive }) {
  return (
    <button className="action" type="button" title="Arsipkan" onClick={() => onArchive(id)}>
      <MdOutlineArchive />
    </button>
  )
}

ArchiveButton.propTypes = {
  id: PropTypes.number.isRequired,
  onArchive: PropTypes.func.isRequired
}

export default ArchiveButton
