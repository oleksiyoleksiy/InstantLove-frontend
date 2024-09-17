import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/Profile'
import Preferences from '../../pages/Prefernces'
import UserRegistration from '../../pages/UserRegistration'

function NewUserLayout() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/register" element={<UserRegistration />} />
    </Routes>
  )
}

export default NewUserLayout
