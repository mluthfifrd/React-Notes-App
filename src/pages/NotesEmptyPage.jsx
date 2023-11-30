import React from 'react'
import { LocaleConsumer } from '../context/LocaleContext'

function NotesEmptyPage() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="notes-list-empty">
            <p className="notes-list__empty">
              {locale === 'id' ? 'Tidak ada catatan' : 'No notes'}
            </p>
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

export default NotesEmptyPage
