import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoremIpsum() {
  const { t } = useTranslation()
  const [count, setCount] = useState(5)
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs')
  const [result, setResult] = useState('')

  const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

  const getWords = (n: number) => Array.from({ length: n }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
  const getSentences = (n: number) => Array.from({ length: n }, () => {
    const len = 8 + Math.floor(Math.random() * 12)
    const s = getWords(len)
    return s.charAt(0).toUpperCase() + s.slice(1) + '.'
  }).join(' ')
  const getParagraphs = (n: number) => Array.from({ length: n }, () => getSentences(4 + Math.floor(Math.random() * 4))).join('\n\n')

  const generate = () => {
    switch (type) {
      case 'words': setResult(getWords(count)); break
      case 'sentences': setResult(getSentences(count)); break
      case 'paragraphs': setResult(getParagraphs(count)); break
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('lorem.title')}</h2>
      <p className="text-[#909399] mb-6">{t('lorem.desc')}</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('lorem.type')}</label>
          <select className="input-field w-32" value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="paragraphs">{t('lorem.paragraphs')}</option>
            <option value="sentences">{t('lorem.sentences')}</option>
            <option value="words">{t('lorem.words')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('lorem.count')}</label>
          <input type="number" className="input-field w-24" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="100" />
        </div>
        <button onClick={generate} className="btn-primary mt-5">{t('lorem.generate')}</button>
        {result && <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary mt-5">{t('copy')}</button>}
      </div>

      {result && (
        <textarea className="input-field h-64 font-mono text-sm resize-y" value={result} readOnly />
      )}
    </div>
  )
}
