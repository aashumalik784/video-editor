import { Download, FileVideo } from 'lucide-react'
import { useState } from 'react'

const Export = ({ videoRef, trimStart, trimEnd, brightness, contrast, saturation }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const video = videoRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Simulate export progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setExportProgress(i)
      }

      // Create a simple blob from the current frame (for demo)
      ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`
      ctx.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `edited-video-${Date.now()}.webp`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        setIsExporting(false)
        setExportProgress(0)
        alert('Export complete! (Full MP4 export coming soon)')
      })
    } catch (error) {
      console.error('Export error:', error)
      setIsExporting(false)
      alert('Export failed. Please try again.')
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <FileVideo size={20} className="text-purple-500" />
        <h3 className="text-lg font-semibold">Export Video</h3>
      </div>

      <div className="space-y-4">
        {/* Export Format */}
        <div>
          <label className="text-sm font-medium mb-2 block">Format</label>
          <select className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white">
            <option>MP4 (Coming Soon)</option>
            <option>WebM (Coming Soon)</option>
            <option>MOV (Coming Soon)</option>
          </select>
        </div>

        {/* Quality */}
        <div>
          <label className="text-sm font-medium mb-2 block">Quality</label>
          <select className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white">
            <option>1080p (Full HD)</option>
            <option>720p (HD)</option>
            <option>480p (SD)</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition ${
            isExporting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          <Download size={20} />
          <span>{isExporting ? 'Exporting...' : 'Export Video'}</span>
        </button>

        {/* Progress Bar */}
        {isExporting && (
          <div className="space-y-2">
            <div className="w-full bg-gray-900 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 text-center">{exportProgress}%</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-900 p-3 rounded text-sm text-gray-300 space-y-1">
          <p>✨ Full MP4 export with video processing coming soon!</p>
          <p>📁 Currently exports preview frame</p>
        </div>
      </div>
    </div>
  )
}

export default Export