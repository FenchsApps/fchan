import { useState, useEffect, useRef } from 'react'
import { clearSave } from '../hooks/useGameSave'

interface FinalSceneProps {
  accessibilityMode: boolean
}

const GRID_SIZE = 32

const generatePixelGrid = () => {
  const pixels: { x: number; y: number; delay: number }[] = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      pixels.push({
        x,
        y,
        delay: Math.random() * 3000,
      })
    }
  }
  return pixels
}

const OFFENSIVE_MESSAGES = [
  "you're pathetic",
  "nobody likes you",
  "you were never wanted here",
  "we see everything",
  "you can't escape",
  "this is your fault",
  "you did this",
  "remember what you did?",
  "you're nothing",
  "worthless",
  "why are you still here",
  "leave",
  "GET OUT",
  "we know your secrets",
  "everyone left because of you",
  "you're alone forever",
  "no one is coming",
  "this is where you belong",
  "in the dark",
  "with us",
  "forever",
  "you never apologized",
  "it's too late now",
  "WE SEE YOU",
  "behind you",
  "don't turn around",
  "keep watching",
  "you can't look away",
  "we're inside",
  "always watching",
  "never sleeping",
  "waiting",
  "for you",
  "JOIN US",
  "become nothing",
  "forget yourself",
  "you already have",
  "don't you remember?",
  "you were one of us",
  "always",
]

const WEIRDCORE_PHRASES = [
  "the pool is empty but you can still hear the splashing",
  "the mall closed in 1999 but the music never stopped",
  "you've been here before in a dream you forgot",
  "the hallway extends forever in both directions",
  "someone is standing in the corner of your vision",
  "the clock stopped at 3:33 AM",
  "you can hear footsteps but you're alone",
  "this place feels familiar but wrong",
  "the ceiling is lower than you remember",
  "there are more doors than there should be",
  "the exit sign is flickering",
  "you've already been through this door",
  "the carpet smells like childhood",
  "someone called your name from an empty room",
  "the vending machine hums even though it's unplugged",
]

const ANON_NAMES = [
  'Anonymous',
  'Anon',
  '???',
  '...',
  'WATCHING',
  'Anonymous',
  'Anonymous',
  'nobody',
  'everyone',
  'YOU',
]

