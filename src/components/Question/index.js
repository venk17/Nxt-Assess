import React from 'react'
import './index.css'

const Question = ({
  question,
  onSubmitAnswer,
  selectedAnswer,
  currentQuestionIndex,
  handlePreviousQuestion,
  handleNextQuestion,
  isLastQuestion,
}) => {
  // Destructure the question object and rename keys to camelCase
  const {
    question_text: questionText,
    options,
    options_type: optionsType,
  } = question

  const renderOptions = () => {
    switch (optionsType) {
      case 'DEFAULT':
        return (
          <ul className="options-list">
            {options.map(option => (
              <button // Use button instead of li
                key={option.id}
                className={`option-button ${
                  selectedAnswer === option.id ? 'selected_default' : ''
                }`}
                onClick={() => onSubmitAnswer(option.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSubmitAnswer(option.id)
                  }
                }}
                tabIndex={0} // This is fine for buttons
                data-testid={`option${option.id}`}
                aria-label={`Option ${option.text}`}
              >
                {option.text}
              </button>
            ))}
          </ul>
        )
      case 'IMAGE':
        return (
          <ul className="options-list_img">
            {options.map(option => (
              <button // Use button instead of li
                key={option.id}
                className={`image-option_container ${
                  selectedAnswer === option.id ? 'selected_img' : ''
                }`}
                onClick={() => onSubmitAnswer(option.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSubmitAnswer(option.id)
                  }
                }}
                tabIndex={0} // This is fine for buttons
                data-testid={`option${option.id}`}
                aria-label={`Option ${option.text}`}
              >
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="image-option_img"
                />
                <p className="image_text">{option.text}</p>
              </button>
            ))}
          </ul>
        )
      case 'SINGLE_SELECT':
        return (
          <div className="bg_container_single_select">
            <div className="deaflt_container">
              <span className="exclamation_mark">!</span>
              <p className="single_para">First option is selected by default</p>
            </div>
            <select
              className="drop_down_meanu"
              value={selectedAnswer || options[0].id}
              onChange={e => onSubmitAnswer(e.target.value)}
              data-testid="singleSelect"
              aria-label="Select an option"
            >
              {options.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                  className="dropDown_option"
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="question-container">
      <p className="question-text" data-testid="questionText">
        {currentQuestionIndex + 1}. {questionText}
      </p>
      <hr className="line_question" />
      <div className="options-container">{renderOptions()}</div>
      <div className="navigation-buttons">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          data-testid="previousQuestionButton"
          aria-label="Previous Question"
          className="btn btn_pre"
        >
          Previous Question
        </button>
        {!isLastQuestion && (
          <button
            onClick={handleNextQuestion}
            data-testid="nextQuestionButton"
            aria-label="Next Question"
            className="btn btn_next"
            type="button"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  )
}

export default Question
