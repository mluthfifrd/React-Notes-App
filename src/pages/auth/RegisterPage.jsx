import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterInput from '../../components/pages/RegisterInput'
import { register } from '../../utils/network-data'
import { LocaleConsumer } from '../../context/LocaleContext'

function RegisterPage() {
  const navigate = useNavigate()

  async function onRegisterHandler(user) {
    const { error } = await register(user)
    if (!error) {
      navigate('/')
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register-page">
            <h2>
              {locale === 'id'
                ? 'Isi form untuk mendaftar akun.'
                : 'Fill the form to register account.'}
            </h2>
            <RegisterInput register={onRegisterHandler} />
            {locale === 'id' ? (
              <p>
                Sudah punya akun? <Link to="/">Login di sini</Link>
              </p>
            ) : (
              <p>
                Already have an account? <Link to="/">Login here</Link>
              </p>
            )}
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

export default RegisterPage
