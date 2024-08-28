import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import styles from './index.module.scss'
import db from '../../db'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { matchActions } from '../../store/matchSlice'
import { RootState } from '../../store'
import Card from '../../components/Card'

// const tele = window.Telegram?.WebApp

function Home() {
  // const username = tele?.initDataUnsafe?.user?.username
  const suggestions: Item[] = useSelector((s: RootState) => s.match.suggestions)
  const dispatch: Dispatch = useDispatch()

  const handleSwipe = (direction: string, item: Item) => {
    console.log(direction, item);
    
    if (direction === 'right') {
      dispatch(matchActions.addLiked(item))
    }

    dispatch(matchActions.deleteSuggestion(item.id))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Suggestions for you</h1>
      <div className={styles.cardContainer}>
        {suggestions.map((item: Item, index: number) => (
          <TinderCard
            className={styles.swipe}
            key={index}
            onSwipe={dir => handleSwipe(dir, item)}
            preventSwipe={['up', 'down']}
          >
            <Card className={styles.card} key={index} item={item}>
              <div className={styles.info}>
                <div className={styles.info__nameHolder}>
                  <div className={styles.info__name}>{item.name}</div>
                  <div className={styles.info__separator}>,</div>
                </div>
                <div className={styles.info__age}>{item.age}</div>
              </div>
            </Card>
          </TinderCard>
        ))}
        <div className={styles.message}>
          you have reviewed all available suggestions
        </div>
      </div>
    </div>
  )
}

export default Home
