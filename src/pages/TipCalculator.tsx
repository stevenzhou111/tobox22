import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TipCalculator() {
  const { t } = useTranslation()
  const [bill, setBill] = useState('')
  const [tipPercent, setTipPercent] = useState(15)
  const [people, setPeople] = useState(1)

  const billAmount = parseFloat(bill) || 0
  const tipAmount = billAmount * (tipPercent / 100)
  const total = billAmount + tipAmount
  const perPerson = people > 0 ? total / people : total

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('tip.title')}</h2>
      <p className="text-[#909399] mb-6">{t('tip.desc')}</p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('tip.bill')}</label>
          <input type="number" className="input-field" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('tip.tipPercent')}: {tipPercent}%</label>
          <input type="range" min="0" max="50" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('tip.people')}</label>
          <input type="number" className="input-field" value={people} onChange={(e) => setPeople(Number(e.target.value))} min="1" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
            <div className="text-sm text-[#909399]">{t('tip.tipAmount')}</div>
            <div className="text-xl font-bold text-[#409eff]">${tipAmount.toFixed(2)}</div>
          </div>
          <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
            <div className="text-sm text-[#909399]">{t('tip.total')}</div>
            <div className="text-xl font-bold text-[#67c23a]">${total.toFixed(2)}</div>
          </div>
        </div>
        {people > 1 && (
          <div className="bg-[#fdf6ec] rounded-lg p-4 text-center">
            <div className="text-sm text-[#909399]">{t('tip.perPerson')}</div>
            <div className="text-xl font-bold text-[#e6a23c]">${perPerson.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
