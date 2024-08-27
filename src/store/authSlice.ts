import { createSlice } from '@reduxjs/toolkit'

// const initialLanguage = localStorage.getItem('lang') ?? 'en'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user: null,
    // language: initialLanguage,
    // token: localStorage.getItem('accessToken'),
    // refreshToken: localStorage.getItem('refreshToken'),
  },
  reducers: {
    // setUser(state, action) {
    //   state.user = action.payload
    // },
    // setLanguage(state, action) {
    //   state.language = action.payload
    //   localStorage.setItem('lang', action.payload)
    // },
    // setToken(state, action) {
    //   state.token = action.payload.accessToken
    //   state.refreshToken = action.payload.refreshToken
    //   localStorage.setItem('accessToken', state.token)
    //   localStorage.setItem('refreshToken', state.refreshToken)
    // },
    // logout(state) {
    //   state.user = null
    //   state.token = null
    //   state.refreshToken = null
    //   localStorage.removeItem('accessToken')
    //   localStorage.removeItem('refreshToken')
    // },
  },
})

export const authActions = authSlice.actions

export default authSlice
