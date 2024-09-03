import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Preferences, Profile } from '../types'

interface UserState {
  profile: Profile | null
  preferences: Preferences | null
}


const userSlice = createSlice({
  name: 'user',
  initialState: <UserState>{
    profile: null,
    preferences: null,
  },
  reducers: {
    setProfile(state: UserState, action: PayloadAction<Profile>) {
      state.profile = action.payload
    },
    setPreferences(state: UserState, action: PayloadAction<Preferences>) {
      state.preferences = action.payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
