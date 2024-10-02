import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Preferences, Profile, ProfileData } from '../types'

interface UserState {
  profile: Profile | undefined
  preferences: Preferences | null
}


const userSlice = createSlice({
  name: 'user',
  initialState: <UserState>{
    profile: undefined,
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
