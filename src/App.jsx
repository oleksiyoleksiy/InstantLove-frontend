import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavigationPanel from './components/NavigationPanel'
import Liked from './pages/Liked'
import Matches from './pages/Matches'
import Profile from './pages/Profile'
import MainLayout from './layouts/MainLayout'
import NewUserLayout from './layouts/NewUserLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const tele = window.Telegram.WebApp

function App() {
  useEffect(() => {
    tele.ready()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/new/*" element={<NewUserLayout />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
