// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {id, avatarUrl, forksCount, issuesCount, name, starsCount} = details
  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={name} className="thumbnail" />
      <h1 className="language-name">{name}</h1>
      <div className="row-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="alt"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="row-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="alt"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="row-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="alt"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
