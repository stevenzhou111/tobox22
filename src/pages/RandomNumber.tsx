import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RandomNumber() {
  const { t } = useTranslation()
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('1')
  const [unique, setUnique] = useState(true)
  const [results, setResults] = useState<number[]>([])

  const generate = () => {
    const minNum = parseInt(min)
    const maxNum = parseInt(max)
    const countNum = parseInt(count)

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || minNum >= maxNum || countNum < 1) {
      return
    }

    const nums: number[] = []
    const attempts = new Set<number>()

    while (nums.length < countNum && attempts.size <= maxNum - minNum + 1) {
      const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      if (unique) {
        if (!attempts.has(num)) {
          attempts.add(num)
          nums.push(num)
        }
      } else {
        nums.push(num)
      }
    }

    setResults(nums)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('random.title')}</h2>
      <p className="text-gray-500 mb-6">{t('random.desc')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('random.min')}</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('random.max')}</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('random.count')}</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-gray-600 pb-2">
            <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="rounded" />
            {t('random.unique')}
          </label>
        </div>
      </div>

      <button onClick={generate} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {t('random.generate')}
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('output')}</span>
            <button onClick={() => navigator.clipboard.writeText(results.join('\n'))} className="text-xs text-blue-500 hover:text-blue-600">
              {t('copy')}
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            {results.map((num, i) => (
              <span key={i} className="inline-block bg-white border border-gray-200 rounded px-2 py-1 m-1">{num}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
