import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageResize() {
  const { t } = useTranslation()
  const [original, setOriginal] = useState<string | null>(null)
  const [resized, setResized] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [lockRatio, setLockRatio] = useState(true)
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 })
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        setOriginalDims({ w: img.width, h: img.height })
        setWidth(img.width)
        setHeight(img.height)
        setOriginal(ev.target?.result as string)
        setResized(null)
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (w: number) => {
    setWidth(w)
    if (lockRatio && originalDims.w > 0) {
      setHeight(Math.round((w / originalDims.w) * originalDims.h))
    }
  }

  const handleHeightChange = (h: number) => {
    setHeight(h)
    if (lockRatio && originalDims.h > 0) {
      setWidth(Math.round((h / originalDims.h) * originalDims.w))
    }
  }

  const resize = () => {
    if (!original) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)
      setResized(canvas.toDataURL('image/png'))
    }
    img.src = original
  }

  const download = () => {
    if (!resized) return
    const link = document.createElement('a')
    link.download = 'resized.png'
    link.href = resized
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('imgreresize.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('imgreresize.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('imgreresize.select')}</button>

      {original && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('imgreresize.width')}</label>
              <input type="number" className="input-field w-28" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} />
            </div>
            <label className="flex items-center gap-2 mt-6">
              <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} className="rounded" />
              <span className="text-sm text-[var(--text-secondary)]">{t('imgreresize.lockRatio')}</span>
            </label>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('imgreresize.height')}</label>
              <input type="number" className="input-field w-28" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} />
            </div>
            <button onClick={resize} className="btn-primary mt-6">{t('imgreresize.resize')}</button>
            {resized && <button onClick={download} className="btn-secondary mt-6">{t('imgreresize.download')}</button>}
          </div>
        </div>
      )}

      {original && resized && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgreresize.original')} ({originalDims.w} x {originalDims.h})</div>
            <img src={original} className="w-full rounded-lg border border-[var(--border)]" alt="Original" />
          </div>
          <div>
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgreresize.resized')} ({width} x {height})</div>
            <img src={resized} className="w-full rounded-lg border border-[var(--border)]" alt="Resized" />
          </div>
        </div>
      )}
    </div>
  )
}
