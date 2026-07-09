import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ColorContrast() {
  const { t } = useTranslation()
  const [fg, setFg] = useState('#000000')
  const [bg, setBg] = useState('#ffffff')

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const contrastRatio = () => {
    const fgRgb = hexToRgb(fg)
    const bgRgb = hexToRgb(bg)
    const l1 = luminance(fgRgb.r, fgRgb.g, fgRgb.b)
    const l2 = luminance(bgRgb.r, bgRgb.g, bgRgb.b)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return ((lighter + 0.05) / (darker + 0.05))
  }

  const ratio = contrastRatio()
  const aaaLarge = ratio >= 4.5
  const aaaNormal = ratio >= 7

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('contrast.title')}</h2>
      <p className="text-[#909399] mb-6">{t('contrast.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm text-[#909399] mb-1">{t('contrast.foreground')}</label>
              <input type="color" className="w-16 h-10 rounded cursor-pointer" value={fg} onChange={(e) => setFg(e.target.value)} />
              <input className="input-field font-mono text-sm mt-1" value={fg} onChange={(e) => setFg(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-[#909399] mb-1">{t('contrast.background')}</label>
              <input type="color" className="w-16 h-10 rounded cursor-pointer" value={bg} onChange={(e) => setBg(e.target.value)} />
              <input className="input-field font-mono text-sm mt-1" value={bg} onChange={(e) => setBg(e.target.value)} />
            </div>
          </div>
          <div className="bg-[#f5f7fa] rounded-lg p-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#303133]">{ratio.toFixed(2)}</div>
              <div className="text-sm text-[#909399] mt-1">{t('contrast.ratio')}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className={`text-center p-2 rounded ${aaaLarge ? 'bg-[#f0fdf4] text-[#16a34a]' : 'bg-[#fef2f2] text-[#dc2626]'}`}>
                <div className="font-bold">{aaaLarge ? 'AA' : 'FAIL'}</div>
                <div className="text-xs">{t('contrast.largeText')}</div>
              </div>
              <div className={`text-center p-2 rounded ${aaaNormal ? 'bg-[#f0fdf4] text-[#16a34a]' : 'bg-[#fef2f2] text-[#dc2626]'}`}>
                <div className="font-bold">{aaaNormal ? 'AAA' : 'FAIL'}</div>
                <div className="text-xs">{t('contrast.normalText')}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg p-6 flex items-center justify-center" style={{ background: bg }}>
          <div style={{ color: fg }} className="text-center">
            <div className="text-2xl font-bold mb-2">{t('contrast.preview')}</div>
            <div className="text-sm">The quick brown fox jumps over the lazy dog</div>
            <div className="text-xs mt-1">Small text sample 12px</div>
          </div>
        </div>
      </div>
    </div>
  )
}
