import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageCompress() {
  const { t } = useTranslation()
  const [original, setOriginal] = useState<string | null>(null)
  const [compressed, setCompressed] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [quality, setQuality] = useState(80)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setOriginal(ev.target?.result as string)
      setOriginalSize(file.size)
      setCompressed(null)
      setCompressedSize(0)
    }
    reader.readAsDataURL(file)
  }

  const compress = () => {
    if (!original) return
    setLoading(true)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.onload = (ev) => {
              setCompressed(ev.target?.result as string)
              setCompressedSize(blob.size)
              setLoading(false)
            }
            reader.readAsDataURL(blob)
          }
        },
        'image/jpeg',
        quality / 100
      )
    }
    img.src = original
  }

  const download = () => {
    if (!compressed) return
    const link = document.createElement('a')
    link.download = 'compressed.jpg'
    link.href = compressed
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const ratio = originalSize > 0 && compressedSize > 0
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : '0'

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('imgcompress.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('imgcompress.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      <div className="flex gap-4 mb-6">
        <button onClick={() => fileRef.current?.click()} className="btn-primary">
          {t('imgcompress.select')}
        </button>
        {original && (
          <button onClick={compress} disabled={loading} className="btn-primary">
            {loading ? t('imgcompress.processing') : t('imgcompress.compress')}
          </button>
        )}
        {compressed && (
          <button onClick={download} className="btn-secondary">
            {t('imgcompress.download')}
          </button>
        )}
      </div>

      {original && (
        <div className="mb-6">
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            {t('imgcompress.quality')}: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {original && compressed && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--bg)] rounded-lg p-4 text-center">
            <div className="text-sm text-[var(--text-secondary)] mb-1">{t('imgcompress.original')}</div>
            <div className="text-lg font-bold text-[var(--text)]">{formatSize(originalSize)}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-4 text-center">
            <div className="text-sm text-[var(--text-secondary)] mb-1">{t('imgcompress.compressed')}</div>
            <div className="text-lg font-bold text-emerald-600">{formatSize(compressedSize)}</div>
            <div className="text-xs text-emerald-500">-{ratio}%</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {original && (
          <div>
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgcompress.original')}</div>
            <img src={original} className="w-full rounded-lg border border-[var(--border)]" alt="Original" />
          </div>
        )}
        {compressed && (
          <div>
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('imgcompress.compressed')}</div>
            <img src={compressed} className="w-full rounded-lg border border-[var(--border)]" alt="Compressed" />
          </div>
        )}
      </div>
    </div>
  )
}
