import {Component} from 'react'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]



class Game extends Component{
    state = {
        score : 0,
        gameCondition : '',
        resultDisplay : false,
        userChoice: null,
        opponentChoice: null,
        showRules: false
    }
    onClickGameChoice = (id) => {
        const randomId = Math.floor(Math.random()*3)
        const opponentChoices = choicesList[randomId]
        this.setState({userChoice: choicesList.find(choice => choice.id === id), opponentChoice: opponentChoices})
        if(id==='SCISSORS'){
            if(opponentChoices.id==='PAPER'){
                this.setState(prevState =>({
                    score : prevState.score + 1,
                    gameCondition : 'WON',
                    resultDisplay : true
                }))
            }else if(opponentChoices.id==='ROCK'){
                this.setState(prevState => ({
                    score : prevState.score -1,
                    gameCondition : 'LOSE',
                    resultDisplay : true
                }))
            }else{
                this.setState(prevState => ({
                    score : prevState.score,
                    resultDisplay : true,
                    gameCondition : 'IT IS DRAW'
                }))
            }
        }
        else if(id === 'ROCK'){
            if(opponentChoices.id==='SCISSORS'){
                this.setState(prevState =>({
                    score : prevState.score + 1,
                    gameCondition : 'WON',
                    resultDisplay : true
                }))
            }
            else if(opponentChoices.id==='PAPER'){
                this.setState(prevState => ({
                    score : prevState.score -1,
                    gameCondition : 'LOSE',
                    resultDisplay : true
                }))
            }else{
                this.setState(prevState => ({
                    score : prevState.score,
                    resultDisplay : true,
                    gameCondition : 'IT IS DRAW'
                }))
            }
        }
        else if(id === 'PAPER'){
            if(opponentChoices.id === 'ROCK'){
                this.setState(prevState => ({
                    score : prevState.score + 1,
                    gameCondition : 'WON',
                    resultDisplay : true
                }))
            } else if(opponentChoices.id === 'SCISSORS'){
                this.setState(prevState => ({
                    score : prevState.score -1,
                    gameCondition : 'LOSE',
                    resultDisplay : true
                }))
            }
        }
    } 
    playAgain = () => {
        this.setState({resultDisplay : false})
    }
    renderWinCard = () => {
        const {userChoice, opponentChoice} = this.state;
        return(
            <div className="win-card">
                <h1 style={{color: 'white'}}>You Won</h1>
                <div style={{display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0'}}>
                    <div>
                        <p style={{color: 'white'}}>You</p>
                        {userChoice && <img src={userChoice.imageUrl} alt={userChoice.id} style={{width: '100px'}} />}
                    </div>
                    <div>
                        <p style={{color: 'white'}}>Opponent</p>
                        {opponentChoice && <img src={opponentChoice.imageUrl} alt={opponentChoice.id} style={{width: '100px'}} />}
                    </div>
                </div>
                <button type="button" className="play-again-button" onClick={this.playAgain}>Play Again</button>
            </div>
        )
    }
    renderLoseCard = () => {
        const {userChoice, opponentChoice} = this.state;
        return(
            <div className="lose-card">
                <h1 style={{color: 'white'}}>You Lose</h1>
                <div style={{display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0'}}>
                    <div>
                        <p style={{color: 'white'}}>You</p>
                        {userChoice && <img src={userChoice.imageUrl} alt={userChoice.id} style={{width: '100px'}} />}
                    </div>
                    <div>
                        <p style={{color: 'white'}}>Opponent</p>
                        {opponentChoice && <img src={opponentChoice.imageUrl} alt={opponentChoice.id} style={{width: '100px'}} />}
                    </div>
                </div>
                <button type="button" className="play-again-button" onClick={this.playAgain}>Play Again</button>
            </div>
        )
    }
    renderPopUp = () =>{
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '24px',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                    <img src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png" alt="rules" style={{maxWidth: '400px', width: '100%'}} />
                    <button style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#ff4757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }} onClick={() => this.setState({showRules: false})}>X</button>
                </div>
            </div>
        );
    }
    renderRockPaperScissor = () => {
        return(
            <div className="choice-container  xl-6">
                <ul className="choice-list">
                        {choicesList.map(eachChoice => (
                            <li key={eachChoice.id}>
                                <img src={eachChoice.imageUrl} alt={eachChoice.id} className="choice-image" 
                                    onClick={() => this.onClickGameChoice(eachChoice.id)}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
    render(){
        const {score, resultDisplay, gameCondition, userChoice, opponentChoice} = this.state;
        return(
            <div className="game-bg-container" style={{position: 'relative', minHeight: '100vh'}}>
                <div className="game-card">
                    <div className="header-container">
                        <h1 className="heading">Rock <br/> Paper <br/> Scissors</h1>
                        <div className="score-container">
                            <p className="score-text">Score</p>
                            <p className="score-number">{score}</p>
                        </div>
                    </div>
                </div>
                {resultDisplay ? (
                    gameCondition === 'WON' ? this.renderWinCard() :
                    gameCondition === 'LOSE' ? this.renderLoseCard() :
                    <div className="draw-card">
                        <h1 style={{color: 'white'}}>It's a Draw</h1>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '40px', margin: '20px 0'}}>
                            <div>
                                <p style={{color: 'white'}}>You</p>
                                {userChoice && <img src={userChoice.imageUrl} alt={userChoice.id} style={{width: '100px'}} />}
                            </div>
                            <div>
                                <p style={{color: 'white'}}>Opponent</p>
                                {opponentChoice && <img src={opponentChoice.imageUrl} alt={opponentChoice.id} style={{width: '100px'}} />}
                            </div>
                        </div>
                        <button type="button" className="play-again-button" onClick={this.playAgain}>Play Again</button>
                    </div>
                ) : (
                    this.renderRockPaperScissor()
                )}
                <button
                    style={{
                        position: 'fixed',
                        right: '30px',
                        bottom: '30px',
                        background: '#0b69ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        zIndex: 999
                    }}
                    onClick={() => this.setState({showRules: true})}
                >
                    Rules
                </button>
                {this.state.showRules && this.renderPopUp()}
            </div>
        )
    }
}

export default Game