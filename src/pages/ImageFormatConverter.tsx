import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageFormatConverter() {
  const { t } = useTranslation()
  const [original, setOriginal] = useState<string | null>(null)
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState(92)
  const [result, setResult] = useState<string | null>(null)
  const [size, setSize] = useState({ original: 0, converted: 0 })
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSize({ original: file.size, converted: 0 })
    const reader = new FileReader()
    reader.onload = (ev) => setOriginal(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const convert = () => {
    if (!original) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const mimeType = `image/${format}`
      canvas.toBlob((blob) => {
        if (blob) {
          setSize((prev) => ({ ...prev, converted: blob.size }))
          const url = URL.createObjectURL(blob)
          setResult(url)
        }
      }, mimeType, quality / 100)
    }
    img.src = original
  }

  const download = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = `image.${format}`
    a.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('imgformat.title')}</h2>
      <p className="text-[#909399] mb-6">{t('imgformat.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('imgformat.select')}</button>

      {original && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <select className="input-field w-32" value={format} onChange={(e) => setFormat(e.target.value as any)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
            {format !== 'png' && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-[#909399]">{t('imgformat.quality')}: {quality}%</label>
                <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-32" />
              </div>
            )}
            <button onClick={convert} className="btn-primary">{t('imgformat.convert')}</button>
            {result && <button onClick={download} className="btn-secondary">{t('imgformat.download')}</button>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-[#909399] mb-2">{t('imgformat.original')} ({(size.original / 1024).toFixed(1)} KB)</div>
              <img src={original} className="w-full rounded-lg border border-[#e5e7eb]" alt="Original" />
            </div>
            {result && (
              <div>
                <div className="text-sm text-[#909399] mb-2">{t('imgformat.converted')} ({(size.converted / 1024).toFixed(1)} KB)</div>
                <img src={result} className="w-full rounded-lg border border-[#e5e7eb]" alt="Converted" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
