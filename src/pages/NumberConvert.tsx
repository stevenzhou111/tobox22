import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NumberConvert() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState(10)

  const bases = [
    { value: 2, label: 'Binary (2)' },
    { value: 8, label: 'Octal (8)' },
    { value: 10, label: 'Decimal (10)' },
    { value: 16, label: 'Hex (16)' },
  ]

  const convert = () => {
    try {
      const num = parseInt(input, fromBase)
      if (isNaN(num)) return {}
      return {
        binary: num.toString(2),
        octal: num.toString(8),
        decimal: num.toString(10),
        hex: num.toString(16).toUpperCase(),
      }
    } catch {
      return {}
    }
  }

  const results = input ? convert() : {}

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('numconvert.title')}</h2>
      <p className="text-[#909399] mb-6">{t('numconvert.desc')}</p>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm text-[#909399] mb-1">{t('numconvert.value')}</label>
          <input
            type="text"
            className="input-field font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('numconvert.placeholder')}
          />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('numconvert.fromBase')}</label>
          <select className="input-field w-40" value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))}>
            {bases.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(results).map(([base, value]) => (
            <div key={base} className="bg-[#f5f7fa] rounded-lg p-4">
              <div className="text-xs text-[#909399] mb-1">{t(`numconvert.${base}`)}</div>
              <div className="font-mono text-lg font-bold text-[#303133] break-all select-all">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
