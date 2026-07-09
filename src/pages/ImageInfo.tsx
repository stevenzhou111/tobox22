import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageInfo() {
  const { t } = useTranslation()
  const [info, setInfo] = useState<{ name: string; size: string; type: string; width: number; height: number; lastModified: string } | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        setInfo({
          name: file.name,
          size: file.size < 1024 * 1024 ? (file.size / 1024).toFixed(1) + ' KB' : (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          type: file.type,
          width: img.width,
          height: img.height,
          lastModified: new Date(file.lastModified).toLocaleString(),
        })
        setPreview(ev.target?.result as string)
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('imginfo.title')}</h2>
      <p className="text-[#909399] mb-6">{t('imginfo.desc')}</p>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('imginfo.select')}</button>

      {info && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {preview && <img src={preview} className="max-w-full rounded-lg border border-[#e5e7eb]" alt="Preview" />}
          <div className="space-y-3">
            {[
              { label: t('imginfo.name'), value: info.name },
              { label: t('imginfo.size'), value: info.size },
              { label: t('imginfo.type'), value: info.type },
              { label: t('imginfo.dimensions'), value: `${info.width} × ${info.height}` },
              { label: t('imginfo.modified'), value: info.lastModified },
            ].map((item) => (
              <div key={item.label} className="flex justify-between bg-[#f5f7fa] rounded-lg p-3">
                <span className="text-[#909399] text-sm">{item.label}</span>
                <span className="text-[#303133] text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
