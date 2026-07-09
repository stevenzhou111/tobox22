import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function GradientGenerator() {
  const { t } = useTranslation()
  const [color1, setColor1] = useState('#409eff')
  const [color2, setColor2] = useState('#67c23a')
  const [direction, setDirection] = useState('to right')
  const [type, setType] = useState<'linear' | 'radial'>('linear')

  const gradient = type === 'linear'
    ? `linear-gradient(${direction}, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`

  const cssCode = `background: ${gradient};`

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('gradient.title')}</h2>
      <p className="text-[#909399] mb-6">{t('gradient.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-[#909399] mb-1">{t('gradient.color1')}</label>
              <input type="color" className="w-16 h-10 rounded cursor-pointer" value={color1} onChange={(e) => setColor1(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-[#909399] mb-1">{t('gradient.color2')}</label>
              <input type="color" className="w-16 h-10 rounded cursor-pointer" value={color2} onChange={(e) => setColor2(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#909399] mb-1">{t('gradient.type')}</label>
            <select className="input-field" value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="linear">{t('gradient.linear')}</option>
              <option value="radial">{t('gradient.radial')}</option>
            </select>
          </div>
          {type === 'linear' && (
            <div>
              <label className="block text-sm text-[#909399] mb-1">{t('gradient.direction')}</label>
              <select className="input-field" value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="to right">→ {t('gradient.toRight')}</option>
                <option value="to left">← {t('gradient.toLeft')}</option>
                <option value="to bottom">↓ {t('gradient.toBottom')}</option>
                <option value="to top">↑ {t('gradient.toTop')}</option>
                <option value="135deg">↘ 135°</option>
                <option value="45deg">↗ 45°</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <div className="h-40 rounded-lg mb-4" style={{ background: gradient }} />
          <div className="bg-[#f5f7fa] rounded-lg p-3 font-mono text-sm flex items-center justify-between">
            <span className="break-all">{cssCode}</span>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="text-[#409eff] text-xs hover:underline ml-2 shrink-0">{t('copy')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
