import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PlaceholderImage() {
  const { t } = useTranslation()
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [bgColor, setBgColor] = useState('#e5e7eb')
  const [textColor, setTextColor] = useState('#9ca3af')
  const [text, setText] = useState('')

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = textColor
    ctx.font = `${Math.min(width, height) / 8}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const displayText = text || `${width}×${height}`
    ctx.fillText(displayText, width / 2, height / 2)
  }

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'placeholder.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('placeholder.title')}</h2>
      <p className="text-[#909399] mb-6">{t('placeholder.desc')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('placeholder.width')}</label>
          <input type="number" className="input-field" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('placeholder.height')}</label>
          <input type="number" className="input-field" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('placeholder.bgColor')}</label>
          <input type="color" className="w-full h-10 rounded cursor-pointer" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('placeholder.textColor')}</label>
          <input type="color" className="w-full h-10 rounded cursor-pointer" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        </div>
      </div>

      <input className="input-field mb-4" placeholder={t('placeholder.textPlaceholder')} value={text} onChange={(e) => setText(e.target.value)} />

      <div className="flex gap-3 mb-6">
        <button onClick={generate} className="btn-primary">{t('placeholder.generate')}</button>
        <button onClick={download} className="btn-secondary">{t('placeholder.download')}</button>
      </div>

      <div className="bg-[#f5f7fa] rounded-lg p-4 inline-block">
        <canvas ref={canvasRef} className="border border-[#e5e7eb] rounded" />
      </div>
    </div>
  )
}

import { useRef } from 'react'
