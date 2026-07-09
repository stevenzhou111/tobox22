import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ColorPalette() {
  const { t } = useTranslation()
  const [baseColor, setBaseColor] = useState('#409eff')
  const [palette, setPalette] = useState<string[]>([])

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100; l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (h < 60) { r = c; g = x } else if (h < 120) { r = x; g = c } else if (h < 180) { g = c; b = x }
    else if (h < 240) { g = x; b = c } else if (h < 300) { r = x; b = c } else { r = c; b = x }

    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const generate = (type: string) => {
    const hsl = hexToHsl(baseColor)
    let colors: string[] = []

    switch (type) {
      case 'shades':
        colors = Array.from({ length: 9 }, (_, i) => hslToHex(hsl.h, hsl.s, 90 - i * 10))
        break
      case 'tints':
        colors = Array.from({ length: 9 }, (_, i) => hslToHex(hsl.h, hsl.s, 10 + i * 10))
        break
      case 'complementary':
        colors = [baseColor, hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)]
        break
      case 'triadic':
        colors = [baseColor, hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)]
        break
      case 'analogous':
        colors = [hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l), baseColor, hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)]
        break
      case 'split':
        colors = [baseColor, hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l), hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)]
        break
    }
    setPalette(colors)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('palette.title')}</h2>
      <p className="text-[#909399] mb-6">{t('palette.desc')}</p>

      <div className="flex items-center gap-4 mb-6">
        <input type="color" className="w-16 h-12 rounded cursor-pointer" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
        <span className="font-mono">{baseColor}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['shades', 'tints', 'complementary', 'triadic', 'analogous', 'split'].map((type) => (
          <button key={type} onClick={() => generate(type)} className="btn-secondary text-sm">{t(`palette.${type}`)}</button>
        ))}
      </div>

      {palette.length > 0 && (
        <div className="flex rounded-lg overflow-hidden h-20">
          {palette.map((color, i) => (
            <div key={i} className="flex-1 relative group cursor-pointer" style={{ background: color }} onClick={() => navigator.clipboard.writeText(color)}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                <span className="text-white text-xs font-mono">{color}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
