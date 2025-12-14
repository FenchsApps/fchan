import { useState } from 'react'

interface MainMenuProps {
  onComputerClick: () => void
  hideIP: boolean
  setHideIP: (value: boolean) => void
  accessibilityMode: boolean
  setAccessibilityMode: (value: boolean) => void
  hasSave: boolean
  onContinue: () => void
  onNewGame: () => void
}

export default function MainMenu({ 
  onComputerClick, 
  hideIP, 
  setHideIP,
  accessibilityMode,
  setAccessibilityMode,
  hasSave,
  onContinue,
  onNewGame
}: MainMenuProps) {
  const [hovered, setHovered] = useState(false)
  const [showSavePrompt, setShowSavePrompt] = useState(false)

  const handleClick = () => {
    if (hasSave) {
      setShowSavePrompt(true)
    } else {
      onComputerClick()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      {/* Save prompt modal */}
      {showSavePrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-600 p-6 max-w-md text-center">
            <h2 className="text-xl mb-4 text-white">Save Found</h2>
            <p className="text-gray-400 text-sm mb-6">
              You have a saved game. Would you like to continue or start fresh?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowSavePrompt(false)
                  onContinue()
                }}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 text-sm font-bold"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowSavePrompt(false)
                  onNewGame()
                }}
                className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 text-sm font-bold"
              >
                New Game
              </button>
            </div>
            <button
              onClick={() => setShowSavePrompt(false)}
              className="mt-4 text-gray-500 hover:text-gray-300 text-sm underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Computer */}
      <div 
        className="cursor-pointer transition-all duration-300 mb-12"
        style={{
          filter: hovered ? 'brightness(1.2) drop-shadow(0 0 20px rgba(100, 200, 255, 0.5))' : 'none',
          transform: hovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <img 
          src="/pc.png" 
          alt="Computer"
          className="w-64 h-auto select-none"
          draggable={false}
        />
        {hovered && (
          <div className="text-center mt-4 text-gray-400 text-sm">
            {hasSave ? 'Click to continue...' : 'Click to enter...'}
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="max-w-xl text-center px-4 mb-8">
        <div className="border border-red-800 bg-red-900/30 p-4 mb-4">
          <h2 className="text-red-500 font-bold mb-2 text-lg">⚠ WARNING ⚠</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            This experience contains <span className="text-yellow-400 font-bold">LOUD SOUNDS</span>, flashing lights, 
            disturbing imagery, and horror elements.
            Not recommended for those with epilepsy or heart conditions.
            <span className="text-yellow-400 block mt-2">🔊 Lower your volume before playing!</span>
            Player discretion is advised. This is a work of fiction.
          </p>
        </div>

        <p className="text-gray-500 text-xs mb-6">
          By clicking the computer, you agree that you are 18+ years old and 
          understand this is a horror experience.
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-3 border border-gray-700">
          <input 
            type="checkbox"
            id="hideIP"
            checked={hideIP}
            onChange={(e) => setHideIP(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label 
            htmlFor="hideIP" 
            className="text-gray-300 text-sm cursor-pointer select-none"
          >
            Hide your IP during gameplay
          </label>
        </div>

        <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-3 border border-blue-700">
          <input 
            type="checkbox"
            id="accessibilityMode"
            checked={accessibilityMode}
            onChange={(e) => setAccessibilityMode(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label 
            htmlFor="accessibilityMode" 
            className="text-blue-300 text-sm cursor-pointer select-none"
          >
            👁️ Accessibility Mode (no flashing/flickering)
          </label>
        </div>
        
        {accessibilityMode && (
          <div className="text-green-400 text-xs text-center px-4">
            ✓ Flashing lights, screen shake, and rapid animations are disabled.
            <br />
            Safe for photosensitive users and those with eye strain.
          </div>
        )}
      </div>
    </div>
  )
}
