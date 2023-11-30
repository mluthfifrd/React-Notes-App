import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { tailChase } from 'ldrs'

function LoginInput({ login }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [isLoading, setIsLoading] = useState(true)

  tailChase.register()

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
    try {
      login(formData)
      setIsLoading(false)
    } catch (error) {
      alert('Terjadi kegagalan saat melakukan Login :(')
      setIsLoading(false)
    }
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
      {isLoading ? (
        <button>Masuk</button>
      ) : (
        <button disabled>
          <l-tail-chase size="40" speed="1.75" color="gray"></l-tail-chase>
        </button>
      )}
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginInput
