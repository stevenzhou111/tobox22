import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function QRCode() {
  const { t } = useTranslation()
  const [text, setText] = useState('https://')
  const [size, setSize] = useState(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQR = async () => {
    if (!text.trim()) return

    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = size
        canvas.height = size
        ctx?.drawImage(img, 0, 0, size, size)
        URL.revokeObjectURL(url)
      }
      img.src = url
    } catch {
      console.error('Failed to generate QR code')
    }
  }

  const downloadQR = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  useEffect(() => {
    generateQR()
  }, [size])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('qrcode.title')}</h2>
      <p className="text-gray-500 mb-6">{t('qrcode.desc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('qrcode.content')}</label>
          <textarea
            className="w-full h-32 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-4">
            <label className="block text-sm text-gray-500 mb-1">{t('qrcode.size')}: {size}px</label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button onClick={generateQR} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            {t('qrcode.generate')}
          </button>
        </div>

        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
          <button onClick={downloadQR} className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            {t('qrcode.download')}
          </button>
        </div>
      </div>
    </div>
  )
}
