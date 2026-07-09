import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MarkdownHtml() {
  const { t } = useTranslation()
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [mode, setMode] = useState<'mdToHtml' | 'htmlToMd'>('mdToHtml')

  const mdToHtml = () => {
    let h = markdown
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '<br><br>')
    setHtml(h)
  }

  const htmlToMd = () => {
    let m = html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<code>(.*?)<\/code>/g, '`$1`')
      .replace(/<li>(.*?)<\/li>/g, '- $1')
      .replace(/<br\s*\/?>/g, '\n')
    setMarkdown(m)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('mdhtml.title')}</h2>
      <p className="text-[#909399] mb-6">{t('mdhtml.desc')}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('mdToHtml')} className={`tab-btn ${mode === 'mdToHtml' ? 'active' : ''}`}>Markdown → HTML</button>
        <button onClick={() => setMode('htmlToMd')} className={`tab-btn ${mode === 'htmlToMd' ? 'active' : ''}`}>HTML → Markdown</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">Markdown</label>
          <textarea className="input-field h-64 font-mono text-sm resize-y" value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
          {mode === 'mdToHtml' && <button onClick={mdToHtml} className="btn-primary mt-3">Markdown → HTML</button>}
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">HTML</label>
          <textarea className="input-field h-64 font-mono text-sm resize-y" value={html} onChange={(e) => setHtml(e.target.value)} />
          {mode === 'htmlToMd' && <button onClick={htmlToMd} className="btn-primary mt-3">HTML → Markdown</button>}
        </div>
      </div>
    </div>
  )
}
