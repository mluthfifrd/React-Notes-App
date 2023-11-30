import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoginInput from '../../components/pages/LoginInput'
import { login } from '../../utils/network-data'

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    try {
      const { data } = await login({ email, password })
      loginSuccess(data)
    } catch (error) {
      console.log('Error ketika login')
    }
  }

  return (
    <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  )
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
}

export default LoginPage
