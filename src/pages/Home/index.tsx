import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import styles from './index.module.scss'
import db from '../../db'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { matchActions } from '../../store/matchSlice'
import { RootState } from '../../store'

// const tele = window.Telegram?.WebApp

function Home() {
  // const username = tele?.initDataUnsafe?.user?.username
  const suggestions: Item[] = useSelector((s: RootState) => s.match.suggestions)
  const dispatch: Dispatch = useDispatch()

  // const goToPm = () => {
  //   if (username) {
  //     tele.openTelegramLink(`https://t.me/${username}`)
  //   } else {
  //     console.error('Username is not available.')
  //   }
  // }

  const handleSwipe = (direction: string, item: Item) => {
    if (direction === 'right') {
      dispatch(matchActions.addLiked(item))
    }

    dispatch(matchActions.deleteSuggestion(item.id))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Tinder Swipe Cards</h1>
      <div className={styles.cardContainer}>
        {suggestions.map((item: Item, index: number) => (
          <TinderCard
            className={styles.swipe}
            key={index}
            flickOnSwipe
            onSwipe={dir => handleSwipe(dir, item)}
          >
            <div
              className={styles.card}
              style={{ backgroundImage: 'url(' + item.url + ')' }}
            >
              <h3 className={styles.card__info}>
                {item.name}, {item.age}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default Home
