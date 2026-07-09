import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextSlug() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const generate = () => {
    setResult(text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('slug.title')}</h2>
      <p className="text-[#909399] mb-6">{t('slug.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">{t('slug.input')}</label>
        <input className="input-field" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('slug.placeholder')} />
      </div>
      <button onClick={generate} className="btn-primary mb-4">{t('slug.generate')}</button>

      {result && (
        <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono flex items-center justify-between">
          <span>{result}</span>
          <button onClick={() => navigator.clipboard.writeText(result)} className="text-[#409eff] text-sm hover:underline">{t('copy')}</button>
        </div>
      )}
    </div>
  )
}
