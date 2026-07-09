import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HexColor() {
  const { t } = useTranslation()
  const [hex, setHex] = useState('#409eff')
  const [rgb, setRgb] = useState({ r: 64, g: 158, b: 255 })

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    setRgb({ r, g, b })
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
  }

  const handleHex = (val: string) => {
    setHex(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) hexToRgb(val)
  }

  const handleRgb = (key: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [key]: Math.max(0, Math.min(255, val)) }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('hexcolor.title')}</h2>
      <p className="text-[#909399] mb-6">{t('hexcolor.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input type="color" className="w-16 h-12 rounded cursor-pointer" value={hex} onChange={(e) => handleHex(e.target.value)} />
            <input className="input-field font-mono flex-1" value={hex} onChange={(e) => handleHex(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(['r', 'g', 'b'] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm text-[#909399] mb-1">{key.toUpperCase()}</label>
                <input type="number" className="input-field" value={rgb[key]} onChange={(e) => handleRgb(key, Number(e.target.value))} min="0" max="255" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-32 rounded-lg mb-4" style={{ background: hex }} />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-[#f5f7fa] rounded p-2 text-center"><span className="text-[#909399]">HEX: </span><span className="font-mono">{hex}</span></div>
            <div className="bg-[#f5f7fa] rounded p-2 text-center"><span className="text-[#909399]">RGB: </span><span className="font-mono">rgb({rgb.r},{rgb.g},{rgb.b})</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
