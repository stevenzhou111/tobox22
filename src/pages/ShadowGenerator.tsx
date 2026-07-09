import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ShadowGenerator() {
  const { t } = useTranslation()
  const [x, setX] = useState(0)
  const [y, setY] = useState(4)
  const [blur, setBlur] = useState(8)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(25)
  const [inset, setInset] = useState(false)

  const shadow = `${inset ? 'inset ' : ''}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity / 100})`

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('shadow.title')}</h2>
      <p className="text-[#909399] mb-6">{t('shadow.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: 'X', value: x, set: setX, min: -50, max: 50 },
            { label: 'Y', value: y, set: setY, min: -50, max: 50 },
            { label: t('shadow.blur'), value: blur, set: setBlur, min: 0, max: 100 },
            { label: t('shadow.spread'), value: spread, set: setSpread, min: -50, max: 50 },
            { label: t('shadow.opacity'), value: opacity, set: setOpacity, min: 0, max: 100 },
          ].map((item) => (
            <div key={item.label}>
              <label className="block text-sm text-[#909399] mb-1">{item.label}: {item.value}px</label>
              <input type="range" className="w-full" min={item.min} max={item.max} value={item.value} onChange={(e) => item.set(Number(e.target.value))} />
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="rounded" />
            {t('shadow.inset')}
          </label>
        </div>

        <div>
          <div className="h-40 rounded-lg mb-4 bg-white border border-[#e5e7eb]" style={{ boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity / 100})${inset ? ' inset' : ''}` }} />
          <div className="bg-[#f5f7fa] rounded-lg p-3 font-mono text-sm flex items-center justify-between">
            <span className="break-all">box-shadow: {x}px {y}px {blur}px {spread}px rgba(0,0,0,{opacity / 100}){inset ? ' inset' : ''};</span>
            <button onClick={() => navigator.clipboard.writeText(`box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity / 100})${inset ? ' inset' : ''};`)} className="text-[#409eff] text-xs hover:underline ml-2 shrink-0">{t('copy')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
