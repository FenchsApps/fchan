import { useState, useRef, useEffect, useCallback } from 'react'
import MainMenu from './components/MainMenu'
import SoundPermission from './components/SoundPermission'
import FChanHome from './components/FChanHome'
import SFSBoard from './components/SFSBoard'
import { GameState, HorrorLevel } from './types'
import { loadGame, saveGame, clearSave } from './hooks/useGameSave'

function App() {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [hideIP, setHideIP] = useState(false)
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [horrorLevel, setHorrorLevel] = useState<HorrorLevel>(0)
  const [userIP, setUserIP] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasSave, setHasSave] = useState(false)
  const ambientRef = useRef<HTMLAudioElement | null>(null)
  const horrorRef = useRef<HTMLAudioElement | null>(null)

  // Load saved game on mount
  useEffect(() => {
    const saved = loadGame()
    if (saved && saved.gameState !== 'menu') {
      setHasSave(true)
      setHideIP(saved.hideIP)
      setAccessibilityMode(saved.accessibilityMode)
      setUserIP(saved.userIP)
    }
    setIsLoaded(true)
  }, [])

  // Generate fake or "real" IP
  useEffect(() => {
    if (userIP) return
    
    const generateIP = () => {
      if (hideIP) {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      } else {
        const octets = [
          Math.floor(Math.random() * 200) + 10,
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 254) + 1
        ]
        return octets.join('.')
      }
    }
    setUserIP(generateIP())
  }, [hideIP, userIP])

  // Save settings when they change
  useEffect(() => {
    if (isLoaded && gameState !== 'menu') {
      saveGame({ hideIP, accessibilityMode, userIP, gameState, horrorLevel })
    }
  }, [hideIP, accessibilityMode, userIP, gameState, horrorLevel, isLoaded])

  const handleContinueGame = useCallback(() => {
    const saved = loadGame()
    if (saved) {
      setHideIP(saved.hideIP)
      setAccessibilityMode(saved.accessibilityMode)
      setUserIP(saved.userIP)
      setHorrorLevel(saved.horrorLevel)
      setGameState(saved.gameState)
    }
  }, [])

  const handleNewGame = useCallback(() => {
    clearSave()
    setHasSave(false)
    setGameState('blackout')
    setTimeout(() => {
      setGameState('sound-permission')
    }, 1000)
  }, [])

  const handleComputerClick = useCallback(() => {
    if (hasSave) {
      return
    }
    handleNewGame()
  }, [hasSave, handleNewGame])

  const handleSoundPermission = useCallback(() => {
    setGameState('fchan-home')
    saveGame({ gameState: 'fchan-home' })
  }, [])

  const handleEnterBoard = useCallback(() => {
    setGameState('sfs-board')
    saveGame({ gameState: 'sfs-board' })
  }, [])

  const increaseHorror = useCallback(() => {
    if (accessibilityMode) return
    setHorrorLevel(prev => {
      const newLevel = Math.min(prev + 1, 5) as HorrorLevel
      saveGame({ horrorLevel: newLevel })
      return newLevel
    })
  }, [accessibilityMode])

  const playAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = 0.3
      ambientRef.current.loop = true
      ambientRef.current.play().catch(() => {})
    }
  }, [])

  const stopAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.pause()
      ambientRef.current.currentTime = 0
    }
  }, [])

  const playHorror = useCallback(() => {
    if (horrorRef.current) {
      horrorRef.current.volume = accessibilityMode ? 0.2 : 0.5
      horrorRef.current.loop = true
      horrorRef.current.play().catch(() => {})
    }
  }, [accessibilityMode])

  const getHorrorClasses = () => {
    if (accessibilityMode) return ''
    
    switch (horrorLevel) {
      case 1:
        return 'flicker'
      case 2:
        return 'flicker glitch'
      case 3:
        return 'distort glitch'
      case 4:
        return 'distort glitch shake'
      case 5:
        return 'distort glitch shake flash-red crt'
      default:
        return ''
    }
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <div className={`min-h-screen ${getHorrorClasses()}`}>
      <audio ref={ambientRef} src="/ambient1.mp3" />
      <audio ref={horrorRef} src="/iseeyou.mp3" />
      
      {gameState === 'menu' && (
        <MainMenu 
          onComputerClick={handleComputerClick}
          hideIP={hideIP}
          setHideIP={setHideIP}
          accessibilityMode={accessibilityMode}
          setAccessibilityMode={setAccessibilityMode}
          hasSave={hasSave}
          onContinue={handleContinueGame}
          onNewGame={handleNewGame}
        />
      )}

      {gameState === 'blackout' && (
        <div className="fixed inset-0 bg-black z-50" />
      )}

      {gameState === 'sound-permission' && (
        <SoundPermission onAccept={handleSoundPermission} />
      )}

      {gameState === 'fchan-home' && (
        <FChanHome onEnterBoard={handleEnterBoard} />
      )}

      {gameState === 'sfs-board' && (
        <SFSBoard 
          horrorLevel={horrorLevel}
          increaseHorror={increaseHorror}
          userIP={userIP}
          playAmbient={playAmbient}
          playHorror={playHorror}
          stopAmbient={stopAmbient}
          accessibilityMode={accessibilityMode}
        />
      )}
    </div>
  )
}

export default App
