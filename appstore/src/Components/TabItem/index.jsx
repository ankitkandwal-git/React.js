import './index.css'

const TabItem = (props) => {
  const { TabItemDetails, isActive, onClickTab } = props
  const { displayText, tabId } = TabItemDetails

  const onClick = () => onClickTab(tabId)

  const activeClass = isActive ? ' active' : ''

  return (
    <li className="list-item">
      <button type="button" className={`tab-button${activeClass}`} onClick={onClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
 