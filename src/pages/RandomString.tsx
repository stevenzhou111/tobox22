import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RandomString() {
  const { t } = useTranslation()
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: false })
  const [result, setResult] = useState('')

  const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  }

  const generate = () => {
    let pool = ''
    if (options.upper) pool += chars.upper
    if (options.lower) pool += chars.lower
    if (options.numbers) pool += chars.numbers
    if (options.symbols) pool += chars.symbols
    if (!pool) pool = chars.lower

    const str = Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join('')
    setResult(str)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('randomstr.title')}</h2>
      <p className="text-[#909399] mb-6">{t('randomstr.desc')}</p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('randomstr.length')}: {length}</label>
          <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries({ upper: t('randomstr.upper'), lower: t('randomstr.lower'), numbers: t('randomstr.numbers'), symbols: t('randomstr.symbols') }).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={options[key as keyof typeof options]} onChange={(e) => setOptions({ ...options, [key]: e.target.checked })} className="rounded" />
              {label}
            </label>
          ))}
        </div>
        <button onClick={generate} className="btn-primary w-full">{t('randomstr.generate')}</button>

        {result && (
          <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-lg break-all select-all flex items-center justify-between">
            <span>{result}</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-[#409eff] text-sm hover:underline ml-2">{t('copy')}</button>
          </div>
        )}
      </div>
    </div>
  )
}
