import React from 'react'
import Timer from '../Timer'
import QuestionNavigation from '../QuestionNavigation'
import Question from '../Question'
import './index.css'

const SuccessView = props => {
  const {
    questionsAndAnswers,
    totalQuestions,
    currentQuestionIndex,
    userAnswers,
    answeredQuestions,
    unAnsweredQuestions,
    handleNextQuestion,
    handlePreviousQuestion,
    handleSubmitAssessment,
    handleTimeUp,
    handleSubmitAnswer,
    handleQuestionClick,
  } = props

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1 // Define isLastQuestion

  return (
    <>
      <div className="bg_container">
        <div className="top_container">
          <Timer totalTime={600} onTimeUp={handleTimeUp} />
          <QuestionNavigation
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            answeredQuestions={answeredQuestions}
            unAnsweredQuestions={unAnsweredQuestions}
            onQuestionClick={handleQuestionClick}
            handleSubmitAssessment={handleSubmitAssessment}
          />
        </div>
        <div className="buttom_container">
          {questionsAndAnswers.length > 0 && (
            <Question
              question={questionsAndAnswers[currentQuestionIndex]}
              onSubmitAnswer={optionId =>
                handleSubmitAnswer(currentQuestionIndex, optionId)
              }
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              handleNextQuestion={handleNextQuestion}
              handlePreviousQuestion={handlePreviousQuestion}
              isLastQuestion={isLastQuestion} // Pass isLastQuestion
            />
          )}
        </div>
      </div>
    </>
  )
}

export default SuccessView
