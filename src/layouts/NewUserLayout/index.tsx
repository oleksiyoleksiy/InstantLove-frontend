import React from 'react'
import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/Profile'

function NewUserLayout() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default NewUserLayout
