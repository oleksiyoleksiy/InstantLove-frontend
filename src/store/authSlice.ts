import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Token } from '../types'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: <AuthState>{
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
  reducers: {
    setToken(state, action: PayloadAction<Token>) {
      const payload = action.payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      localStorage.setItem('accessToken', payload.accessToken)
      localStorage.setItem('refreshToken', payload.refreshToken)
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
