import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Card from '../../components/Card'
import { EnvelopeHeartFill, HeartbreakFill } from 'react-bootstrap-icons'
import { matchActions } from '../../store/matchSlice'
import { Item } from '../../types'

const tele = window.Telegram.WebApp

function Matches() {
  const liked = useSelector((s: RootState) => s.match.liked)
  const [matches, setMatches] = useState<Item[]>([])
  const dispatch = useDispatch()

  const goToPm = () => {
    tele.openTelegramLink(`https://t.me/#`)
  }

  const unlike = (item: Item) => {
    dispatch(matchActions.deleteLiked(item.id))
  }

  useEffect(() => {
    const matched = liked.filter(l => l.is_liked_you)
    setMatches(matched)
  }, [liked])

  return (
    <div className={styles.container}>
      {matches.map((item: Item, index: number) => (
        <Card className={styles.card} key={index} item={item}>
          <div className={styles.card__holder}>
            <div className={styles.info}>
              <div className={styles.info__nameHolder}>
                <div className={styles.info__name}>{item.name}</div>
                <div className={styles.info__separator}>,</div>
              </div>
              <div className={styles.info__age}>{item.age}</div>
            </div>
            <div className={styles.buttonHolder}>
              <button onClick={() => unlike(item)} className={styles.button}>
                <HeartbreakFill className={styles.button__icon} />
              </button>
              <button onClick={() => goToPm()} className={styles.button}>
                <EnvelopeHeartFill className={styles.button__icon} />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Matches
