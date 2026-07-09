import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Factorial() {
  const { t } = useTranslation()
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<string>('')

  const calculate = () => {
    const n = parseInt(number)
    if (isNaN(n) || n < 0 || n > 170) { setResult(''); return }

    let fact = BigInt(1)
    for (let i = 2; i <= n; i++) fact *= BigInt(i)
    setResult(fact.toString())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('factorial.title')}</h2>
      <p className="text-[#909399] mb-6">{t('factorial.desc')}</p>

      <div className="flex items-center gap-4 mb-4">
        <input type="number" className="input-field w-32" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="0-170" min="0" max="170" />
        <button onClick={calculate} className="btn-primary">{t('factorial.calculate')}</button>
      </div>

      {result && (
        <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-sm break-all select-all">{result}</div>
      )}
    </div>
  )
}
