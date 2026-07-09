import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function BmiCalculator() {
  const { t } = useTranslation()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [bmi, setBmi] = useState<number | null>(null)

  const calculate = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return

    if (unit === 'metric') {
      setBmi(w / ((h / 100) ** 2))
    } else {
      setBmi((w / (h ** 2)) * 703)
    }
  }

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: t('bmi.underweight'), color: '#409eff' }
    if (bmi < 25) return { label: t('bmi.normal'), color: '#67c23a' }
    if (bmi < 30) return { label: t('bmi.overweight'), color: '#e6a23c' }
    return { label: t('bmi.obese'), color: '#f56c6c' }
  }

  const category = bmi ? getBmiCategory(bmi) : null

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('bmi.title')}</h2>
      <p className="text-[#909399] mb-6">{t('bmi.desc')}</p>

      <div className="max-w-md space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnit('metric')} className={`tab-btn ${unit === 'metric' ? 'active' : ''}`}>{t('bmi.metric')}</button>
          <button onClick={() => setUnit('imperial')} className={`tab-btn ${unit === 'imperial' ? 'active' : ''}`}>{t('bmi.imperial')}</button>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('bmi.height')} ({unit === 'metric' ? 'cm' : 'in'})</label>
          <input type="number" className="input-field" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('bmi.weight')} ({unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input type="number" className="input-field" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <button onClick={calculate} className="btn-primary w-full">{t('bmi.calculate')}</button>

        {bmi && category && (
          <div className="bg-[#f5f7fa] rounded-lg p-6 text-center">
            <div className="text-4xl font-bold" style={{ color: category.color }}>{bmi.toFixed(1)}</div>
            <div className="mt-2 text-lg" style={{ color: category.color }}>{category.label}</div>
          </div>
        )}
      </div>
    </div>
  )
}
