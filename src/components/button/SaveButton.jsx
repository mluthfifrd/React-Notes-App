import React from 'react'
import PropTypes from 'prop-types'
import { BsCheck2 } from 'react-icons/bs'

function SaveButton({ onClick }) {
  return (
    <button className="action" type="button" title="Simpan" onClick={onClick}>
      <BsCheck2 />
    </button>
  )
}

SaveButton.prototype = {
  onClick: PropTypes.func.isRequired
}

export default SaveButton
