import React from 'react'
import { LocaleConsumer } from '../context/LocaleContext'

function NotFoundPage() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="not-found">
            <h1>{locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}</h1>
            <img src="/images/notfound.svg" alt="Not Found Image" />
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

export default NotFoundPage
