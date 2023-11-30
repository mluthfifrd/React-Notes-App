import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoginInput from '../../components/pages/LoginInput'
import { login } from '../../utils/network-data'
import { LocaleConsumer } from '../../context/LocaleContext'

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
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="login-page">
            <h2>
              {locale === 'id'
                ? 'Yuk, login untuk menggunakan aplikasi.'
                : 'Login to use app, please.'}
            </h2>
            <LoginInput login={onLogin} />
            {locale === 'id' ? (
              <p>
                Belum punya akun? <Link to="/register">Daftar di sini.</Link>
              </p>
            ) : (
              <p>
                Don't have an account? <Link to="/register">Register here.</Link>
              </p>
            )}
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
}

export default LoginPage
