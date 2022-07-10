import React from 'react'
import '../css/Card.css'

export default function Card({ card, onClick, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled)
      onClick()
  }

  return (
    <div className="scene scene--card">
      <div className={flipped ? 'card is-flipped' : 'card'}>
        <div className="card__face card__face--front">
          <img src="/img/cover.png" alt="Avatar" onClick={handleClick} />
        </div>
        <div className="card__face card__face--back">
          <img src={'/img/' + card.img} alt="Avatar" />
        </div>
      </div>
    </div>
  )
}
