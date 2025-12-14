import { useState } from 'react'
import { Post as PostType, HorrorLevel } from '../types'
import ImageViewer from './ImageViewer'

interface PostProps {
  post: PostType
  isOP?: boolean
  horrorLevel: HorrorLevel
}

export default function Post({ post, isOP = false, horrorLevel }: PostProps) {
  const [viewingImage, setViewingImage] = useState<string | null>(null)

  const getBgColor = () => {
    if (horrorLevel >= 4) return '#1a0a0a'
    if (horrorLevel >= 3) return '#2a1a1a'
    return '#F0E0D6'
  }

  const getBorderColor = () => {
    if (horrorLevel >= 4) return '#550000'
    if (horrorLevel >= 3) return '#3a2020'
    return '#D9BFB7'
  }

  const getTextColor = () => {
    if (horrorLevel >= 3) return '#cccccc'
    return '#000000'
  }

  const getNameColor = () => {
    if (post.author === 'John Doe') {
      if (horrorLevel >= 4) return '#ff0000'
      if (horrorLevel >= 3) return '#ff4444'
      return '#117743'
    }
    return '#117743'
  }

  const handleImageClick = (src: string) => {
    setViewingImage(src)
  }

  return (
    <>
      {viewingImage && (
        <ImageViewer 
          src={viewingImage} 
          onClose={() => setViewingImage(null)} 
        />
      )}
      
      <div 
        className={`mb-4 ${isOP ? '' : 'ml-8'}`}
        style={{ color: getTextColor() }}
      >
        {/* File info for OP */}
        {isOP && post.image && (
          <div className="text-xs text-gray-600 mb-1">
            File: <span 
              className="chan-link"
              onClick={() => handleImageClick(post.image!)}
            >
              {post.image.split('/').pop()}
            </span> (128 KB, 640x480)
          </div>
        )}
        
        <div 
          className={`inline-block ${isOP ? '' : 'border p-2'}`}
          style={{ 
            backgroundColor: isOP ? 'transparent' : getBgColor(),
            borderColor: getBorderColor()
          }}
        >
          {/* Post header */}
          <div className="text-sm mb-2">
            {isOP && post.image && (
              <div className="float-left mr-4 mb-2">
                <img 
                  src={post.image}
                  alt="Post image"
                  className="max-w-[250px] max-h-[250px] border border-gray-400 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    filter: horrorLevel >= 3 ? 'saturate(0.5) contrast(1.2)' : 'none'
                  }}
                  onClick={() => handleImageClick(post.image!)}
                />
              </div>
            )}
            
            <span>
              <input type="checkbox" className="mr-1" />
              <span 
                className="font-bold"
                style={{ color: getNameColor() }}
              >
                {post.author}
              </span>
              {' '}
              <span className={horrorLevel >= 3 ? 'text-gray-500' : 'text-gray-600'}>
                {post.date}
              </span>
              {' '}
              <span className={horrorLevel >= 3 ? 'text-gray-400' : 'text-gray-500'}>
                No.{post.id}
              </span>
              {' '}
              {!isOP && (
                <span className="text-blue-600">[Reply]</span>
              )}
            </span>
          </div>
          
          {/* Reply image for non-OP posts */}
          {!isOP && post.image && (
            <div className="mb-2">
              <img 
                src={post.image}
                alt="Reply image"
                className="max-w-[125px] max-h-[125px] border border-gray-400 float-left mr-3 cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  filter: horrorLevel >= 3 ? 'saturate(0.5) contrast(1.2)' : 'none'
                }}
                onClick={() => handleImageClick(post.image!)}
              />
            </div>
          )}
          
          {/* Reply to link */}
          {post.replyTo && (
            <div className="mb-1">
              <a className="quote-link">&gt;&gt;{post.replyTo}</a>
            </div>
          )}
          
          {/* Post content */}
          <div 
            className="text-sm leading-relaxed"
            style={{ 
              maxWidth: isOP ? '600px' : '500px',
              color: getTextColor()
            }}
          >
            {post.content.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('>') ? 'greentext' : ''}>
                {line}
              </p>
            ))}
          </div>
          
          <div className="clear-both" />
        </div>
      </div>
    </>
  )
}
