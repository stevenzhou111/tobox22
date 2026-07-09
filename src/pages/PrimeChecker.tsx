import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PrimeChecker() {
  const { t } = useTranslation()
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<{ isPrime: boolean; factors: number[] } | null>(null)

  const check = () => {
    const n = parseInt(number)
    if (isNaN(n) || n < 2) { setResult({ isPrime: false, factors: [] }); return }

    const factors: number[] = []
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { factors.push(i); if (i !== n / i) factors.push(n / i) }
    }
    factors.sort((a, b) => a - b)
    setResult({ isPrime: factors.length === 0, factors })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('prime.title')}</h2>
      <p className="text-[#909399] mb-6">{t('prime.desc')}</p>

      <div className="flex items-center gap-4 mb-4">
        <input type="number" className="input-field w-48" value={number} onChange={(e) => setNumber(e.target.value)} placeholder={t('prime.placeholder')} />
        <button onClick={check} className="btn-primary">{t('prime.check')}</button>
      </div>

      {result && (
        <div className={`rounded-lg p-4 ${result.isPrime ? 'bg-[#f0fdf4] border border-[#bbf7d0]' : 'bg-[#fef2f2] border border-[#fecaca]'}`}>
          <div className={`text-lg font-bold ${result.isPrime ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
            {number} {result.isPrime ? t('prime.isPrime') : t('prime.notPrime')}
          </div>
          {!result.isPrime && result.factors.length > 0 && (
            <div className="mt-2 text-sm text-[#909399]">{t('prime.factors')}: {result.factors.join(', ')}</div>
          )}
        </div>
      )}
    </div>
  )
}
