import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NumberToWords() {
  const { t } = useTranslation()
  const [number, setNumber] = useState('')
  const [result, setResult] = useState('')

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

  const convert = (num: number): string => {
    if (num === 0) return 'zero'
    if (num < 0) return 'minus ' + convert(-num)

    let words = ''
    if (num >= 1000000) { words += convert(Math.floor(num / 1000000)) + ' million '; num %= 1000000 }
    if (num >= 1000) { words += convert(Math.floor(num / 1000)) + ' thousand '; num %= 1000 }
    if (num >= 100) { words += ones[Math.floor(num / 100)] + ' hundred '; num %= 100 }
    if (num >= 20) { words += tens[Math.floor(num / 10)] + ' '; num %= 10 }
    if (num > 0) { words += ones[num] + ' ' }

    return words.trim()
  }

  const handleConvert = () => {
    const num = parseInt(number)
    if (isNaN(num)) return
    setResult(convert(Math.abs(num)) + (num < 0 ? ' (negative)' : ''))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('numwords.title')}</h2>
      <p className="text-[#909399] mb-6">{t('numwords.desc')}</p>
      <div className="flex gap-4 mb-4">
        <input type="number" className="input-field flex-1" value={number} onChange={(e) => setNumber(e.target.value)} placeholder={t('numwords.placeholder')} />
        <button onClick={handleConvert} className="btn-primary">{t('convert')}</button>
      </div>
      {result && <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-sm capitalize">{result}</div>}
    </div>
  )
}
