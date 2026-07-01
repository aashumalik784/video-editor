import { useState } from 'react'
import { Upload } from 'lucide-react'

const VideoUpload = ({ onVideoSelect }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith('video/')) {
        onVideoSelect(file)
      } else {
        alert('Please drop a video file')
      }
    }
  }

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith('video/')) {
        onVideoSelect(file)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div
        className={`w-full max-w-md p-8 border-4 border-dashed rounded-lg transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-500 bg-opacity-10'
            : 'border-gray-600 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label htmlFor="video-input" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload size={48} className="text-blue-500" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Upload Video</h2>
              <p className="text-gray-400">Drag and drop your video here or click to select</p>
              <p className="text-gray-500 text-sm mt-2">MP4, WebM, MOV, AVI supported</p>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Select Video
            </button>
          </div>
        </label>
        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default VideoUpload