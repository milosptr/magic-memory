import React, { useState, useEffect } from 'react'
import Card from './Card'
import '../css/Table.css'

export default function Table() {

  const [originalCards] = useState([
    { id: 1, img: 'helmet-1.png', matched: false },
    { id: 2, img: 'potion-1.png', matched: false },
    { id: 3, img: 'ring-1.png', matched: false },
    { id: 4, img: 'scroll-1.png', matched: false },
    { id: 5, img: 'shield-1.png', matched: false },
    { id: 6, img: 'sword-1.png', matched: false },
  ]);
  const [shuffledCards, setShuffledCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [cardDisabled, setCardDisabled] = useState()
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const resetGame = () => {
    const cards  = [...originalCards, ...originalCards]
      .sort(() => Math.random() - 0.5)
      .map((c, i) => ({ ...c, id: i }))
    setShuffledCards(cards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setCardDisabled(false)
    setTurns(0)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setCardDisabled(false)
  }

 const handleTurnCard = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
 }

 useEffect(() => {
   if(choiceOne && choiceTwo) {
    setCardDisabled(true)
    if(choiceOne.img === choiceTwo.img) {
      setShuffledCards(prevCards => {
        return prevCards.map((card) => {
          if(card.img === choiceOne.img || card.img === choiceTwo.img)
            return { ...card, matched: true }
          return card
        })
      })
      resetTurn()
    } else {
      setTimeout(() => {
        resetTurn()
      }, 1000);
    }
  }
 }, [choiceOne, choiceTwo])

 useEffect(() => {
  resetGame()
 }, [])

  return (
    <React.Fragment>
      <button onClick={resetGame}>New Game</button>
      <div className='cardTable'>
        {shuffledCards.map((c, i) => (
          <Card
            card={c}
            key={i}
            onClick={() => handleTurnCard(c)}
            flipped={c === choiceOne || c === choiceTwo || c.matched}
            disabled={cardDisabled}
          />
        ))}
      </div>
      { shuffledCards.length &&
          <div className='cardTurns'>
            Total turns: { turns }
          </div>
       }
    </React.Fragment>
  )
}
