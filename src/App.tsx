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
import { AuthData, Profile } from './types'
import profileService from './services/profileService'
import { userActions } from './store/userSlice'

// const tele = window.Telegram.WebApp

function App() {
  const dispatch = useDispatch()
  const profile = useSelector((s: RootState) => s.user.profile)
  const token = useSelector((s: RootState) => s.auth.accessToken)
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    // tele.ready()
    isUserExists()
  }, [])

  useEffect(() => {    
    if (token) {            
      fetchProfile()
    }
  }, [token])

  // useEffect(() => {
  //   if (isLoaded) {
  //     navigate('/')
  //   }
  // }, [isLoaded])

  const isUserExists = async () => {
    const telegramId = import.meta.env.VITE_TELEGRAM_ID

    const response = await accountService.isUserExists(telegramId)

    if (!response && !token) {
      navigate('/new/register')
    }

    if (response && !token) {
      navigate('/new/login')
    }

    setLoaded(true)
  }

  const fetchProfile = async () => {
    setLoaded(false)
    const response = await profileService.index(token as string)
    
    if (!response) {
      navigate('/new/profile')
      setLoaded(true)
      return
    }
    
    dispatch(userActions.setProfile(response as Profile))
    
    navigate('/')
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
