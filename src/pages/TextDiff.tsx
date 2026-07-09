import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  text: string
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  const result: DiffLine[] = []

  const maxLen = Math.max(oldLines.length, newLines.length)
  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i]
    const newLine = newLines[i]

    if (oldLine === undefined) {
      result.push({ type: 'added', text: newLine })
    } else if (newLine === undefined) {
      result.push({ type: 'removed', text: oldLine })
    } else if (oldLine === newLine) {
      result.push({ type: 'unchanged', text: oldLine })
    } else {
      result.push({ type: 'removed', text: oldLine })
      result.push({ type: 'added', text: newLine })
    }
  }

  return result
}

export default function TextDiff() {
  const { t } = useTranslation()
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null)

  const handleDiff = () => {
    setDiffResult(computeDiff(left, right))
  }

  const colors = {
    added: 'bg-green-50 text-green-900 border-l-4 border-green-400',
    removed: 'bg-red-50 text-red-900 border-l-4 border-red-400',
    unchanged: 'bg-gray-50 text-gray-600 border-l-4 border-transparent',
  }

  return (
    <div>
      <ToolHeader title={t('diff.title')} desc={t('diff.desc')} />

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('diff.added')} ({t('input')})</label>
            <textarea
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              placeholder={t('diff.leftPlaceholder')}
              className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('diff.removed')} ({t('input')})</label>
            <textarea
              value={right}
              onChange={(e) => setRight(e.target.value)}
              placeholder={t('diff.rightPlaceholder')}
              className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <button onClick={handleDiff} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
          {t('diff.diffResult')}
        </button>

        {diffResult !== null && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {diffResult.length === 0 || diffResult.every(d => d.type === 'unchanged') ? (
              <div className="p-4 text-center text-gray-500 bg-gray-50">{t('diff.noDiff')}</div>
            ) : (
              <div className="font-mono text-sm">
                {diffResult.map((line, i) => (
                  <div key={i} className={`px-4 py-1.5 ${colors[line.type]}`}>
                    <span className="inline-block w-6 text-gray-400 select-none">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
