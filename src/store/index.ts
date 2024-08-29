import { configureStore } from '@reduxjs/toolkit'
import matchSlice from './matchSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    match: matchSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
