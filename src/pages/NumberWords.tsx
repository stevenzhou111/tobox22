import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NumberWords() {
  const { t } = useTranslation()
  const [number, setNumber] = useState('')
  const [result, setResult] = useState('')

  const ones = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']

  const convert = (n: number): string => {
    if (n < 20) return ones[n]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '')
    if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + convert(n % 100) : '')
    if (n < 1000000) return convert(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '')
    return convert(Math.floor(n / 1000000)) + ' million' + (n % 1000000 ? ' ' + convert(n % 1000000) : '')
  }

  const handleConvert = () => {
    const n = parseInt(number)
    if (isNaN(n) || n < 0 || n > 999999999) return
    setResult(convert(n))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('numwords2.title')}</h2>
      <p className="text-[#909399] mb-6">{t('numwords2.desc')}</p>
      <div className="flex gap-4 mb-4">
        <input type="number" className="input-field flex-1" value={number} onChange={(e) => setNumber(e.target.value)} placeholder={t('numwords2.placeholder')} min="0" max="999999999" />
        <button onClick={handleConvert} className="btn-primary">{t('convert')}</button>
      </div>
      {result && <div className="bg-[#f5f7fa] rounded-lg p-4 capitalize">{result}</div>}
    </div>
  )
}
