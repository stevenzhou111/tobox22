import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PercentageCalc() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<'of' | 'is' | 'change'>('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    if (isNaN(numA) || isNaN(numB)) return

    switch (mode) {
      case 'of': setResult((numA / 100) * numB); break
      case 'is': setResult(numB !== 0 ? (numA / numB) * 100 : 0); break
      case 'change': setResult(numA !== 0 ? ((numB - numA) / numA) * 100 : 0); break
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('percentage.title')}</h2>
      <p className="text-[#909399] mb-6">{t('percentage.desc')}</p>

      <div className="flex gap-2 mb-6">
        {(['of', 'is', 'change'] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setResult(null) }} className={`tab-btn ${mode === m ? 'active' : ''}`}>
            {t(`percentage.modes.${m}`)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input type="number" className="input-field w-32" value={a} onChange={(e) => setA(e.target.value)} placeholder="A" />
        <span className="text-[#909399]">{t(`percentage.labels.${mode}`)}</span>
        <input type="number" className="input-field w-32" value={b} onChange={(e) => setB(e.target.value)} placeholder="B" />
        <button onClick={calculate} className="btn-primary">=</button>
      </div>

      {result !== null && (
        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-lg p-4">
          <span className="text-lg font-bold text-[#0284c7]">{result.toFixed(2)}%</span>
        </div>
      )}
    </div>
  )
}
