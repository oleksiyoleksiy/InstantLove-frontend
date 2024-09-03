import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

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
