import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item, Profile } from '../types'

interface MatchState {
  suggestions: Profile[] | undefined
  liked: Profile[]
}

const matchSlice = createSlice({
  name: 'match',
  initialState: <MatchState>{
    suggestions: undefined,
    liked: [],
  },
  reducers: {
    setLiked(state: MatchState, action: PayloadAction<Profile[]>) {
      state.liked = action.payload
    },
    addLiked(state: MatchState, action: PayloadAction<Profile>) {
      state.liked.push(action.payload)
    },
    deleteLiked(state: MatchState, action: PayloadAction<number>) {
      state.liked = state.liked.filter(l => l.id !== action.payload)
    },
    setSuggestions(state: MatchState, action: PayloadAction<Profile[]>) {
      state.suggestions = action.payload
    },
    deleteSuggestion(state: MatchState, action: PayloadAction<number>) {
      state.suggestions = state.suggestions.filter(s => s.id !== action.payload)
    },
  },
})

export const matchActions = matchSlice.actions

export default matchSlice.reducer
