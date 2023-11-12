import React from 'react'
import PropTypes from 'prop-types'
import SaveButton from '../button/SaveButton'

class NoteAdd extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this)
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this)
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
  }

  onTitleChangeEventHandler = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  onBodyChangeEventHandler() {
    const contentEditableDiv = this.contentEditableDiv
    this.setState(() => {
      return {
        body: contentEditableDiv.innerText
      }
    })
  }

  onSubmitEventHandler(event) {
    event.preventDefault()
    this.props.addNote(this.state)
  }

  render() {
    return (
      <section className="add-new-page">
        <div className="add-new-page__input">
          <input
            className="add-new-page__input__title"
            type="text"
            placeholder="Catatan rahasia"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder="Sebenarnya saya adalah ...."
            onInput={this.onBodyChangeEventHandler}
            ref={(div) => (this.contentEditableDiv = div)}
          ></div>
        </div>
        <div className="add-new-page__action">
          <SaveButton onClick={this.onSubmitEventHandler} />
        </div>
      </section>
    )
  }
}

NoteAdd.propTypes = {
  addNote: PropTypes.func.isRequired
}

export default NoteAdd
