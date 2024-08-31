import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import NewUserLayout from './layouts/NewUserLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const tele = window.Telegram.WebApp

function App() {
  const profile = useSelector((s: RootState) => s.user.profile)
  const navigate = useNavigate()

  useEffect(() => {
    tele.ready()
  }, [])

  useEffect(() => {
    if (isEmpty(profile)) {
      navigate('/new/profile')
    }
  }, [])

  const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0
  }
  
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
