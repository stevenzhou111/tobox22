import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsonToTable() {
  const { t } = useTranslation()
  const [json, setJson] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, any>[]>([])
  const [error, setError] = useState('')

  const parse = () => {
    try {
      const data = JSON.parse(json)
      const arr = Array.isArray(data) ? data : [data]
      if (arr.length === 0) {
        setError(t('jsontotable.errorEmpty'))
        return
      }
      const allKeys = new Set<string>()
      arr.forEach((item) => Object.keys(item).forEach((k) => allKeys.add(k)))
      setHeaders(Array.from(allKeys))
      setRows(arr)
      setError('')
    } catch {
      setError(t('jsontotable.errorJson'))
    }
  }

  const exportCsv = () => {
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => headers.map((h) => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'table.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('jsontotable.title')}</h2>
      <p className="text-[#909399] mb-6">{t('jsontotable.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">JSON</label>
        <textarea
          className="input-field h-48 font-mono text-sm resize-y"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='[{"name":"John","age":25},{"name":"Jane","age":30}]'
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={parse} className="btn-primary">{t('jsontotable.parse')}</button>
        {rows.length > 0 && <button onClick={exportCsv} className="btn-secondary">{t('jsontotable.exportCsv')}</button>}
      </div>

      {error && <div className="text-[#f56c6c] text-sm mb-4">{error}</div>}

      {rows.length > 0 && (
        <div className="overflow-auto border border-[#ebeef5] rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f5f7fa]">
                {headers.map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-medium text-[#303133] border-b border-[#ebeef5]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-[#f5f7fa]">
                  {headers.map((h) => (
                    <td key={h} className="px-4 py-2 border-b border-[#ebeef5] text-[#606266]">{String(row[h] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-4 text-sm text-[#909399]">{t('jsontotable.rows', { count: rows.length })}</div>
      )}
    </div>
  )
}
