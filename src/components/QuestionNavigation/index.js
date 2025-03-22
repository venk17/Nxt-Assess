import React from 'react'
import './index.css'

const QuestionNavigation = ({
  totalQuestions,
  currentQuestionIndex,
  userAnswers,
  answeredQuestions,
  unAnsweredQuestions,
  onQuestionClick,
  handleSubmitAssessment,
}) => (
  <div className="question-navigation">
    <div className="top_section">
      <div className="answered-container comon_container">
        <p data-testid="answeredQuestionsCount" className="answered-idication">
          {answeredQuestions}
        </p>
        <p className="answered_text">Answered Questions</p>
      </div>
      <div className="unanswered_container comon_container">
        <p
          data-testid="unAnsweredQuestionsCount"
          className="unanswered-idication"
        >
          {unAnsweredQuestions}
        </p>
        <p className="answered_text">Unanswered Questions</p>
      </div>
    </div>
    <hr className="line" />
    <h2 className="total_question">Questions ({totalQuestions})</h2>

    <div className="question-buttons">
      {Array.from({length: totalQuestions}, (_, index) => (
        <button
          key={index}
          className={`question-btn ${
            currentQuestionIndex === index ? 'active' : ''
          } ${userAnswers[index] ? 'answered' : 'unanswered'}`}
          onClick={() => onQuestionClick(index)}
          data-testid={`questionNumberButton${index + 1}`}
          aria-label={`Question ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
    <button
      className="asignmet_btn"
      onClick={handleSubmitAssessment}
      data-testid="submitAssessmentButton"
      aria-label="Submit Assessment"
      type="button"
    >
      Submit Assessment
    </button>
  </div>
)

export default QuestionNavigation
