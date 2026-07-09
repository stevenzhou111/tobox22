import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function CsvViewer() {
  const { t } = useTranslation()
  const [csv, setCsv] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])
  const [delimiter, setDelimiter] = useState(',')
  const fileRef = useRef<HTMLInputElement>(null)

  const parseCsv = (text: string, sep: string) => {
    const lines = text.trim().split('\n')
    if (lines.length === 0) return

    const newHeaders = lines[0].split(sep).map((h) => h.trim().replace(/^"|"$/g, ''))
    const newRows = lines.slice(1).map((line) =>
      line.split(sep).map((cell) => cell.trim().replace(/^"|"$/g, ''))
    )

    setHeaders(newHeaders)
    setRows(newRows)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setCsv(text)
      parseCsv(text, delimiter)
    }
    reader.readAsText(file)
  }

  const handleDelimiterChange = (sep: string) => {
    setDelimiter(sep)
    if (csv) parseCsv(csv, sep)
  }

  const exportJson = () => {
    const data = rows.map((row) => {
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => { obj[h] = row[i] || '' })
      return obj
    })
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'data.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportCsv = () => {
    const text = [headers.join(delimiter), ...rows.map((r) => r.join(delimiter))].join('\n')
    const blob = new Blob([text], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'data.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('csvviewer.title')}</h2>
      <p className="text-[#909399] mb-6">{t('csvviewer.desc')}</p>

      <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" onChange={handleFile} className="hidden" />

      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={() => fileRef.current?.click()} className="btn-primary">{t('csvviewer.upload')}</button>
        <select className="input-field w-32" value={delimiter} onChange={(e) => handleDelimiterChange(e.target.value)}>
          <option value=",">,</option>
          <option value=";">;</option>
          <option value="&#9;">Tab</option>
          <option value="|">|</option>
        </select>
        {headers.length > 0 && (
          <>
            <button onClick={exportJson} className="btn-secondary">CSV → JSON</button>
            <button onClick={exportCsv} className="btn-secondary">{t('csvviewer.download')}</button>
          </>
        )}
      </div>

      {headers.length > 0 && (
        <div className="overflow-auto border border-[#ebeef5] rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f5f7fa]">
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-2 text-left font-medium text-[#303133] border-b border-[#ebeef5]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-[#f5f7fa]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 border-b border-[#ebeef5] text-[#606266]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {headers.length > 0 && (
        <div className="mt-4 text-sm text-[#909399]">
          {t('csvviewer.rows', { count: rows.length })} | {t('csvviewer.cols', { count: headers.length })}
        </div>
      )}
    </div>
  )
}
