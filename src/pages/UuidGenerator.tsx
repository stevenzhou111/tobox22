import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UuidGenerator() {
  const { t } = useTranslation()
  const [count, setCount] = useState(1)
  const [version, setVersion] = useState<'v4' | 'v1'>('v4')
  const [results, setResults] = useState<string[]>([])

  const generateV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  }

  const generateV1 = () => {
    const now = Date.now()
    const t1 = (now & 0xffffffff).toString(16).padStart(8, '0')
    const t2 = ((now / 0x100000000) & 0xffff).toString(16).padStart(4, '0')
    return `${t1}-${t2}-1${Math.random().toString(16).slice(2, 5)}-${((Math.random() * 16 | 0) & 0x3 | 0x8).toString(16)}${Math.random().toString(16).slice(2, 14)}-${Math.random().toString(16).slice(2, 14)}`
  }

  const generate = () => {
    const uuids = Array.from({ length: count }, () => version === 'v4' ? generateV4() : generateV1())
    setResults(uuids)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('uuid.title')}</h2>
      <p className="text-[#909399] mb-6">{t('uuid.desc')}</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('uuid.version')}</label>
          <select className="input-field w-24" value={version} onChange={(e) => setVersion(e.target.value as any)}>
            <option value="v4">v4</option>
            <option value="v1">v1</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('uuid.count')}</label>
          <input type="number" className="input-field w-24" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="100" />
        </div>
        <button onClick={generate} className="btn-primary mt-5">{t('uuid.generate')}</button>
        {results.length > 0 && (
          <button onClick={() => navigator.clipboard.writeText(results.join('\n'))} className="btn-secondary mt-5">{t('copy')}</button>
        )}
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((uuid, i) => (
            <div key={i} className="bg-[#f5f7fa] rounded-lg p-3 font-mono text-sm flex items-center justify-between">
              <span>{uuid}</span>
              <button onClick={() => navigator.clipboard.writeText(uuid)} className="text-[#409eff] text-xs hover:underline">{t('copy')}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
