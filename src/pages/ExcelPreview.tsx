import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ExcelPreview() {
  const { t } = useTranslation()
  const [workbook, setWorkbook] = useState<{ name: string; sheets: { name: string; headers: string[]; rows: string[][] }[] } | null>(null)
  const [activeSheet, setActiveSheet] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
    const rows = lines.slice(1).map((line) =>
      line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''))
    )

    setWorkbook({
      name: file.name,
      sheets: [{ name: 'Sheet1', headers, rows }]
    })
    setActiveSheet(0)
  }

  const exportTo = (format: string) => {
    if (!workbook) return
    const sheet = workbook.sheets[activeSheet]
    let content = ''
    let mimeType = ''
    let ext = ''

    switch (format) {
      case 'csv':
        content = [sheet.headers.join(','), ...sheet.rows.map((r) => r.join(','))].join('\n')
        mimeType = 'text/csv'
        ext = 'csv'
        break
      case 'json':
        const data = sheet.rows.map((row) => {
          const obj: Record<string, string> = {}
          sheet.headers.forEach((h, i) => { obj[h] = row[i] || '' })
          return obj
        })
        content = JSON.stringify(data, null, 2)
        mimeType = 'application/json'
        ext = 'json'
        break
      case 'tsv':
        content = [sheet.headers.join('\t'), ...sheet.rows.map((r) => r.join('\t'))].join('\n')
        mimeType = 'text/tab-separated-values'
        ext = 'tsv'
        break
      case 'md':
        content = '| ' + sheet.headers.join(' | ') + ' |\n'
        content += '| ' + sheet.headers.map(() => '---').join(' | ') + ' |\n'
        content += sheet.rows.map((r) => '| ' + r.join(' | ') + ' |').join('\n')
        mimeType = 'text/markdown'
        ext = 'md'
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${workbook.name.replace(/\.[^.]+$/, '')}.${ext}`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('excelpreview.title')}</h2>
      <p className="text-[#909399] mb-6">{t('excelpreview.desc')}</p>

      <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current?.click()} className="btn-primary mb-4">{t('excelpreview.upload')}</button>

      {workbook && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {workbook.sheets.map((sheet, i) => (
              <button
                key={i}
                onClick={() => setActiveSheet(i)}
                className={`px-4 py-2 rounded text-sm ${activeSheet === i ? 'bg-[#409eff] text-white' : 'bg-[#f5f7fa] text-[#606266] hover:bg-[#e4e7ed]'}`}
              >
                {sheet.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => exportTo('csv')} className="btn-secondary text-sm">导出 CSV</button>
            <button onClick={() => exportTo('json')} className="btn-secondary text-sm">导出 JSON</button>
            <button onClick={() => exportTo('tsv')} className="btn-secondary text-sm">导出 TSV</button>
            <button onClick={() => exportTo('md')} className="btn-secondary text-sm">导出 Markdown</button>
          </div>

          <div className="overflow-auto border border-[#ebeef5] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f7fa]">
                  {workbook.sheets[activeSheet].headers.map((h, i) => (
                    <th key={i} className="px-4 py-2 text-left font-medium text-[#303133] border-b border-[#ebeef5] min-w-[100px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workbook.sheets[activeSheet].rows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f5f7fa]">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 border-b border-[#ebeef5] text-[#606266]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-[#909399]">
            {t('excelpreview.rows', { count: workbook.sheets[activeSheet].rows.length })}
          </div>
        </>
      )}
    </div>
  )
}
