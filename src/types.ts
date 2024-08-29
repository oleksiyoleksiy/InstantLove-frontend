interface Item {
  id: number
  name: string
  age: number
  url: string
  is_liked_you: boolean
}

type Gender = 'male' | 'female'

interface Profile {
  name: string
  age: number
  gender: Gender
  images: File[]
  location: string
}

interface AgeRange {
  max: number
  min: number
}

interface Preferences {
  age: AgeRange
  gender: Gender
  location: string
}

interface MatchState {
  suggestions: Item[]
  liked: Item[]
}

interface UserState {
  profile: Profile
  preferences: Preferences
}
