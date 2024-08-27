import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavigationPanel from './components/NavigationPanel'

const tele = window.Telegram.WebApp

function App() {
  useEffect(() => {
    tele.ready()
    console.log(tele.initDataUnsafe)
  }, [])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <NavigationPanel />
    </div>
  )
}

export default App
