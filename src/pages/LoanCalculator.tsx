import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoanCalculator() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null)

  const calculate = () => {
    const principal = parseFloat(amount)
    const annualRate = parseFloat(rate) / 100
    const months = parseInt(years) * 12

    if (isNaN(principal) || isNaN(annualRate) || isNaN(months) || principal <= 0 || months <= 0) return

    const monthlyRate = annualRate / 12
    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const total = monthly * months
    const interest = total - principal

    setResult({ monthly, total, interest })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('loan.title')}</h2>
      <p className="text-[#909399] mb-6">{t('loan.desc')}</p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('loan.amount')}</label>
          <input type="number" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100000" />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('loan.rate')} (%)</label>
          <input type="number" className="input-field" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5.5" step="0.1" />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('loan.years')}</label>
          <input type="number" className="input-field" value={years} onChange={(e) => setYears(e.target.value)} placeholder="30" />
        </div>
        <button onClick={calculate} className="btn-primary w-full">{t('loan.calculate')}</button>

        {result && (
          <div className="space-y-3">
            <div className="bg-[#f0f9ff] rounded-lg p-4 flex justify-between">
              <span className="text-[#909399]">{t('loan.monthly')}</span>
              <span className="font-bold text-[#0284c7]">${result.monthly.toFixed(2)}</span>
            </div>
            <div className="bg-[#fef2f2] rounded-lg p-4 flex justify-between">
              <span className="text-[#909399]">{t('loan.totalInterest')}</span>
              <span className="font-bold text-[#dc2626]">${result.interest.toFixed(2)}</span>
            </div>
            <div className="bg-[#f0fdf4] rounded-lg p-4 flex justify-between">
              <span className="text-[#909399]">{t('loan.totalPayment')}</span>
              <span className="font-bold text-[#16a34a]">${result.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
