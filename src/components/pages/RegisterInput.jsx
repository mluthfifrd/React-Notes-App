import React, { useState } from 'react'
import PropTypes from 'prop-types'

const RegisterInput = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const onNameChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: event.target.value
    }))
  }

  const onEmailChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: event.target.value
    }))
  }

  const onPasswordChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: event.target.value
    }))
  }

  const onConfirmPasswordChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword: event.target.value
    }))
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    // Add validation for matching passwords before calling register
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password must match!')
      return
    }

    register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">Nama</label>
      <input
        id="name"
        type="text"
        placeholder="Nama"
        value={formData.name}
        onChange={onNameChange}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={onEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={formData.password}
        onChange={onPasswordChange}
      />
      <label htmlFor="confirmPassword">Konfirmasi Password</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        autoComplete="current-password"
        value={formData.confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
}

export default RegisterInput
