import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FibonacciGenerator() {
  const { t } = useTranslation()
  const [count, setCount] = useState(20)
  const [result, setResult] = useState<number[]>([])

  const generate = () => {
    const fib: number[] = [0, 1]
    for (let i = 2; i < count; i++) fib.push(fib[i - 1] + fib[i - 2])
    setResult(fib.slice(0, count))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('fibonacci.title')}</h2>
      <p className="text-[#909399] mb-6">{t('fibonacci.desc')}</p>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('fibonacci.count')}</label>
          <input type="number" className="input-field w-24" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="100" />
        </div>
        <button onClick={generate} className="btn-primary mt-5">{t('fibonacci.generate')}</button>
        {result.length > 0 && <button onClick={() => navigator.clipboard.writeText(result.join(', '))} className="btn-secondary mt-5">{t('copy')}</button>}
      </div>

      {result.length > 0 && (
        <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-sm break-all">{result.join(', ')}</div>
      )}
    </div>
  )
}
