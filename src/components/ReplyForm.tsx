import { useState, FormEvent } from 'react'
import { Language, getTranslation } from '../translations'

interface ReplyFormProps {
  onSubmit: (content: string) => void
  replyTo: number
  disabled?: boolean
  language: Language
}

export default function ReplyForm({ onSubmit, replyTo, disabled, language }: ReplyFormProps) {
  const [content, setContent] = useState('')
  const [showImageError, setShowImageError] = useState(false)
  const t = (key: keyof typeof import('../translations').translations.en) => getTranslation(language, key)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (content.trim() && !disabled) {
      onSubmit(content.trim())
      setContent('')
    }
  }

  const handleFileClick = () => {
    setShowImageError(true)
    setTimeout(() => setShowImageError(false), 3000)
  }

  return (
    <div className="bg-chan-post-bg border-t-2 border-chan-post-border p-4 mt-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="text-sm mb-2 text-gray-600">
          {t('replyingTo')} <a className="quote-link">&gt;&gt;{replyTo}</a>
        </div>
        
        <div className="flex gap-2 mb-2">
          <input 
            type="text"
            placeholder={t('name')}
            defaultValue="Anonymous"
            className="border border-gray-400 px-2 py-1 text-sm w-32"
            disabled
          />
          <input 
            type="text"
            placeholder="Options"
            className="border border-gray-400 px-2 py-1 text-sm w-32"
          />
          <input 
            type="text"
            placeholder={t('subject')}
            className="border border-gray-400 px-2 py-1 text-sm flex-1"
          />
        </div>
        
        <div className="flex gap-2 mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('typeReply')}
            className="border border-gray-400 px-2 py-1 text-sm flex-1 h-20 resize-none"
            disabled={disabled}
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <button
            type="submit"
            disabled={disabled || !content.trim()}
            className="bg-gray-200 border border-gray-400 px-4 py-1 text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('postReply')}
          </button>
          
          <label className="text-sm">
            <input 
              type="file"
              className="hidden"
              onClick={(e) => {
                e.preventDefault()
                handleFileClick()
              }}
            />
            <span className="border border-gray-400 bg-gray-200 px-2 py-1 cursor-pointer hover:bg-gray-300">
              {t('chooseFile')}
            </span>
          </label>
          
          <span className="text-gray-500 text-sm">{t('noFileChosen')}</span>
          
          {showImageError && (
            <span className="text-red-600 text-sm">
              {t('fileUploadError')}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
