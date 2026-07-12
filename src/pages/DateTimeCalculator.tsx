import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DateTimeCalculator() {
  const { t } = useTranslation()
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [result, setResult] = useState<{ days: number; hours: number; minutes: number; workdays: number } | null>(null)

  const calculate = () => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return

    const diff = Math.abs(d2.getTime() - d1.getTime())
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    let workdays = 0
    const start = new Date(Math.min(d1.getTime(), d2.getTime()))
    const end = new Date(Math.max(d1.getTime(), d2.getTime()))
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6) workdays++
    }

    setResult({ days, hours, minutes, workdays })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('datecalc.title')}</h2>
      <p className="text-[#909399] mb-6">{t('datecalc.desc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('datecalc.date1')}</label>
          <input type="datetime-local" className="input-field" value={date1} onChange={(e) => setDate1(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('datecalc.date2')}</label>
          <input type="datetime-local" className="input-field" value={date2} onChange={(e) => setDate2(e.target.value)} />
        </div>
      </div>

      <button onClick={calculate} className="btn-primary mb-6">{t('datecalc.calculate')}</button>

      {result && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#f0f9ff] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#0284c7]">{result.days}</div>
            <div className="text-sm text-[#909399]">{t('datecalc.days')}</div>
          </div>
          <div className="bg-[#f0fdf4] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#16a34a]">{result.hours}</div>
            <div className="text-sm text-[#909399]">{t('datecalc.hours')}</div>
          </div>
          <div className="bg-[#fefce8] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#ca8a04]">{result.minutes}</div>
            <div className="text-sm text-[#909399]">{t('datecalc.minutes')}</div>
          </div>
          <div className="bg-[#fdf2f8] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#db2777]">{result.workdays}</div>
            <div className="text-sm text-[#909399]">{t('datecalc.workdays')}</div>
          </div>
        </div>
      )}
    </div>
  )
}
