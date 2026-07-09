import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MarkdownPreview() {
  const { t } = useTranslation()
  const [text, setText] = useState('# Hello Markdown\n\nThis is a **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3\n\n```js\nconsole.log("Hello World");\n```')

  const renderMarkdown = (md: string): string => {
    let html = md
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')

    html = html.replace(/<li>(.*?)<\/li>/g, (match) => `<ul class="list-disc pl-5">${match}</ul>`)
    html = html.replace(/<\/ul>\s*<ul>/g, '')

    return html
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('markdown.title')}</h2>
      <p className="text-gray-500 mb-6">{t('markdown.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('markdown.editor')}</label>
          <textarea
            className="w-full h-[500px] p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('markdown.preview')}</label>
          <div
            className="w-full h-[500px] p-4 border border-gray-200 rounded-lg overflow-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
          />
        </div>
      </div>
    </div>
  )
}
