import { Sparkles } from 'lucide-react'

const Effects = ({ brightness, setBrightness, contrast, setContrast, saturation, setSaturation }) => {
  const effects = [
    {
      name: 'Brightness',
      value: brightness,
      setValue: setBrightness,
      min: 0.5,
      max: 1.5,
      step: 0.1,
    },
    {
      name: 'Contrast',
      value: contrast,
      setValue: setContrast,
      min: 0.5,
      max: 1.5,
      step: 0.1,
    },
    {
      name: 'Saturation',
      value: saturation,
      setValue: setSaturation,
      min: 0,
      max: 2,
      step: 0.1,
    },
  ]

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles size={20} className="text-yellow-500" />
        <h3 className="text-lg font-semibold">Effects</h3>
      </div>
      <div className="space-y-4">
        {effects.map((effect) => (
          <div key={effect.name}>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">{effect.name}</label>
              <span className="text-sm text-blue-400">{effect.value.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={effect.min}
              max={effect.max}
              step={effect.step}
              value={effect.value}
              onChange={(e) => effect.setValue(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Effects