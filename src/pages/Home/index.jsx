import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import styles from './index.module.scss'
import db from '../../db'

const tele = window.Telegram?.WebApp

function Home() {
  const username = tele?.initDataUnsafe?.user?.username
  const [cards, setCards] = useState(db)
  const [likedCards, setLikedCards] = useState([])
  const [dislikedCards, setDislikedCards] = useState([])

  const goToPm = () => {
    if (username) {
      tele.openTelegramLink(`https://t.me/${username}`)
    } else {
      console.error('Username is not available.')
    }
  }

  const handleSwipe = (direction, cardName) => {
    if (direction === 'right') {
      setLikedCards(prevLiked => [...prevLiked, cardName])
    } else if (direction === 'left') {
      setDislikedCards(prevDisliked => [...prevDisliked, cardName])
    }
    setCards(prevCards => prevCards.filter(card => card.name !== cardName))
  }

  const handleCardLeftScreen = name => {
    console.log(name + ' left the screen')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Tinder Swipe Cards</h1>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <TinderCard
          className={styles.swipe}
          key={index}
          flickOnSwipe
          onSwipe={dir => handleSwipe(dir, card.name)}
          >
            <div
              className={styles.card}
              style={{ backgroundImage: 'url(' + card.url + ')' }}
            >
              <h3 className={styles.card__info}>{card.name}, {card.age}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      {cards.length === 0 && (
        <div className={styles.results}>
          <h2>Results</h2>
          <div>
            <strong>Liked Cards:</strong>
            <ul>
              {likedCards.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Disliked Cards:</strong>
            <ul>
              {dislikedCards.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button onClick={goToPm} className={styles.button}>
        Open Telegram
      </button>
    </div>
  )
}

export default Home
