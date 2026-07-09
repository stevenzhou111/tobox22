import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageFilter() {
  const { t } = useTranslation()
  const [original, setOriginal] = useState<string | null>(null)
  const [filtered, setFiltered] = useState<string | null>(null)
  const [filter, setFilter] = useState('grayscale')
  const [intensity, setIntensity] = useState(100)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const filters = [
    { key: 'grayscale', label: t('imgfilter.grayscale') },
    { key: 'sepia', label: t('imgfilter.sepia') },
    { key: 'blur', label: t('imgfilter.blur') },
    { key: 'brightness', label: t('imgfilter.brightness') },
    { key: 'contrast', label: t('imgfilter.contrast') },
    { key: 'saturate', label: t('imgfilter.saturate') },
    { key: 'invert', label: t('imgfilter.invert') },
    { key: 'hue-rotate', label: t('imgfilter.hueRotate') },
  ]

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setOriginal(ev.target?.result as string)
      setFiltered(null)
    }
    reader.readAsDataURL(file)
  }

  const applyFilter = () => {
    if (!original) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      let filterStr = ''
      const val = intensity / 100

      switch (filter) {
        case 'grayscale': filterStr = `grayscale(${val})`; break
        case 'sepia': filterStr = `sepia(${val})`; break
        case 'blur': filterStr = `blur(${Math.round(val * 10)}px)`; break
        case 'brightness': filterStr = `brightness(${0.5 + val})`; break
        case 'contrast': filterStr = `contrast(${val * 2})`; break
        case 'saturate': filterStr = `saturate(${val * 2})`; break
        case 'invert': filterStr = `invert(${val})`; break
        case 'hue-rotate': filterStr = `hue-rotate(${val * 360}deg)`; break
      }

      ctx.filter = filterStr
      ctx.drawImage(img, 0, 0)
      setFiltered(canvas.toDataURL('image/png'))
    }
    img.src = original
  }

  const download = () => {
    if (!filtered) return
    const link = document.createElement('a')
    link.download = 'filtered.png'
    link.href = filtered
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('imgfilter.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('imgfilter.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('imgfilter.select')}</button>

      {original && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`tab-btn ${filter === f.key ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm text-[var(--text-secondary)]">{t('imgfilter.intensity')}: {intensity}%</label>
            <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="flex-1" />
          </div>
          <div className="flex gap-3">
            <button onClick={applyFilter} className="btn-primary">{t('imgfilter.apply')}</button>
            {filtered && <button onClick={download} className="btn-secondary">{t('imgfilter.download')}</button>}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {original && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgfilter.original')}</div>
            <img src={original} className="w-full rounded-lg border border-[var(--border)]" alt="Original" />
          </div>
          {filtered && (
            <div>
              <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgfilter.filtered')}</div>
              <img src={filtered} className="w-full rounded-lg border border-[var(--border)]" alt="Filtered" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
