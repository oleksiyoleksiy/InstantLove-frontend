import React from 'react'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


function Liked() {
  const liked = useSelector((s: RootState) => s.match.liked)

  return (
    <div className={styles.container}>
      
    </div>
  )
}

export default Liked
