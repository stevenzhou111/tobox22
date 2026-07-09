import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ColorPicker() {
  const { t } = useTranslation()
  const [image, setImage] = useState<string | null>(null)
  const [pickedColor, setPickedColor] = useState<string>('')
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImage(ev.target?.result as string)
      setPickedColor('')
      setRgb(null)
    }
    reader.readAsDataURL(file)
  }

  const handleImageLoad = () => {
    const canvas = canvasRef.current
    const img = document.getElementById('picker-image') as HTMLImageElement
    if (!canvas || !img) return

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0)
  }

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const r = pixel[0]
    const g = pixel[1]
    const b = pixel[2]

    setRgb({ r, g, b })
    setPickedColor(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('colorpicker.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('colorpicker.desc')}</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">
        {t('colorpicker.selectImage')}
      </button>

      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div className="relative inline-block">
            <img
              id="picker-image"
              src={image}
              className="max-w-full rounded-lg border border-[var(--border)] cursor-crosshair"
              onLoad={handleImageLoad}
              alt="Source"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              onClick={pickColor}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-[var(--bg)] rounded-lg p-4">
              <div className="text-sm text-[var(--text-secondary)] mb-2">{t('colorpicker.picked')}</div>
              {pickedColor ? (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg border border-[var(--border)]" style={{ background: pickedColor }} />
                  <div className="space-y-1">
                    <div className="font-mono text-sm">{pickedColor.toUpperCase()}</div>
                    {rgb && <div className="font-mono text-xs text-[var(--text-secondary)]">RGB({rgb.r}, {rgb.g}, {rgb.b})</div>}
                    {rgb && <div className="font-mono text-xs text-[var(--text-secondary)]">HSL({Math.round(rgb.r / 2.55)}, {Math.round(rgb.g / 2.55)}, {Math.round(rgb.b / 2.55)})</div>}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-[var(--text-secondary)]">{t('colorpicker.hint')}</div>
              )}
            </div>

            {pickedColor && (
              <button
                onClick={() => navigator.clipboard.writeText(pickedColor.toUpperCase())}
                className="btn-primary w-full"
              >
                {t('colorpicker.copy')}
              </button>
            )}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
