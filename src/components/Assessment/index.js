import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Loading from '../Loading'
import FailureView from '../FailureView'
import SuccessView from '../SuccessView'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Assessment extends Component {
  state = {
    apiStatus: '',
    questionsAndAnswers: [],
    totalQuestions: 0,
    currentQuestionIndex: 0,
    userAnswers: [],
    isSubmitted: false,
    score: null,
    timeUp: false,
    startTime: null,
    timeTaken: 0,
    answeredQuestions: 0,
    unAnsweredQuestions: 0,
  }

  componentDidMount() {
    this.getQuestionsAndAnswers()
    this.setState({startTime: new Date()})
  }

  getQuestionsAndAnswers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {method: 'GET'}

    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      this.setState({
        questionsAndAnswers: data.questions,
        totalQuestions: data.total,
        apiStatus: apiStatusConstants.success,
        userAnswers: Array(data.total).fill(null),
        unAnsweredQuestions: data.total,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleSubmitAnswer = (questionIndex, optionId) => {
    const {userAnswers} = this.state
    const newUserAnswers = [...userAnswers]
    const previousAnswer = newUserAnswers[questionIndex]
    newUserAnswers[questionIndex] = optionId

    this.setState(prevState => ({
      userAnswers: newUserAnswers,
      answeredQuestions:
        prevState.answeredQuestions + (previousAnswer === null ? 1 : 0),
      unAnsweredQuestions:
        prevState.unAnsweredQuestions - (previousAnswer === null ? 1 : 0),
    }))
  }

  handleNextQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: Math.min(
        prevState.currentQuestionIndex + 1,
        prevState.totalQuestions - 1,
      ),
    }))
  }

  handlePreviousQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: Math.max(prevState.currentQuestionIndex - 1, 0),
    }))
  }

  handleQuestionClick = index => {
    this.setState({currentQuestionIndex: index})
  }

  calculateScoreAndTime = () => {
    const {questionsAndAnswers, userAnswers, startTime} = this.state
    const endTime = new Date()
    const timeTaken = Math.floor((endTime - startTime) / 1000)

    const score = questionsAndAnswers.reduce((acc, question, index) => {
      const userAnswer = userAnswers[index]
      const correctOption = question.options.find(
        option => option.is_correct === 'true',
      )
      if (userAnswer === correctOption.id) {
        return acc + 1
      }
      return acc
    }, 0)

    return {score, timeTaken}
  }

  handleSubmitAssessment = () => {
    const {score, timeTaken} = this.calculateScoreAndTime()
    this.setState({isSubmitted: true, score, timeTaken}, () =>
      this.redirectToResultPage(false, 'submit'),
    )
  }

  handleTimeUp = () => {
    const {score, timeTaken} = this.calculateScoreAndTime()
    this.setState({timeUp: true, timeTaken, score}, () =>
      this.redirectToResultPage(true, 'time up'),
    )
  }

  redirectToResultPage = (isTimeUp, imageAlt) => {
    const {score, totalQuestions, timeTaken} = this.state
    const {history} = this.props // Destructure history from props

    history.push('/results', {
      score,
      total: totalQuestions,
      timeTaken,
      isTimeUp,
      imageAlt,
    })
  }

  render() {
    const {
      questionsAndAnswers,
      totalQuestions,
      currentQuestionIndex,
      userAnswers,
      answeredQuestions,
      unAnsweredQuestions,
      apiStatus,
    } = this.state

    return (
      <div className="assessment_container">
        <Header />
        <div className="api_status_container">
          {apiStatus === apiStatusConstants.inProgress && <Loading />}
          {apiStatus === apiStatusConstants.failure && (
            <FailureView getQuestionsAndAnswers={this.getQuestionsAndAnswers} />
          )}
          {apiStatus === apiStatusConstants.success && (
            <SuccessView
              questionsAndAnswers={questionsAndAnswers}
              totalQuestions={totalQuestions}
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              answeredQuestions={answeredQuestions}
              unAnsweredQuestions={unAnsweredQuestions}
              handleNextQuestion={this.handleNextQuestion}
              handlePreviousQuestion={this.handlePreviousQuestion}
              handleSubmitAssessment={this.handleSubmitAssessment}
              handleTimeUp={this.handleTimeUp}
              handleSubmitAnswer={this.handleSubmitAnswer}
              handleQuestionClick={this.handleQuestionClick}
            />
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Assessment)
