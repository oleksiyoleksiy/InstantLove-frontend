import { configureStore } from '@reduxjs/toolkit'
import matchSlice from './matchSlice'

const store = configureStore({
  reducer: {
    match: matchSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
