import { Language, getTranslation } from '../translations'

interface FChanHomeProps {
  onEnterBoard: () => void
  language: Language
}

export default function FChanHome({ onEnterBoard, language }: FChanHomeProps) {
  const t = (key: keyof typeof import('../translations').translations.en) => getTranslation(language, key)

  return (
    <div className="min-h-screen bg-chan-bg">
      {/* Header */}
      <div className="text-center py-4 border-b border-gray-300">
        <h1 className="text-5xl font-bold text-chan-header" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          FChan
        </h1>
        <p className="text-gray-600 text-xs mt-1">
          The stories and information posted here are artistic works of fiction and falsehood.
        </p>
      </div>

      {/* What is FChan box */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="border border-gray-400 bg-white">
          <div className="bg-chan-header text-white px-3 py-1 flex justify-between items-center">
            <span className="font-bold text-sm">{t('whatIsFchan')}</span>
            <span className="cursor-pointer">✕</span>
          </div>
          <div className="p-3 text-sm">
            <p className="mb-2">
              {t('fchanDescription1')}
            </p>
            <p>
              {t('fchanDescription2')}
            </p>
          </div>
        </div>
      </div>

      {/* Boards Section */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="border border-gray-400 bg-white">
          <div className="bg-chan-header text-white px-3 py-1 flex justify-between items-center">
            <span className="font-bold text-sm">{t('boards')}</span>
            <span className="text-xs cursor-pointer">{t('filter')} ▼</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4 text-sm">
              {/* Misc. (NSFW) */}
              <div>
                <h3 className="text-chan-header font-bold underline mb-2">{t('miscNsfw')} <span className="text-red-600">(NSFW)</span></h3>
                <ul className="space-y-1">
                  <li>
                    <span 
                      className="chan-link"
                      onClick={onEnterBoard}
                    >
                      {t('shitFchanSays')}
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Empty columns to match 4chan layout */}
              <div>
                <h3 className="text-gray-400 font-bold mb-2">{t('japaneseCulture')}</h3>
                <p className="text-gray-400 text-xs italic">{t('noBoardsAvailable')}</p>
              </div>
              <div>
                <h3 className="text-gray-400 font-bold mb-2">{t('interests')}</h3>
                <p className="text-gray-400 text-xs italic">{t('noBoardsAvailable')}</p>
              </div>
              <div>
                <h3 className="text-gray-400 font-bold mb-2">{t('creative')}</h3>
                <p className="text-gray-400 text-xs italic">{t('noBoardsAvailable')}</p>
              </div>
              <div>
                <h3 className="text-gray-400 font-bold mb-2">{t('other')}</h3>
                <p className="text-gray-400 text-xs italic">{t('noBoardsAvailable')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Threads Section */}
      <div className="max-w-4xl mx-auto mt-8 px-4 mb-8">
        <div className="border border-gray-400 bg-white">
          <div className="bg-chan-header text-white px-3 py-1 flex justify-between items-center">
            <span className="font-bold text-sm">{t('popularThreads')}</span>
            <span className="text-xs cursor-pointer">{t('options')} ▼</span>
          </div>
          <div className="p-4">
            <div className="flex gap-4">
              <div 
                className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onEnterBoard}
              >
                <div className="text-center text-xs text-chan-header font-bold mb-1">
                  {t('shitFchanSays')}
                </div>
                <div className="border border-gray-300 p-1 bg-chan-post-bg">
                  <img 
                    src="/cat.jpeg" 
                    alt="Thread preview"
                    className="w-full h-20 object-cover"
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">
                  1 {t('reply')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
