import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AgeCalculator() {
  const { t } = useTranslation()
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number; totalWeeks: number } | null>(null)

  const calculate = () => {
    if (!birthDate) return
    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
    if (months < 0) { years--; months += 12 }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)

    setResult({ years, months, days, totalDays, totalWeeks })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('age.title')}</h2>
      <p className="text-[#909399] mb-6">{t('age.desc')}</p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('age.birthDate')}</label>
          <input type="date" className="input-field" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <button onClick={calculate} className="btn-primary w-full">{t('age.calculate')}</button>

        {result && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#f0f9ff] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#0284c7]">{result.years}</div>
              <div className="text-sm text-[#909399]">{t('age.years')}</div>
            </div>
            <div className="bg-[#f0fdf4] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#16a34a]">{result.months}</div>
              <div className="text-sm text-[#909399]">{t('age.months')}</div>
            </div>
            <div className="bg-[#fefce8] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#ca8a04]">{result.days}</div>
              <div className="text-sm text-[#909399]">{t('age.days')}</div>
            </div>
            <div className="col-span-3 bg-[#f5f7fa] rounded-lg p-4 flex justify-around">
              <div className="text-center">
                <div className="font-bold text-[#303133]">{result.totalDays.toLocaleString()}</div>
                <div className="text-xs text-[#909399]">{t('age.totalDays')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#303133]">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-xs text-[#909399]">{t('age.totalWeeks')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
