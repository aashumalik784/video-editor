import { Scissors } from 'lucide-react'

const Timeline = ({ duration, trimStart, trimEnd, setTrimStart, setTrimEnd }) => {
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Scissors size={20} className="text-green-500" />
        <h3 className="text-lg font-semibold">Trim Video</h3>
      </div>

      <div className="space-y-4">
        {/* Start Trim */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Start Time</label>
            <span className="text-sm text-blue-400">{formatTime(trimStart)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={trimStart}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              if (value <= trimEnd) setTrimStart(value)
            }}
            className="w-full accent-blue-600"
          />
        </div>

        {/* End Trim */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">End Time</label>
            <span className="text-sm text-blue-400">{formatTime(trimEnd)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={trimEnd}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              if (value >= trimStart) setTrimEnd(value)
            }}
            className="w-full accent-blue-600"
          />
        </div>

        {/* Duration Info */}
        <div className="bg-gray-900 p-3 rounded text-sm text-gray-300">
          <p>Total Duration: {formatTime(duration)}</p>
          <p>Trimmed Duration: {formatTime(trimEnd - trimStart)}</p>
        </div>
      </div>
    </div>
  )
}

export default Timeline