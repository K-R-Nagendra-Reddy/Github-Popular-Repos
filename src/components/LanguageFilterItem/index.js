// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, onChangeActiveLanguage} = props
  const {id, language} = details

  const selectedStyle = isActive ? 'style' : ''
  const onClickLanguage = () => {
    console.log(isActive)
    onChangeActiveLanguage(id)
  }

  return (
    <li className="li-item">
      <button
        type="button"
        className={`button ${selectedStyle}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
