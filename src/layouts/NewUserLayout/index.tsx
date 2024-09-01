import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/Profile'
import Preferences from '../../pages/Prefernces'

function NewUserLayout() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />
    </Routes>
  )
}

export default NewUserLayout
