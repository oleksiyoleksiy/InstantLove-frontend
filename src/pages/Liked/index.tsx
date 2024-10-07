import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Card from '../../components/Card'
import { HeartbreakFill } from 'react-bootstrap-icons'
import { Dispatch } from '@reduxjs/toolkit'
import { matchActions } from '../../store/matchSlice'
import { Item, Profile } from '../../types'

function Liked() {
  const liked: Profile[] = useSelector((s: RootState) => s.match.liked)
  const dispatch: Dispatch = useDispatch()

  const unlike = (item: Profile) => {
    dispatch(matchActions.deleteLiked(item.id))
  }

  return (
    <div className={styles.container}>
      {liked.map((item: Profile, index: number) => (
        <Card className={styles.card} key={index} item={item}>
          <div className={styles.card__holder}>
            <div className={styles.info}>
              <div className={styles.info__nameHolder}>
                <div className={styles.info__name}>{item.name}</div>
                <div className={styles.info__separator}>,</div>
              </div>
              <div className={styles.info__age}>{item.age}</div>
            </div>
            <button onClick={() => unlike(item)} className={styles.button}>
              <HeartbreakFill className={styles.button__icon} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Liked
