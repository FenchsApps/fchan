interface ImageViewerProps {
  src: string
  onClose: () => void
}

export default function ImageViewer({ src, onClose }: ImageViewerProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img 
          src={src}
          alt="Full size"
          className="max-w-full max-h-[90vh] object-contain border-2 border-gray-600"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/70 text-white w-8 h-8 flex items-center justify-center hover:bg-red-800 text-xl font-bold"
        >
          ×
        </button>
        <div className="absolute bottom-2 left-2 bg-black/70 text-gray-400 text-xs px-2 py-1">
          Click anywhere to close
        </div>
      </div>
    </div>
  )
}

