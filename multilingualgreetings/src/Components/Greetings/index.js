import {Component} from 'react'
import LanguageItem from '../LanguageItem'
import {
  BgContainer,
  Heading,
  ButtonsContainer,
  ImageItem,
} from './styledComponents'

class Greetings extends Component {
  state = {
    activeLanguageId: this.props.languageGreetingsList[0].id,
  }

  onClickChangeLanguage = id => {
    this.setState({activeLanguageId: id})
  }

  renderSelectedLanguage = () => {
    const {activeLanguageId} = this.state
    const {languageGreetingsList} = this.props
    const selectedItem = languageGreetingsList.find(
      each => each.id === activeLanguageId,
    )
    const {imageUrl, imageAltText} = selectedItem
    return <ImageItem src={imageUrl} alt={imageAltText} />
  }

  render() {
    const {activeLanguageId} = this.state
    const {languageGreetingsList} = this.props
    return (
      <BgContainer>
        <Heading>Multilingual Greetings</Heading>
        <ButtonsContainer>
          {languageGreetingsList.map(eachItem => (
            <LanguageItem
              key={eachItem.id}
              LanguageItemDetails={eachItem}
              isActive={activeLanguageId === eachItem.id}
              onClickChangeLanguage={this.onClickChangeLanguage}
            />
          ))}
        </ButtonsContainer>
        {this.renderSelectedLanguage()}
      </BgContainer>
    )
  }
}

export default Greetings
