import styles from './index.module.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Liked from '../../pages/Liked'
import Matches from '../../pages/Matches'
import NavigationPanel from '../../components/NavigationPanel'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function MainLayout() {
  // const profile = useSelector((s: RootState) => s.user.profile)
  // const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
      <NavigationPanel />
    </div>
  )
}

export default MainLayout
