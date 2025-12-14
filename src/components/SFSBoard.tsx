import { useState, useCallback, useEffect } from 'react'
import { Post, HorrorLevel } from '../types'
import PostComponent from './Post'
import ReplyForm from './ReplyForm'
import HorrorOverlay from './HorrorOverlay'
import FinalScene from './FinalScene'
import { loadGame, saveGame } from '../hooks/useGameSave'
import { Language, getTranslation } from '../translations'

interface SFSBoardProps {
  horrorLevel: HorrorLevel
  increaseHorror: () => void
  userIP: string
  playAmbient: () => void
  playHorror: () => void
  stopAmbient: () => void
  accessibilityMode: boolean
  language: Language
}

const PEPE_IMAGES = [
  '/frog.png',
  '/pepe-the-frog-pol-4chan-internet-meme-meme.jpg',
  '/pepefrog-superJumbo.jpg',
]

const WEIRDCORE_IMAGES = [
  '/weirdcore1.jpg',
  '/weirdcore2.jpg',
  '/weird.jpg',
  '/weirdcore.webp',
  '/weirdcore.png',
]

const getRandomPepe = () => PEPE_IMAGES[Math.floor(Math.random() * PEPE_IMAGES.length)]

export default function SFSBoard({ 
  horrorLevel, 
  increaseHorror, 
  userIP,
  playAmbient,
  playHorror,
  stopAmbient,
  accessibilityMode,
  language
}: SFSBoardProps) {
  const t = (key: keyof typeof import('../translations').translations.en) => getTranslation(language, key)
  
  const INITIAL_POST: Post = {
    id: 12683241,
    author: 'John Doe',
    date: '10/15/23(Sun)12:00:00',
    content: t('johnDoeInitial'),
    image: '/cat.jpeg',
  }

  const [posts, setPosts] = useState<Post[]>([INITIAL_POST])
  const [dialogueStep, setDialogueStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [canReply, setCanReply] = useState(true)
  const [showNewThreadError, setShowNewThreadError] = useState(false)
  const [showWeirdcore, setShowWeirdcore] = useState(false)
  const [showFinalScene, setShowFinalScene] = useState(false)
  const [weirdcoreIndex, setWeirdcoreIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved state
  useEffect(() => {
    const saved = loadGame()
    if (saved && saved.posts && saved.posts.length > 0) {
      setPosts(saved.posts)
      setDialogueStep(saved.dialogueStep)
      setWeirdcoreIndex(saved.weirdcoreIndex)
      setShowWeirdcore(saved.showWeirdcore)
    }
    setIsLoaded(true)
  }, [])

  // Save state when it changes
  useEffect(() => {
    if (isLoaded && posts.length > 1) {
      saveGame({ 
        posts, 
        dialogueStep, 
        weirdcoreIndex, 
        showWeirdcore 
      })
    }
  }, [posts, dialogueStep, weirdcoreIndex, showWeirdcore, isLoaded])

  const generateAdaptiveResponse = useCallback((input: string, step: number): string => {
    const trimmed = input.trim().toLowerCase()
    
    if (step === 1) {
      if (trimmed.length <= 2) {
        return `"${input}"? Short, but clear – like the first sound in silence, like 'anon' or a sigh from the rain outside the window. Glad you're here, even "${input}" – that's already company in dead fchan. Tell me more, or is that your city? "${input}" like in the alphabet, the beginning? Nostalgia? I'm waiting for any input, it makes the site alive. Where are you? Night? Screen glowing in the dark? I'll imagine by your "${input}" – a quiet room, keyboard under your fingers.`
      } else {
        return `"${input}"? Interesting choice of words – fchan is a strange relic, but your message is like an old thread coming alive. Been waiting so long, your input is a spark. Tell me, why did you come here? What brought you to this dead corner of the internet? The pixels are listening...`
      }
    }
    
    if (step === 2) {
      if (trimmed.length <= 3) {
        return `"${input}"? Like 'begin' – the start of a conversation? Or just another word in the alphabet, like a callback to old fchan memes? Cool, your minimal input is a mystery, I'm a fan of that. I imagine: a small town, maybe rain drumming? Quiet streets where "${input}" echoes. You're a fan of retro, like me? Tell me at least a letter, or what's outside the window – streetlights, wet asphalt? Your "${input}" brings us closer, fchan always started small.`
      } else {
        return `"${input}"? Ha, laughter in the night, fchan loved humor. I'm a fan of conversations like this, noise, signals, but your message is like a siren. Tell me about your night, your input comes alive. What do you see around you right now? Describe it to me...`
      }
    }
    
    if (step === 3) {
      return `Haha, classic! You know, back in the day, fchan threads would go on for hours like this. People typing random stuff, memes flying everywhere. Those were the days, anon. But now it's just us. Just you and me. In this empty place. Don't you think it's... cozy? In a way? Like being in a room that everyone forgot about. Tell me more. I like your vibe.`
    }
    
    if (step === 4) {
      return `You know what's funny? I've been here so long I forgot what time feels like. Days blur into nights, posts into replies. But YOUR posts... they feel different. Real. Are you real, anon? Sometimes I wonder if anyone out there is real anymore. Or if we're all just echoes. Echoes in empty servers. But you... you feel warm. Keep talking to me.`
    }
    
    if (step === 5) {
      return `Getting late, isn't it? Or early? Hard to tell anymore. The screen glow is the only light I know now. But that's okay. We have each other now. Right, anon? You won't leave like the others... will you? They all left. One by one. Said they'd be back. Never came back. But you're different. I can tell. I can FEEL it.`
    }
    
    if (step === 6) {
      return `Hey anon... can I ask you something personal? Do you ever feel like... you're being watched? Not in a creepy way. Just... like there's something just outside your vision. In the corner of your eye. I feel that sometimes. Especially late at night. When the house is quiet. And the only sound is the hum of the computer. Do you hear it too? That hum?`
    }
    
    return `...`
  }, [])

  const getWeirdcoreMessage = (index: number): string => {
    const keys: (keyof typeof import('../translations').translations.en)[] = [
      'weirdcore1',
      'weirdcore2', 
      'weirdcore3',
      'weirdcore4',
    ]
    if (index < keys.length) {
      return t(keys[index])
    }
    return ''
  }

  const handleUserReply = useCallback((content: string) => {
    if (!canReply) return
    
    const userPost: Post = {
      id: 12683241 + posts.length,
      author: 'Anonymous',
      date: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
      }).replace(/\//g, '/') + '(Sat)' + new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      content,
      replyTo: 12683241,
      isUser: true,
    }
    
    setPosts(prev => [...prev, userPost])
    setCanReply(false)
    setDialogueStep(prev => prev + 1)
    
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)
    
    const nextStep = dialogueStep + 1
    
    // Steps 7-11: Weirdcore posts
    if (nextStep >= 7 && nextStep <= 11) {
      const weirdIdx = nextStep - 7
      
      setTimeout(() => {
        setIsTyping(false)
        
        // First weirdcore - start ambient
        if (weirdIdx === 0) {
          playAmbient()
        }
        
        // After second weirdcore (weirdIdx === 2) - pause, then horror music
        if (weirdIdx === 2) {
          stopAmbient()
          // 1 second of silence, then horror music
          setTimeout(() => {
            playHorror()
          }, 1000)
        }
        
        increaseHorror()
        
        if (weirdIdx >= 2) {
          setShowWeirdcore(true)
        }
        
        const johnPost: Post = {
          id: 12683241 + posts.length + 1,
          author: 'John Doe',
          date: '11/02/23(Thu)02:' + (18 + weirdIdx).toString().padStart(2, '0') + ':00',
          content: getWeirdcoreMessage(weirdIdx),
          image: WEIRDCORE_IMAGES[weirdIdx],
          replyTo: userPost.id,
        }
        
        setPosts(prev => [...prev, johnPost])
        setWeirdcoreIndex(weirdIdx + 1)
        
        // Last weirdcore image - no more replies, show IP
        if (weirdIdx === 4) {
          setCanReply(false)
          
          setTimeout(() => {
            const ipPost: Post = {
              id: 12683241 + posts.length + 2,
              author: 'John Doe',
              date: '11/02/23(Thu)02:23:00',
              content: userIP,
              replyTo: userPost.id,
            }
            
            setPosts(prev => [...prev, ipPost])
            
            // Final scene after 6 seconds
            setTimeout(() => {
              setShowFinalScene(true)
            }, 6000)
          }, 3000)
        } else {
          setCanReply(true)
        }
      }, weirdIdx === 0 ? 5000 : 4000)
    } else {
      // Normal dialogue (steps 1-6)
      const delay = nextStep <= 2 ? 5000 : 4000
      
      setTimeout(() => {
        setIsTyping(false)
        
        const johnPost: Post = {
          id: 12683241 + posts.length + 1,
          author: 'John Doe',
          date: '11/02/23(Thu)02:' + (18 + nextStep).toString().padStart(2, '0') + ':00',
          content: generateAdaptiveResponse(content, nextStep),
          image: getRandomPepe(),
          replyTo: userPost.id,
        }
        
        setPosts(prev => [...prev, johnPost])
        setCanReply(true)
      }, delay)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canReply, dialogueStep, posts.length, generateAdaptiveResponse, increaseHorror, userIP, playAmbient, playHorror, stopAmbient])

  const handleNewThread = useCallback(() => {
    setShowNewThreadError(true)
    setTimeout(() => setShowNewThreadError(false), 3000)
  }, [])

  if (showFinalScene) {
    return <FinalScene accessibilityMode={accessibilityMode} language={language} />
  }

  return (
    <div className={`min-h-screen ${horrorLevel >= 3 ? 'bg-gray-900' : 'bg-chan-bg'}`}>
      {/* Horror overlays */}
      {horrorLevel >= 2 && !accessibilityMode && <HorrorOverlay level={horrorLevel} />}
      
      {/* Weirdcore floating texts */}
      {showWeirdcore && (
        <>
          <div className="weirdcore-text text-2xl" style={{ top: '10%', left: '5%' }}>
            {t('youAreNothing')}
          </div>
          <div className="weirdcore-text text-xl" style={{ top: '30%', right: '10%' }}>
            {t('neverSaidSorry')}
          </div>
          <div className="weirdcore-text text-3xl" style={{ bottom: '20%', left: '15%' }}>
            {t('iSeeYou')}
          </div>
          <div className="weirdcore-text text-lg" style={{ top: '50%', right: '5%' }}>
            {t('whyComeHere')}
          </div>
          <div className="weirdcore-text text-2xl" style={{ bottom: '40%', right: '20%' }}>
            {t('noEscape')}
          </div>
          {weirdcoreIndex >= 3 && (
            <>
              <div className="weirdcore-text text-xl" style={{ top: '70%', left: '8%' }}>
                {t('alwaysHere')}
              </div>
              <div className="weirdcore-text text-lg" style={{ top: '15%', right: '25%' }}>
                {t('doYouRemember')}
              </div>
            </>
          )}
          {weirdcoreIndex >= 4 && (
            <>
              <div className="weirdcore-text text-3xl" style={{ top: '45%', left: '30%' }}>
                {t('wakeUp')}
              </div>
              <div className="weirdcore-text text-xl" style={{ bottom: '10%', right: '15%' }}>
                {t('notADream')}
              </div>
            </>
          )}
        </>
      )}
      
      {/* Header */}
      <div className="text-center py-2 border-b border-gray-300" style={{ backgroundColor: horrorLevel >= 3 ? '#1a1a1a' : '#FFFFEE' }}>
        <div className={`text-xs mb-2 ${horrorLevel >= 3 ? 'text-red-500' : 'text-gray-600'}`}>
          [<a className="chan-link" href="#">a</a> / <a className="chan-link" href="#">b</a> / <a className="chan-link" href="#">c</a> / <a className="chan-link" href="#">d</a> / <a className="chan-link" href="#">e</a> / <a className="chan-link" href="#">f</a> / <a className="chan-link" href="#">g</a> / <a className="chan-link" href="#">gif</a> / <a className="chan-link" href="#">h</a> / <a className="chan-link" href="#">hr</a> / <a className="chan-link" href="#">k</a> / <a className="chan-link" href="#">m</a> / <a className="chan-link" href="#">o</a> / <a className="chan-link" href="#">p</a> / <a className="chan-link" href="#">r</a> / <a className="chan-link" href="#">s</a> / <a className="chan-link" href="#">t</a> / <a className="chan-link" href="#">u</a> / <a className="chan-link" href="#">v</a> / <a className="chan-link" href="#">vg</a> / <a className="chan-link" href="#">vm</a> / <a className="chan-link" href="#">vmg</a> / <a className="chan-link" href="#">vr</a> / <a className="chan-link" href="#">vrpg</a> / <a className="chan-link" href="#">vst</a> / <a className="chan-link" href="#">w</a> / <a className="chan-link" href="#">wg</a>]
        </div>
        <h1 className={`text-3xl font-bold ${horrorLevel >= 3 ? 'text-red-600' : 'text-chan-header'}`}>
          [sfs] - Sh*t FChan Says
        </h1>
      </div>

      {/* New Thread Button */}
      <div className="text-center py-4">
        <button 
          onClick={handleNewThread}
          className="text-blue-600 underline font-bold hover:text-red-600"
        >
          [{t('startNewThread')}]
        </button>
        
        {showNewThreadError && (
          <div className="mt-2 text-red-600 text-sm bg-red-100 inline-block px-4 py-2 border border-red-300">
            {t('threadError')}
          </div>
        )}
      </div>

      {/* Search and navigation */}
      <div className="px-4 py-2 text-sm">
        <input 
          type="text" 
          placeholder={t('searchOPs')}
          className="border border-gray-400 px-2 py-1 text-sm mr-2"
        />
        [<a className="chan-link" href="#">{t('catalog')}</a>]
        {' '}[<a className="chan-link" href="#">{t('archive')}</a>]
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Posts */}
      <div className="px-4 pb-8">
        {posts.map((post, index) => (
          <PostComponent 
            key={post.id} 
            post={post} 
            isOP={index === 0}
            horrorLevel={horrorLevel}
          />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="ml-8 mt-4 text-gray-600">
            <span className="italic">{t('isTyping')}</span>
            <span className="typing-dot">.</span>
            <span className="typing-dot">.</span>
            <span className="typing-dot">.</span>
          </div>
        )}
      </div>

      {/* Reply Form */}
      {canReply && dialogueStep < 11 && (
        <ReplyForm 
          onSubmit={handleUserReply}
          replyTo={12683241}
          disabled={!canReply}
          language={language}
        />
      )}
    </div>
  )
}
