import TinderCard from 'react-tinder-card'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { matchActions } from '../../store/matchSlice'
import { RootState } from '../../store'
import Card from '../../components/Card'
import { Item } from '../../types'
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import UpdateProfile from '../UpdateProfile'
import { PersonFill, SearchHeartFill } from 'react-bootstrap-icons'
import UpdatePreferences from '../UpdatePreferences'

// const tele = window.Telegram?.WebApp

function Home() {
  // const username = tele?.initDataUnsafe?.user?.username
  const [preferencedSuggestions, setPreferencedSuggestions] = useState<Item[]>(
    []
  )
  const suggestions = useSelector((s: RootState) => s.match.suggestions)
  const preferences = useSelector((s: RootState) => s.user.preferences)
  const dispatch = useDispatch()

  useEffect(() => {
    if (preferences) {
      setPreferencedSuggestions(
        suggestions.filter(
          s =>
            (preferences.ageRange
              ? s.age <= preferences.ageRange.max &&
                s.age >= preferences.ageRange.min
              : s.age === preferences.age) &&
            (preferences.gender === 'all' || s.gender === preferences.gender)
        )
      )
    }
  }, [suggestions, preferences])

  const handleSwipe = (direction: string, item: Item) => {
    console.log(direction, item)

    if (direction === 'right') {
      dispatch(matchActions.addLiked(item))
    }

    dispatch(matchActions.deleteSuggestion(item.id))
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/profile" className={styles.link}>
            <PersonFill className={styles.link__icon} />
          </Link>
          <Link to="/preferences" className={styles.link}>
            <SearchHeartFill className={styles.link__icon} />
          </Link>
        </div>
        {/* <h1 className={styles.title}>Suggestions for you</h1> */}
        <div className={styles.cardContainer}>
          {preferencedSuggestions.map((item: Item, index: number) => (
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
      <Routes>
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/preferences" element={<UpdatePreferences />} />
      </Routes>
    </>
  )
}

export default Home
