import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RegexGenerator() {
  const { t } = useTranslation()
  const [description, setDescription] = useState('')
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<string[]>([])

  const patterns: Record<string, string> = {
    email: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}',
    url: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+',
    phone: '\\d{3}[-.]?\\d{3,4}[-.]?\\d{4}',
    ip: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
    date: '\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}',
    time: '\\d{1,2}:\\d{2}(:\\d{2})?',
    hex: '#[0-9a-fA-F]{6}',
    chinese: '[\\u4e00-\\u9fa5]+',
    idcard: '\\d{17}[\\dXx]',
    zipcode: '\\d{6}',
  }

  const generate = () => {
    const desc = description.toLowerCase()
    for (const [key, val] of Object.entries(patterns)) {
      if (desc.includes(key)) { setPattern(val); return }
    }
    setPattern('')
  }

  const test = () => {
    try {
      const regex = new RegExp(pattern, 'g')
      const found = testString.match(regex) || []
      setMatches(found)
    } catch {
      setMatches([])
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('regextool.title')}</h2>
      <p className="text-[#909399] mb-6">{t('regextool.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">{t('regextool.describe')}</label>
        <div className="flex gap-2">
          <input className="input-field flex-1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('regextool.describePlaceholder')} />
          <button onClick={generate} className="btn-primary">{t('regextool.generate')}</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(patterns).map((key) => (
          <button key={key} onClick={() => { setDescription(key); setPattern(patterns[key]) }} className="px-3 py-1 bg-[#f5f7fa] rounded text-sm hover:bg-[#e4e7ed]">{key}</button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">{t('regextool.pattern')}</label>
        <input className="input-field font-mono" value={pattern} onChange={(e) => setPattern(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">{t('regextool.testString')}</label>
        <textarea className="input-field h-24 font-mono text-sm resize-y" value={testString} onChange={(e) => setTestString(e.target.value)} />
        <button onClick={test} className="btn-primary mt-2">{t('regextool.test')}</button>
      </div>

      {matches.length > 0 && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-3">
          <div className="text-sm text-[#16a34a] font-medium mb-2">{t('regextool.found', { count: matches.length })}</div>
          <div className="space-y-1">
            {matches.map((m, i) => (
              <div key={i} className="font-mono text-sm bg-white rounded px-2 py-1">{m}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