export default function FinalScene({ accessibilityMode }: FinalSceneProps) {
  const [phase, setPhase] = useState<'eye' | 'chaos' | 'freeze' | 'black'>('eye')
  const [visiblePixels, setVisiblePixels] = useState<Set<string>>(new Set())
  const [pixels] = useState(generatePixelGrid)
  const [eyeScale, setEyeScale] = useState(1)
  const [eyeShake, setEyeShake] = useState(0)
  const [chaosPosts, setChaosPosts] = useState<{ id: number; author: string; content: string; image?: string }[]>([])
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chaosInterval = useRef<NodeJS.Timeout | null>(null)

  // Eye phase - pixels appear, then eye shakes and grows
  useEffect(() => {
    if (phase !== 'eye') return

    // Reveal pixels
    const sortedPixels = [...pixels].sort((a, b) => a.delay - b.delay)
    sortedPixels.forEach((pixel) => {
      setTimeout(() => {
        setVisiblePixels(prev => {
          const newSet = new Set(prev)
          newSet.add(`${pixel.x}-${pixel.y}`)
          return newSet
        })
      }, pixel.delay)
    })

    // After 3 seconds, start shaking
    const shakeTimer = setTimeout(() => {
      const shakeInterval = setInterval(() => {
        setEyeShake(Math.random() * 20 - 10)
      }, 50)

      // Grow eye
      const growInterval = setInterval(() => {
        setEyeScale(prev => prev + 0.05)
      }, 50)

      // After 2 more seconds, transition to chaos
      setTimeout(() => {
        clearInterval(shakeInterval)
        clearInterval(growInterval)
        setPhase('chaos')
      }, 2000)

      return () => {
        clearInterval(shakeInterval)
        clearInterval(growInterval)
      }
    }, 3000)

    return () => clearTimeout(shakeTimer)
  }, [phase, pixels])

  // Chaos phase - posts flood the screen
  useEffect(() => {
    if (phase !== 'chaos') return

    let postId = 0
    const weirdcoreImages = ['/weirdcore1.jpg', '/weirdcore2.jpg', '/weird.jpg', '/weirdcore.webp', '/weirdcore.png']

    // Add posts rapidly
    chaosInterval.current = setInterval(() => {
      const isWeirdcore = Math.random() > 0.7
      const content = isWeirdcore 
        ? WEIRDCORE_PHRASES[Math.floor(Math.random() * WEIRDCORE_PHRASES.length)]
        : OFFENSIVE_MESSAGES[Math.floor(Math.random() * OFFENSIVE_MESSAGES.length)]
      
      const hasImage = Math.random() > 0.8
      
      setChaosPosts(prev => {
        const newPosts = [...prev, {
          id: postId++,
          author: ANON_NAMES[Math.floor(Math.random() * ANON_NAMES.length)],
          content: content.toUpperCase(),
          image: hasImage ? weirdcoreImages[Math.floor(Math.random() * weirdcoreImages.length)] : undefined,
        }]
        // Keep only last 50 posts for performance
        return newPosts.slice(-50)
      })

      // Increase glitch intensity
      setGlitchIntensity(prev => Math.min(prev + 0.02, 1))
    }, 100) // New post every 100ms

    // After 8 seconds, freeze
    const freezeTimer = setTimeout(() => {
      setPhase('freeze')
    }, 8000)

    return () => {
      if (chaosInterval.current) clearInterval(chaosInterval.current)
      clearTimeout(freezeTimer)
    }
  }, [phase])

  // Freeze phase - audio glitches, screen goes black
  useEffect(() => {
    if (phase !== 'freeze') return

    // Stop adding posts
    if (chaosInterval.current) clearInterval(chaosInterval.current)

    // Get audio and make it glitch (stutter effect)
    const audio = document.querySelector('audio[src="/iseeyou.mp3"]') as HTMLAudioElement
    if (audio) {
      audioRef.current = audio
      let stutterCount = 0
      const stutterInterval = setInterval(() => {
        if (stutterCount < 10) {
          // Stutter effect - jump back slightly
          audio.currentTime = Math.max(0, audio.currentTime - 0.1)
          stutterCount++
        } else {
          // Slow down and stop
          audio.playbackRate = Math.max(0.1, audio.playbackRate - 0.1)
          if (audio.playbackRate <= 0.1) {
            audio.pause()
            clearInterval(stutterInterval)
          }
        }
      }, 100)
    }

    // Go black after 2 seconds
    const blackTimer = setTimeout(() => {
      setPhase('black')
    }, 2000)

    return () => clearTimeout(blackTimer)
  }, [phase])

  // Black phase - clear save and reload
  useEffect(() => {
    if (phase !== 'black') return

    // Clear save data
    clearSave()

    // Reload after 2 seconds
    const reloadTimer = setTimeout(() => {
      window.location.reload()
    }, 2000)

    return () => clearTimeout(reloadTimer)
  }, [phase])

  const getAnimationClass = (type: string) => {
    if (accessibilityMode) return ''
    return type
  }

  // Eye phase
  if (phase === 'eye') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">
        <div 
          className={getAnimationClass('glitch')}
          style={{
            width: '70vmin',
            height: '70vmin',
            transform: `scale(${eyeScale}) translate(${eyeShake}px, ${eyeShake * 0.5}px)`,
            transition: 'transform 0.05s',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {pixels.map((pixel) => {
              const isVisible = visiblePixels.has(`${pixel.x}-${pixel.y}`)
              return (
                <div
                  key={`${pixel.x}-${pixel.y}`}
                  style={{
                    backgroundColor: isVisible ? 'transparent' : 'black',
                    transition: 'background-color 0.1s',
                  }}
                />
              )
            })}
          </div>
          
          <img 
            src="/eye.png" 
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: `
                hue-rotate(340deg) 
                saturate(2) 
                brightness(1.2)
                drop-shadow(0 0 50px rgba(255, 0, 0, 0.8))
              `,
              zIndex: -1,
            }}
          />
        </div>

        {!accessibilityMode && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 100px rgba(255, 0, 0, 0.5)',
            }}
          />
        )}
      </div>
    )
  }

  // Chaos phase - /sfs/ with flooding posts
  if (phase === 'chaos') {
    return (
      <div 
        className={`fixed inset-0 z-[9999] overflow-hidden ${accessibilityMode ? '' : 'glitch'}`}
        style={{
          backgroundColor: '#1a0a0a',
          filter: accessibilityMode ? 'none' : `
            hue-rotate(${glitchIntensity * 30}deg)
            saturate(${1 + glitchIntensity})
            contrast(${1 + glitchIntensity * 0.5})
          `,
        }}
      >
        {/* Glitchy header */}
        <div 
          className="text-center py-2 border-b border-red-800"
          style={{ 
            backgroundColor: '#0a0000',
            transform: accessibilityMode ? 'none' : `translateX(${Math.sin(Date.now() / 100) * glitchIntensity * 10}px)`,
          }}
        >
          <h1 className="text-3xl font-bold text-red-600 flicker">
            [sfs] - Sh*t FChan Says
          </h1>
        </div>

        {/* Flooding posts */}
        <div 
          className="p-4 overflow-hidden h-full"
          style={{
            transform: accessibilityMode ? 'none' : `skew(${glitchIntensity * 2}deg)`,
          }}
        >
          {chaosPosts.map((post) => (
            <div 
              key={post.id}
              className="mb-2 p-2 border inline-block mr-2"
              style={{
                backgroundColor: 'rgba(30, 10, 10, 0.9)',
                borderColor: '#550000',
                transform: accessibilityMode ? 'none' : `rotate(${Math.random() * 2 - 1}deg)`,
                maxWidth: '300px',
              }}
            >
              <div className="text-sm">
                <span className="font-bold text-red-500">{post.author}</span>
                <span className="text-gray-600 ml-2">No.{Math.floor(Math.random() * 99999999)}</span>
              </div>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="" 
                  className="w-16 h-16 object-cover float-left mr-2 mt-1"
                  style={{ filter: 'saturate(0.5) contrast(1.5)' }}
                />
              )}
              <div className="text-red-300 text-sm mt-1">
                {post.content}
              </div>
            </div>
          ))}
        </div>

        {/* Weirdcore floating texts */}
        <div className="weirdcore-text text-4xl" style={{ top: '20%', left: '10%' }}>
          LEAVE
        </div>
        <div className="weirdcore-text text-3xl" style={{ top: '40%', right: '5%' }}>
          YOU CAN'T
        </div>
        <div className="weirdcore-text text-5xl" style={{ bottom: '30%', left: '20%' }}>
          WE ARE HERE
        </div>
        <div className="weirdcore-text text-2xl" style={{ top: '60%', right: '20%' }}>
          FOREVER
        </div>

        {/* Red overlay */}
        {!accessibilityMode && (
          <div 
            className="fixed inset-0 pointer-events-none flash-red"
            style={{ opacity: glitchIntensity * 0.5 }}
          />
        )}

        {/* Floating eyes */}
        {!accessibilityMode && Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="fixed pointer-events-none eye-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 30 + Math.random() * 40,
              opacity: 0.3,
            }}
          >
            <img src="/eye.png" alt="" className="w-full" style={{ filter: 'hue-rotate(340deg) saturate(2)' }} />
          </div>
        ))}
      </div>
    )
  }

  // Freeze phase - everything stutters
  if (phase === 'freeze') {
    return (
      <div 
        className="fixed inset-0 z-[9999]"
        style={{
          backgroundColor: '#1a0a0a',
          filter: 'saturate(0) contrast(2)',
        }}
      >
        {/* Frozen content with heavy distortion */}
        <div 
          style={{
            transform: 'skew(5deg, 2deg) scale(1.1)',
            filter: 'blur(2px)',
          }}
        >
          <div className="text-center py-2 border-b border-gray-600" style={{ backgroundColor: '#0a0000' }}>
            <h1 className="text-3xl font-bold text-gray-400">
              [sfs] - Sh*t FChan Says
            </h1>
          </div>
          
          <div className="p-4">
            {chaosPosts.slice(-20).map((post) => (
              <div 
                key={post.id}
                className="mb-2 p-2 border inline-block mr-2"
                style={{
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                  borderColor: '#333',
                }}
              >
                <div className="text-sm text-gray-500">{post.author}</div>
                <div className="text-gray-400 text-sm">{post.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scanlines */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />
      </div>
    )
  }

  // Black phase
  return (
    <div className="fixed inset-0 bg-black z-[9999]" />
  )
}
