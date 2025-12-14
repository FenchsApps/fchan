import { useState, FormEvent } from 'react'

interface ReplyFormProps {
  onSubmit: (content: string) => void
  replyTo: number
  disabled?: boolean
}

export default function ReplyForm({ onSubmit, replyTo, disabled }: ReplyFormProps) {
  const [content, setContent] = useState('')
  const [showImageError, setShowImageError] = useState(false)

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
          Replying to <a className="quote-link">&gt;&gt;{replyTo}</a>
        </div>
        
        <div className="flex gap-2 mb-2">
          <input 
            type="text"
            placeholder="Name"
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
            placeholder="Subject"
            className="border border-gray-400 px-2 py-1 text-sm flex-1"
          />
        </div>
        
        <div className="flex gap-2 mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your reply..."
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
            Post Reply
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
              Choose File
            </span>
          </label>
          
          <span className="text-gray-500 text-sm">No file chosen</span>
          
          {showImageError && (
            <span className="text-red-600 text-sm">
              Error: File upload is disabled.
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
