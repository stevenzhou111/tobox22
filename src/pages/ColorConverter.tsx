import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v] }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    Math.round(hue2rgb(p, q, h + 1/3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1/3) * 255),
  ]
}

export default function ColorConverter() {
  const { t } = useTranslation()
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState('59, 130, 246')
  const [hsl, setHsl] = useState('217, 91%, 60%')

  const fromHex = (val: string) => {
    setHex(val)
    const parsed = hexToRgb(val)
    if (parsed) {
      const [r, g, b] = parsed
      setRgb(`${r}, ${g}, ${b}`)
      const [h, s, l] = rgbToHsl(r, g, b)
      setHsl(`${h}, ${s}%, ${l}%`)
    }
  }

  const fromRgb = (val: string) => {
    setRgb(val)
    const parts = val.split(',').map(s => parseInt(s.trim()))
    if (parts.length === 3 && parts.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
      const [r, g, b] = parts
      setHex(rgbToHex(r, g, b))
      const [h, s, l] = rgbToHsl(r, g, b)
      setHsl(`${h}, ${s}%, ${l}%`)
    }
  }

  const fromHsl = (val: string) => {
    setHsl(val)
    const parts = val.replace(/%/g, '').split(',').map(s => parseInt(s.trim()))
    if (parts.length === 3 && parts.every(n => !isNaN(n))) {
      const [h, s, l] = parts
      const [r, g, b] = hslToRgb(h, s, l)
      setRgb(`${r}, ${g}, ${b}`)
      setHex(rgbToHex(r, g, b))
    }
  }

  const preview = hexToRgb(hex) ? hex : '#000000'

  return (
    <div>
      <ToolHeader title={t('color.title')} desc={t('color.desc')} />

      <div className="space-y-6">
        {/* Preview */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-xl border border-gray-200 shadow-inner"
            style={{ backgroundColor: preview }}
          />
          <div>
            <div className="text-sm text-gray-500">{t('color.preview')}</div>
            <div className="text-lg font-mono font-bold text-gray-900">{hex}</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('color.hex')}</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => fromHex(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('color.rgb')}</label>
            <input
              type="text"
              value={rgb}
              onChange={(e) => fromRgb(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('color.hsl')}</label>
            <input
              type="text"
              value={hsl}
              onChange={(e) => fromHsl(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Copy buttons */}
        <div className="flex gap-2 flex-wrap">
          {[hex, `rgb(${rgb})`, `hsl(${hsl})`].map((val, i) => (
            <button
              key={i}
              onClick={() => navigator.clipboard.writeText(val)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-mono"
            >
              {t('copy')}: {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
