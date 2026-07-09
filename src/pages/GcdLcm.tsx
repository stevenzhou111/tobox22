import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function GcdLcm() {
  const { t } = useTranslation()
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<{ gcd: number; lcm: number } | null>(null)

  const calculate = () => {
    const numA = parseInt(a)
    const numB = parseInt(b)
    if (isNaN(numA) || isNaN(numB)) return

    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y)
    const gcdVal = gcd(Math.abs(numA), Math.abs(numB))
    const lcmVal = Math.abs(numA * numB) / gcdVal

    setResult({ gcd: gcdVal, lcm: lcmVal })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('gcdlcm.title')}</h2>
      <p className="text-[#909399] mb-6">{t('gcdlcm.desc')}</p>

      <div className="flex items-center gap-4 mb-4">
        <input type="number" className="input-field w-32" value={a} onChange={(e) => setA(e.target.value)} placeholder="A" />
        <input type="number" className="input-field w-32" value={b} onChange={(e) => setB(e.target.value)} placeholder="B" />
        <button onClick={calculate} className="btn-primary">{t('gcdlcm.calculate')}</button>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f0f9ff] rounded-lg p-4 text-center">
            <div className="text-sm text-[#909399]">GCD</div>
            <div className="text-2xl font-bold text-[#0284c7]">{result.gcd}</div>
          </div>
          <div className="bg-[#f0fdf4] rounded-lg p-4 text-center">
            <div className="text-sm text-[#909399]">LCM</div>
            <div className="text-2xl font-bold text-[#16a34a]">{result.lcm}</div>
          </div>
        </div>
      )}
    </div>
  )
}
