export type GameState = 
  | 'menu' 
  | 'blackout' 
  | 'sound-permission' 
  | 'fchan-home' 
  | 'sfs-board'

export type HorrorLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface Post {
  id: number
  author: string
  date: string
  content: string
  image?: string
  replyTo?: number
  isUser?: boolean
}

export interface DialogueStep {
  trigger: 'user-input'
  delay: number
  response: (userInput: string) => Post
  nextHorrorLevel?: HorrorLevel
}

