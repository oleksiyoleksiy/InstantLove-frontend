interface Item {
  id: number
  name: string
  age: number
  url: string
  is_liked_you: boolean
}

interface State {
  suggestions: Item[]
  liked: Item[]
}
