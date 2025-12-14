import { useEffect, useCallback } from 'react'
import { Post, HorrorLevel, GameState } from '../types'
import { Language } from '../translations'

const SAVE_KEY = 'fchan_horror_save'

export interface GameSave {
  gameState: GameState
  dialogueStep: number
  posts: Post[]
  horrorLevel: HorrorLevel
  hideIP: boolean
  accessibilityMode: boolean
  userIP: string
  weirdcoreIndex: number
  showWeirdcore: boolean
  timestamp: number
  language?: Language
}

export function saveGame(data: Partial<GameSave>) {
  try {
    const existing = loadGame()
    const save: GameSave = {
      gameState: data.gameState ?? existing?.gameState ?? 'menu',
      dialogueStep: data.dialogueStep ?? existing?.dialogueStep ?? 0,
      posts: data.posts ?? existing?.posts ?? [],
      horrorLevel: data.horrorLevel ?? existing?.horrorLevel ?? 0,
      hideIP: data.hideIP ?? existing?.hideIP ?? false,
      accessibilityMode: data.accessibilityMode ?? existing?.accessibilityMode ?? false,
      userIP: data.userIP ?? existing?.userIP ?? '',
      weirdcoreIndex: data.weirdcoreIndex ?? existing?.weirdcoreIndex ?? 0,
      showWeirdcore: data.showWeirdcore ?? existing?.showWeirdcore ?? false,
      timestamp: Date.now(),
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
  } catch (e) {
    console.error('Failed to save game:', e)
  }
}

export function loadGame(): GameSave | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY)
    if (saved) {
      return JSON.parse(saved) as GameSave
    }
  } catch (e) {
    console.error('Failed to load game:', e)
  }
  return null
}

export function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch (e) {
    console.error('Failed to clear save:', e)
  }
}

export function useAutoSave(data: Partial<GameSave>, dependencies: unknown[]) {
  useEffect(() => {
    if (data.gameState && data.gameState !== 'menu') {
      saveGame(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export function useGameSave() {
  const save = useCallback((data: Partial<GameSave>) => {
    saveGame(data)
  }, [])

  const load = useCallback(() => {
    return loadGame()
  }, [])

  const clear = useCallback(() => {
    clearSave()
  }, [])

  return { save, load, clear }
}

