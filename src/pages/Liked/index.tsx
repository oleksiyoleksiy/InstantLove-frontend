import React from 'react'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


function Liked() {
  const liked: Item[] = useSelector((s: RootState) => s.match.liked)

  return (
    <div className={styles.container}>
      {liked.map((item: Item, index: number) => (
        <div className={styles.card}>
          
        </div>
      ))}
    </div>
  )
}

export default Liked
