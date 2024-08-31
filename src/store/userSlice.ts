import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Preferences, Profile } from '../types'

interface UserState {
  profile: Profile
  preferences: Preferences
}


const userSlice = createSlice({
  name: 'user',
  initialState: <UserState>{
    profile: {},
    preferences: {},
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
