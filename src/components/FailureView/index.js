import './index.css'

const FailureView = ({getQuestionsAndAnswers}) => {
  const getQuestionsAndAnswersAgain = () => {
    getQuestionsAndAnswers()
  }

  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1742226933/Group_7519_1_p6vuvm.png"
        alt="failure view"
        data-testid="failureViewImage"
        className="failure_image"
      />
      <h5 className="failure_heading">Oops! Something Went Wrong</h5>
      <p className="failure_para">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        onClick={getQuestionsAndAnswersAgain}
        data-testid="retryButton"
        className="retry_btn"
      >
        Retry
      </button>
    </div>
  )
}

export default FailureView
