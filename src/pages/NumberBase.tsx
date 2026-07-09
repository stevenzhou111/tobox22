import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const bases = [
  { label: 'Binary', base: 2 },
  { label: 'Octal', base: 8 },
  { label: 'Decimal', base: 10 },
  { label: 'Hexadecimal', base: 16 },
]

export default function NumberBase() {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [inputBase, setInputBase] = useState(10)
  const [error, setError] = useState('')

  const convert = (value: string, fromBase: number): Record<number, string> => {
    try {
      const num = parseInt(value, fromBase)
      if (isNaN(num)) throw new Error()
      setError('')
      const results: Record<number, string> = {}
      bases.forEach(({ base }) => {
        results[base] = num.toString(base).toUpperCase()
      })
      return results
    } catch {
      setError(t('numberbase.error'))
      return {}
    }
  }

  const results = inputValue ? convert(inputValue, inputBase) : {}

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('numberbase.title')}</h2>
      <p className="text-gray-500 mb-6">{t('numberbase.desc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('numberbase.inputBase')}</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={inputBase}
            onChange={(e) => setInputBase(Number(e.target.value))}
          >
            {bases.map((b) => (
              <option key={b.base} value={b.base}>{b.label} (Base {b.base})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('numberbase.value')}</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('numberbase.placeholder')}
          />
        </div>
      </div>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {bases.map((b) => (
          <div key={b.base} className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">{b.label} (Base {b.base})</div>
            <div className="font-mono text-sm break-all select-all">{results[b.base] || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
