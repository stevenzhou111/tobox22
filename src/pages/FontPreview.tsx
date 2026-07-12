import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FontPreview() {
  const { t } = useTranslation()
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog')
  const [fontSize, setFontSize] = useState(24)

  const fonts = [
    { name: 'Arial', family: 'Arial, sans-serif' },
    { name: 'Helvetica', family: 'Helvetica, Arial, sans-serif' },
    { name: 'Times New Roman', family: '"Times New Roman", Times, serif' },
    { name: 'Georgia', family: 'Georgia, serif' },
    { name: 'Courier New', family: '"Courier New", Courier, monospace' },
    { name: 'Verdana', family: 'Verdana, sans-serif' },
    { name: 'Trebuchet MS', family: '"Trebuchet MS", sans-serif' },
    { name: 'Impact', family: 'Impact, sans-serif' },
    { name: 'Comic Sans MS', family: '"Comic Sans MS", cursive' },
    { name: 'system-ui', family: 'system-ui, sans-serif' },
    { name: '-apple-system', family: '-apple-system, BlinkMacSystemFont, sans-serif' },
    { name: 'monospace', family: 'monospace' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('fontpreview.title')}</h2>
      <p className="text-[#909399] mb-6">{t('fontpreview.desc')}</p>

      <input className="input-field mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('fontpreview.placeholder')} />

      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm text-[#909399]">{t('fontpreview.size')}: {fontSize}px</label>
        <input type="range" min="12" max="72" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="flex-1" />
      </div>

      <div className="space-y-4">
        {fonts.map((font) => (
          <div key={font.name} className="bg-white border border-[#e5e7eb] rounded-lg p-4">
            <div className="text-xs text-[#909399] mb-2">{font.name}</div>
            <div style={{ fontFamily: font.family, fontSize: `${fontSize}px` }} className="break-all">
              {text || 'The quick brown fox jumps over the lazy dog'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
