import { useState } from 'react'
import VideoUpload from './components/VideoUpload'
import Editor from './components/Editor'
import './App.css'

function App() {
  const [videoFile, setVideoFile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleVideoSelect = (file) => {
    setVideoFile(file)
    setIsEditing(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isEditing ? (
        <VideoUpload onVideoSelect={handleVideoSelect} />
      ) : (
        <Editor videoFile={videoFile} onBack={() => setIsEditing(false)} />
      )}
    </div>
  )
}

export default App