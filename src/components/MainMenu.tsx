import { useState } from 'react'
import { Language, getTranslation } from '../translations'

interface MainMenuProps {
  onComputerClick: () => void
  hideIP: boolean
  setHideIP: (value: boolean) => void
  accessibilityMode: boolean
  setAccessibilityMode: (value: boolean) => void
  hasSave: boolean
  onContinue: () => void
  onNewGame: () => void
  language: Language
  setLanguage: (lang: Language) => void
}

export default function MainMenu({ 
  onComputerClick, 
  hideIP, 
  setHideIP,
  accessibilityMode,
  setAccessibilityMode,
  hasSave,
  onContinue,
  onNewGame,
  language,
  setLanguage
}: MainMenuProps) {
  const [hovered, setHovered] = useState(false)
  const t = (key: keyof typeof import('../translations').translations.en) => getTranslation(language, key)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 text-sm font-bold transition-colors"
      >
        {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
      </button>

      {/* Computer */}
      <div 
        className="cursor-pointer transition-all duration-300 mb-12"
        style={{
          filter: hovered ? 'brightness(1.2) drop-shadow(0 0 20px rgba(100, 200, 255, 0.5))' : 'none',
          transform: hovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onComputerClick}
      >
        <img 
          src="/pc.png" 
          alt="Computer"
          className="w-64 h-auto select-none"
          draggable={false}
        />
        {hovered && !hasSave && (
          <div className="text-center mt-4 text-gray-400 text-sm">
            {t('clickToEnter')}
          </div>
        )}
      </div>

      {/* Save dialog */}
      {hasSave && (
        <div className="bg-gray-900 border border-gray-600 p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-center">{t('saveFound')}</h3>
          <div className="flex gap-4">
            <button
              onClick={onContinue}
              className="bg-green-700 hover:bg-green-600 px-6 py-2 font-bold transition-colors"
            >
              {t('continueGame')}
            </button>
            <button
              onClick={onNewGame}
              className="bg-red-800 hover:bg-red-700 px-6 py-2 font-bold transition-colors"
            >
              {t('newGame')}
            </button>
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="max-w-xl text-center px-4 mb-8">
        <div className="border border-red-800 bg-red-900/30 p-4 mb-4">
          <h2 className="text-red-500 font-bold mb-2 text-lg">⚠ {t('warning')} ⚠</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t('warningText')}
          </p>
          <p className="text-yellow-400 text-sm font-bold mt-2">
            {t('lowerVolume')}
          </p>
        </div>

        <p className="text-gray-500 text-xs mb-6">
          {t('ageDisclaimer')}
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
            {t('hideIP')}
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
            {t('accessibilityMode')}
          </label>
        </div>
        
        {accessibilityMode && (
          <div className="text-green-400 text-xs text-center px-4">
            {t('accessibilityNote')}
          </div>
        )}
      </div>
    </div>
  )
}
