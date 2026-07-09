import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CsvToTable() {
  const { t } = useTranslation()
  const [csv, setCsv] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])

  const parse = () => {
    const lines = csv.trim().split('\n')
    if (lines.length < 1) return
    setHeaders(lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '')))
    setRows(lines.slice(1).map((line) => line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''))))
  }

  const toMarkdown = () => {
    if (headers.length === 0) return
    let md = '| ' + headers.join(' | ') + ' |\n'
    md += '| ' + headers.map(() => '---').join(' | ') + ' |\n'
    rows.forEach((row) => { md += '| ' + row.join(' | ') + ' |\n' })
    navigator.clipboard.writeText(md)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('csvtable.title')}</h2>
      <p className="text-[#909399] mb-6">{t('csvtable.desc')}</p>
      <textarea className="input-field h-40 font-mono text-sm resize-y mb-4" value={csv} onChange={(e) => setCsv(e.target.value)} placeholder={t('csvtable.placeholder')} />
      <div className="flex gap-3 mb-4">
        <button onClick={parse} className="btn-primary">{t('csvtable.parse')}</button>
        {headers.length > 0 && <button onClick={toMarkdown} className="btn-secondary">{t('csvtable.toMd')}</button>}
      </div>
      {headers.length > 0 && (
        <div className="overflow-auto border border-[#e5e7eb] rounded-lg">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#f5f7fa]">{headers.map((h, i) => <th key={i} className="px-4 py-2 text-left border-b border-[#e5e7eb]">{h}</th>)}</tr></thead>
            <tbody>{rows.map((row, i) => <tr key={i} className="hover:bg-[#f5f7fa]">{row.map((cell, j) => <td key={j} className="px-4 py-2 border-b border-[#e5e7eb]">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}
