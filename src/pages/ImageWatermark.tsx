import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageWatermark() {
  const { t } = useTranslation()
  const [image, setImage] = useState<string | null>(null)
  const [watermark, setWatermark] = useState('')
  const [position, setPosition] = useState<'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right'>('center')
  const [fontSize, setFontSize] = useState(24)
  const [opacity, setOpacity] = useState(50)
  const [result, setResult] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const addWatermark = () => {
    if (!image || !watermark) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      ctx.font = `${fontSize}px Arial`
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity / 100})`
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity / 100})`
      ctx.lineWidth = 1

      const metrics = ctx.measureText(watermark)
      const textWidth = metrics.width
      const textHeight = fontSize

      let x = 0, y = 0
      switch (position) {
        case 'top-left': x = 20; y = textHeight + 20; break
        case 'top-right': x = img.width - textWidth - 20; y = textHeight + 20; break
        case 'center': x = (img.width - textWidth) / 2; y = (img.height + textHeight) / 2; break
        case 'bottom-left': x = 20; y = img.height - 20; break
        case 'bottom-right': x = img.width - textWidth - 20; y = img.height - 20; break
      }

      ctx.strokeText(watermark, x, y)
      ctx.fillText(watermark, x, y)

      setResult(canvas.toDataURL('image/png'))
    }
    img.src = image
  }

  const download = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = 'watermarked.png'
    a.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('imgwatermark.title')}</h2>
      <p className="text-[#909399] mb-6">{t('imgwatermark.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('imgwatermark.select')}</button>

      {image && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input className="input-field" placeholder={t('imgwatermark.textPlaceholder')} value={watermark} onChange={(e) => setWatermark(e.target.value)} />
            <select className="input-field" value={position} onChange={(e) => setPosition(e.target.value as any)}>
              <option value="top-left">{t('imgwatermark.topLeft')}</option>
              <option value="top-right">{t('imgwatermark.topRight')}</option>
              <option value="center">{t('imgwatermark.center')}</option>
              <option value="bottom-left">{t('imgwatermark.bottomLeft')}</option>
              <option value="bottom-right">{t('imgwatermark.bottomRight')}</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#909399]">{t('imgwatermark.fontSize')}: {fontSize}px</label>
              <input type="range" min="12" max="72" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-32" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#909399]">{t('imgwatermark.opacity')}: {opacity}%</label>
              <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-32" />
            </div>
          </div>
          <button onClick={addWatermark} className="btn-primary">{t('imgwatermark.add')}</button>
          {result && <button onClick={download} className="btn-secondary">{t('imgwatermark.download')}</button>}
        </div>
      )}

      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="text-sm text-[#909399] mb-2">{t('imgwatermark.original')}</div>
            <img src={image} className="w-full rounded-lg border border-[#e5e7eb]" alt="Original" />
          </div>
          {result && (
            <div>
              <div className="text-sm text-[#909399] mb-2">{t('imgwatermark.withWatermark')}</div>
              <img src={result} className="w-full rounded-lg border border-[#e5e7eb]" alt="Watermarked" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
