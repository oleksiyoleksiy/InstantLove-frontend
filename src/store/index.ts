import { configureStore } from '@reduxjs/toolkit'
import matchSlice from './matchSlice'
import userSlice from './userSlice'
import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    match: matchSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
