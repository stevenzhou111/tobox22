import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const romanNumerals: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return ''
  let result = ''
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }
  return result
}

function fromRoman(roman: string): number {
  const map: Record<string, number> = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
  let result = 0
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]] || 0
    const next = map[roman[i + 1]] || 0
    if (current < next) {
      result -= current
    } else {
      result += current
    }
  }
  return result
}

export default function RomanNumeral() {
  const { t } = useTranslation()
  const [number, setNumber] = useState('')
  const [roman, setRoman] = useState('')
  const [error, setError] = useState('')

  const numToRoman = () => {
    const n = parseInt(number)
    if (isNaN(n) || n < 1 || n > 3999) {
      setError(t('roman.error'))
      setRoman('')
      return
    }
    setError('')
    setRoman(toRoman(n))
  }

  const romanToNum = () => {
    const upper = roman.toUpperCase().trim()
    if (!/^[IVXLCDM]+$/.test(upper)) {
      setError(t('roman.errorRoman'))
      setNumber('')
      return
    }
    setError('')
    setNumber(String(fromRoman(upper)))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('roman.title')}</h2>
      <p className="text-gray-500 mb-6">{t('roman.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('roman.number')}</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="1-3999"
            min="1"
            max="3999"
          />
          <button onClick={numToRoman} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('roman.toRoman')}
          </button>
          {roman && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg font-mono text-lg">{roman}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('roman.roman')}</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400"
            value={roman}
            onChange={(e) => setRoman(e.target.value)}
            placeholder="I, II, III, IV..."
          />
          <button onClick={romanToNum} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('roman.toNumber')}
          </button>
          {number && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg font-mono text-lg">{number}</div>
          )}
        </div>
      </div>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
    </div>
  )
}
