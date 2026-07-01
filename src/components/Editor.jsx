import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Download, ArrowLeft } from 'lucide-react'
import Effects from './Effects'
import Timeline from './Timeline'

const Editor = ({ videoFile, onBack }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [brightness, setBrightness] = useState(1)
  const [contrast, setContrast] = useState(1)
  const [saturation, setSaturation] = useState(1)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => {
      setDuration(video.duration)
      setTrimEnd(video.duration)
    }
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleExport = () => {
    alert('Export feature coming soon! Full video processing with trimming support.')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold">Video Editor</h1>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Main Editor */}
      <div className="grid grid-cols-3 gap-6">
        {/* Preview */}
        <div className="col-span-2">
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              src={URL.createObjectURL(videoFile)}
              className="w-full h-96 object-contain"
              style={{
                filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`,
              }}
            />
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <div className="flex-1 space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value)
                    videoRef.current.currentTime = time
                    setCurrentTime(time)
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Playback Speed</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold w-12">{playbackSpeed.toFixed(1)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          <Effects
            brightness={brightness}
            setBrightness={setBrightness}
            contrast={contrast}
            setContrast={setContrast}
            saturation={saturation}
            setSaturation={setSaturation}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <Timeline
          duration={duration}
          trimStart={trimStart}
          trimEnd={trimEnd}
          setTrimStart={setTrimStart}
          setTrimEnd={setTrimEnd}
        />
      </div>
    </div>
  )
}

export default Editor