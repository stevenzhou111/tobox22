import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageBase64() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<'toBase64' | 'toImage'>('toBase64')
  const [base64, setBase64] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setBase64(result)
      setImagePreview(result)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const convertToImage = () => {
    setError('')
    try {
      if (!base64.trim()) {
        setError(t('imgbase64.errorEmpty'))
        return
      }
      const img = new Image()
      img.onload = () => {
        setImagePreview(base64)
      }
      img.onerror = () => {
        setError(t('imgbase64.errorInvalid'))
        setImagePreview(null)
      }
      img.src = base64
    } catch {
      setError(t('imgbase64.errorInvalid'))
    }
  }

  const downloadImage = () => {
    if (!imagePreview) return
    const link = document.createElement('a')
    link.download = 'image.png'
    link.href = imagePreview
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('imgbase64.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('imgbase64.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode('toBase64')}
          className={`tab-btn ${mode === 'toBase64' ? 'active' : ''}`}
        >
          {t('imgbase64.toBase64')}
        </button>
        <button
          onClick={() => setMode('toImage')}
          className={`tab-btn ${mode === 'toImage' ? 'active' : ''}`}
        >
          {t('imgbase64.toImage')}
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {mode === 'toBase64' ? (
        <div>
          <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">
            {t('imgbase64.selectImage')}
          </button>
          {base64 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--text-secondary)]">Base64</span>
                <button onClick={() => navigator.clipboard.writeText(base64)} className="text-sm text-blue-500 hover:text-blue-600">
                  {t('copy')}
                </button>
              </div>
              <textarea
                className="input-field font-mono text-xs h-48 resize-y"
                value={base64}
                readOnly
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <textarea
            className="input-field font-mono text-xs h-32 resize-y mb-4"
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            placeholder={t('imgbase64.pasteBase64')}
          />
          <button onClick={convertToImage} className="btn-primary">
            {t('imgbase64.convert')}
          </button>
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
      )}

      {imagePreview && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-secondary)]">{t('imgbase64.preview')}</span>
            <button onClick={downloadImage} className="text-sm text-blue-500 hover:text-blue-600">
              {t('imgbase64.download')}
            </button>
          </div>
          <img src={imagePreview} className="max-w-full max-h-96 rounded-lg border border-[var(--border)]" alt="Preview" />
        </div>
      )}
    </div>
  )
}
