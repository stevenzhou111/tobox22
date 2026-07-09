import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextDifference() {
  const { t } = useTranslation()
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [result, setResult] = useState<{ added: number; removed: number; unchanged: number } | null>(null)

  const compare = () => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    let added = 0, removed = 0, unchanged = 0
    const maxLen = Math.max(lines1.length, lines2.length)
    for (let i = 0; i < maxLen; i++) {
      if (lines1[i] === lines2[i]) unchanged++
      else {
        if (lines1[i] !== undefined) removed++
        if (lines2[i] !== undefined) added++
      }
    }
    setResult({ added, removed, unchanged })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textcompare.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textcompare.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <textarea className="input-field h-48 font-mono text-sm resize-y" value={text1} onChange={(e) => setText1(e.target.value)} placeholder={t('textcompare.placeholder1')} />
        <textarea className="input-field h-48 font-mono text-sm resize-y" value={text2} onChange={(e) => setText2(e.target.value)} placeholder={t('textcompare.placeholder2')} />
      </div>
      <button onClick={compare} className="btn-primary mb-4">{t('textcompare.compare')}</button>
      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#f0fdf4] rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#16a34a]">{result.added}</div><div className="text-sm text-[#909399]">{t('textcompare.added')}</div></div>
          <div className="bg-[#fef2f2] rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#dc2626]">{result.removed}</div><div className="text-sm text-[#909399]">{t('textcompare.removed')}</div></div>
          <div className="bg-[#f5f7fa] rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#6b7280]">{result.unchanged}</div><div className="text-sm text-[#909399]">{t('textcompare.unchanged')}</div></div>
        </div>
      )}
    </div>
  )
}
