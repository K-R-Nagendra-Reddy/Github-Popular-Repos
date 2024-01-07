import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const activeLanguageConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    initialLanguageFiltersData: languageFiltersData,
    activeLanguageId: languageFiltersData[0].id,
    fetchStatus: activeLanguageConstants.initial,
  }

  componentDidMount() {
    this.fetchLanguages()
  }

  fetchLanguages = async () => {
    const {activeLanguageId} = this.state
    this.setState({fetchStatus: activeLanguageConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    // console.log(response.ok)
    if (response.ok === true) {
      const languages = await response.json()
      // console.log(languages)
      const popularRepos = languages.popular_repos
      // console.log(popularRepos)
      console.log(popularRepos[0])
      const updatedData = popularRepos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        initialLanguageFiltersData: updatedData,
        fetchStatus: activeLanguageConstants.success,
      })
    } else {
      this.setState({fetchStatus: activeLanguageConstants.failure})
    }
  }

  onChangeActiveLanguageId = changeId => {
    this.setState({activeLanguageId: changeId}, this.fetchLanguages)
  }

  renderLoadingElement = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailContainer = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="fail-content">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {initialLanguageFiltersData} = this.state
    return (
      <ul className="repos-container">
        {initialLanguageFiltersData.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case activeLanguageConstants.success:
        return this.renderRepositories()
      case activeLanguageConstants.failure:
        return this.renderFailContainer()
      case activeLanguageConstants.inProgress:
        return this.renderLoadingElement()
      default:
        return null
    }
  }

  renderLanguagesContainerList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="languages-selection-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            details={eachLanguage}
            isActive={activeLanguageId === eachLanguage.id}
            onChangeActiveLanguage={this.onChangeActiveLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      initialLanguageFiltersData,
      activeLanguageId,
      fetchStatus,
    } = this.state
    console.log(`active id is ${activeLanguageId}`)
    // console.log(initialLanguageFiltersData)
    // console.log(activeLanguageId)

    return (
      <div className="popular-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguagesContainerList()}
        {this.renderResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
