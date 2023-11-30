import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginInput = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const onEmailChangeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: event.target.value
    }))
  }

  const onPasswordChangeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: event.target.value
    }))
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    login(formData)
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={onEmailChangeHandler}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={onPasswordChangeHandler}
      />
      <button>Masuk</button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginInput
