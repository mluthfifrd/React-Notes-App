import React from 'react'
import { MdGTranslate } from 'react-icons/md'
import { LocaleConsumer } from '../../context/LocaleContext'

function LocaleButton() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <button className="toggle-theme" onClick={toggleLocale}>
            {locale === 'id' ? <MdGTranslate /> : <MdGTranslate />}
          </button>
        )
      }}
    </LocaleConsumer>
  )
}

export default LocaleButton
