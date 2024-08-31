import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import db from '../db'
import { Item } from '../types'

interface MatchState {
  suggestions: Item[]
  liked: Item[]
}

const matchSlice = createSlice({
  name: 'match',
  initialState: <MatchState>{
    suggestions: db,
    liked: [],
  },
  reducers: {
    setLiked(state: MatchState, action: PayloadAction<Item[]>) {
      state.liked = action.payload
    },
    addLiked(state: MatchState, action: PayloadAction<Item>) {
      state.liked.push(action.payload)
    },
    deleteLiked(state: MatchState, action: PayloadAction<number>) {
      state.liked = state.liked.filter(l => l.id !== action.payload)
    },
    setSuggestions(state: MatchState, action: PayloadAction<Item[]>) {
      state.suggestions = action.payload
    },
    deleteSuggestion(state: MatchState, action: PayloadAction<number>) {
      state.suggestions = state.suggestions.filter(s => s.id !== action.payload)
    },
  },
})

export const matchActions = matchSlice.actions

export default matchSlice.reducer
