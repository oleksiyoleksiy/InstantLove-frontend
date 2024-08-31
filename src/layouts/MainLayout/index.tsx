import React from 'react'
import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import Liked from '../../pages/Liked'
import Matches from '../../pages/Matches'
import NavigationPanel from '../../components/NavigationPanel'


function MainLayout() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
      <NavigationPanel />
    </div>
  )
}

export default MainLayout
