import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Base64Image() {
  const { t } = useTranslation()
  const [base64, setBase64] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setBase64(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleBase64 = (val: string) => {
    setBase64(val)
    if (val.startsWith('data:image')) setPreview(val)
    else if (val.startsWith('/9j/') || val.startsWith('iVBOR')) setPreview('data:image/png;base64,' + val)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('base64img.title')}</h2>
      <p className="text-[#909399] mb-6">{t('base64img.desc')}</p>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('base64img.select')}</button>
      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">Base64</label>
        <textarea className="input-field h-32 font-mono text-xs resize-y" value={base64} onChange={(e) => handleBase64(e.target.value)} placeholder={t('base64img.placeholder')} />
      </div>
      {preview && (
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('base64img.preview')}</label>
          <img src={preview} className="max-w-full max-h-64 rounded-lg border border-[#e5e7eb]" alt="Preview" />
        </div>
      )}
    </div>
  )
}
