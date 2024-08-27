import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import db from '../db'

const matchSlice = createSlice({
  name: 'match',
  initialState: <State>{
    suggestions: db,
    liked: [],
  },
  reducers: {
    setLiked(state: State, action: PayloadAction<Item[]>) {
      state.liked = action.payload
    },
    addLiked(state: State, action: PayloadAction<Item>) {
      state.liked.push(action.payload)
    },
    deleteLiked(state: State, action: PayloadAction<number>) {
      state.liked = state.liked.filter(l => l.id !== action.payload)
    },
    setSuggestions(state: State, action: PayloadAction<Item[]>) {
      state.suggestions = action.payload
    },
    deleteSuggestion(state: State, action: PayloadAction<number>) {
      state.suggestions = state.suggestions.filter(s => s.id !== action.payload)
    },
  },
})

export const matchActions = matchSlice.actions

export default matchSlice.reducer
