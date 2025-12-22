import {Component} from 'react'
import {
  BgContainer,
  CardContainer,
  Heading,
  EditableInputContainer,
  InputField,
  ParagraphText,
  Button,
} from './styledComponents'

class Home extends Component {
  state = {
    EditableText: '',
    isButtonClicked: false,
  }

  onChangeSearchInput = event => {
    this.setState({EditableText: event.target.value})
  }

  onButtonClick = () => {
    this.setState(prevState => ({isButtonClicked: !prevState.isButtonClicked}))
  }

  render() {
    const {EditableText, isButtonClicked} = this.state
    const EditSaveButton = isButtonClicked ? 'Edit' : 'Save'
    return (
      <BgContainer>
        <CardContainer>
          <Heading>Editable Text Input</Heading>
          <EditableInputContainer>
            {isButtonClicked ? (
              <ParagraphText>{EditableText}</ParagraphText>
            ) : (
              <InputField
                type="text"
                value={EditableText}
                onChange={this.onChangeSearchInput}
              />
            )}
            <Button onClick={this.onButtonClick}>{EditSaveButton}</Button>
          </EditableInputContainer>
        </CardContainer>
      </BgContainer>
    )
  }
}

export default Home
