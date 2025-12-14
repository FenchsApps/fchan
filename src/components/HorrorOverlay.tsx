import { useEffect, useState } from 'react'
import { HorrorLevel } from '../types'

interface HorrorOverlayProps {
  level: HorrorLevel
}

interface Eye {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function HorrorOverlay({ level }: HorrorOverlayProps) {
  const [eyes, setEyes] = useState<Eye[]>([])

  useEffect(() => {
    if (level >= 3) {
      // Add floating eyes
      const newEyes: Eye[] = []
      const count = level >= 5 ? 20 : level >= 4 ? 10 : 5
      
      for (let i = 0; i < count; i++) {
        newEyes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 30 + Math.random() * 50,
          delay: Math.random() * 2,
        })
      }
      
      setEyes(newEyes)
    }
  }, [level])

  return (
    <>
      {/* Red vignette */}
      {level >= 2 && (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: level >= 4 
              ? 'radial-gradient(ellipse at center, transparent 0%, rgba(100,0,0,0.5) 100%)'
              : 'radial-gradient(ellipse at center, transparent 0%, rgba(50,0,0,0.3) 100%)',
          }}
        />
      )}

      {/* Scanlines */}
      {level >= 3 && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          }}
        />
      )}

      {/* Floating eyes */}
      {eyes.map(eye => (
        <div
          key={eye.id}
          className="fixed pointer-events-none z-30 eye-float"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            width: eye.size,
            height: eye.size,
            animationDelay: `${eye.delay}s`,
            opacity: level >= 5 ? 0.8 : 0.4,
          }}
        >
          <img 
            src="/eye.png" 
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: level >= 5 ? 'hue-rotate(340deg) saturate(2)' : 'none',
            }}
          />
        </div>
      ))}

      {/* Static noise overlay */}
      {level >= 4 && (
        <div 
          className="fixed inset-0 pointer-events-none z-45 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Flashing overlay for level 5 */}
      {level >= 5 && (
        <div 
          className="fixed inset-0 pointer-events-none z-55 flash-red"
        />
      )}
    </>
  )
}

