import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import SaveButton from '../button/SaveButton'
import { LocaleConsumer } from '../../context/LocaleContext'

function NoteAdd({ addNote }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const contentEditableDiv = useRef(null)

  const onTitleChangeEventHandler = (event) => {
    setTitle(event.target.value)
  }

  const onBodyChangeEventHandler = () => {
    setBody(contentEditableDiv.current.innerText)
  }

  const onSubmitEventHandler = (event) => {
    event.preventDefault()
    addNote({ title, body })
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="add-new-page">
            <div className="add-new-page__input">
              <input
                className="add-new-page__input__title"
                type="text"
                placeholder={locale === 'id' ? 'Catatan rahasia' : 'Secret notes'}
                value={title}
                onChange={onTitleChangeEventHandler}
              />
              <div
                className="add-new-page__input__body"
                contentEditable="true"
                data-placeholder={
                  locale === 'id' ? 'Sebenarnya saya adalah ....' : 'Actually I am ....'
                }
                onInput={onBodyChangeEventHandler}
                ref={contentEditableDiv}
              ></div>
            </div>
            <div className="add-new-page__action">
              <SaveButton onClick={onSubmitEventHandler} />
            </div>
          </section>
        )
      }}
    </LocaleConsumer>
  )
}

NoteAdd.propTypes = {
  addNote: PropTypes.func.isRequired
}

export default NoteAdd
