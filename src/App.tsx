import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import NewUserLayout from './layouts/NewUserLayout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import accountService from './services/accountService'
import { authActions } from './store/authSlice'
import Loader from './components/Loader'
import { AuthData } from './types'

const tele = window.Telegram.WebApp

function App() {
  const dispatch = useDispatch()
  const profile = useSelector((s: RootState) => s.user.profile)
  const token = useSelector((s: RootState) => s.auth.accessToken)
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    tele.ready()
    isUserExists()
  }, [])

  useEffect(() => {
    console.log(token)
  }, [token])

  useEffect(() => {
    if (isLoaded) {
      navigate('/')
    }
  }, [isLoaded])

  const isUserExists = async () => {
    // const telegramId = tele.initDataUnsafe.user.id
    const telegramId = '232323'

    const response = await accountService.isUserExists(telegramId)

    if (response) {
      navigate('')
    } 

    setLoaded(true)
  }

  return (
    <>
      {isLoaded ? (
        <Routes>
          <Route path="/*" element={<MainLayout />} />
          <Route path="/new/*" element={<NewUserLayout />} />
        </Routes>
      ) : (
        <Loader />
      )}
      <ToastContainer />
    </>
  )
}

export default App
