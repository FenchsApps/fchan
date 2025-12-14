interface SoundPermissionProps {
  onAccept: () => void
}

export default function SoundPermission({ onAccept }: SoundPermissionProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 p-8 max-w-md text-center">
        <div className="text-white text-lg mb-4">
          🔊 Audio Permission Required
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          This experience requires audio to be enabled for the full effect.
          Please allow audio playback to continue.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onAccept}
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 text-sm font-bold transition-colors"
          >
            Allow Audio
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-4">
          Headphones recommended for best experience
        </p>
      </div>
    </div>
  )
}

