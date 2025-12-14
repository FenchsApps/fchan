import { Language, getTranslation } from '../translations'

interface SoundPermissionProps {
  onAccept: () => void
  language: Language
}

export default function SoundPermission({ onAccept, language }: SoundPermissionProps) {
  const t = (key: keyof typeof import('../translations').translations.en) => getTranslation(language, key)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 p-8 max-w-md text-center">
        <div className="text-white text-lg mb-4">
          {t('audioPermission')}
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          {t('audioPermissionText')}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onAccept}
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 text-sm font-bold transition-colors"
          >
            {t('allowAudio')}
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-4">
          {t('headphonesRecommended')}
        </p>
      </div>
    </div>
  )
}
