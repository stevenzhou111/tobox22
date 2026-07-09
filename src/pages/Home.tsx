import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Tool {
  path: string
  icon: string
  labelKey: string
  descKey: string
  color: string
  category: string
}

const tools: Tool[] = [
  // 开发工具
  { path: '/json', icon: '{ }', labelKey: 'json.title', descKey: 'json.desc', color: 'bg-amber-500', category: 'home.cat.dev' },
  { path: '/base64', icon: 'B64', labelKey: 'base64.title', descKey: 'base64.desc', color: 'bg-emerald-500', category: 'home.cat.dev' },
  { path: '/url', icon: '%', labelKey: 'url.title', descKey: 'url.desc', color: 'bg-blue-500', category: 'home.cat.dev' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: 'bg-rose-500', category: 'home.cat.dev' },
  { path: '/jwt', icon: 'J', labelKey: 'jwt.title', descKey: 'jwt.desc', color: 'bg-violet-500', category: 'home.cat.dev' },
  { path: '/regex', icon: '.*', labelKey: 'regex.title', descKey: 'regex.desc', color: 'bg-indigo-500', category: 'home.cat.dev' },

  // 文本工具
  { path: '/wordcount', icon: 'W', labelKey: 'wordcount.title', descKey: 'wordcount.desc', color: 'bg-teal-500', category: 'home.cat.text' },
  { path: '/case', icon: 'Aa', labelKey: 'case.title', descKey: 'case.desc', color: 'bg-orange-500', category: 'home.cat.text' },
  { path: '/diff', icon: '<>', labelKey: 'diff.title', descKey: 'diff.desc', color: 'bg-cyan-500', category: 'home.cat.text' },
  { path: '/textreplace', icon: 'S>R', labelKey: 'textreplace.title', descKey: 'textreplace.desc', color: 'bg-sky-500', category: 'home.cat.text' },
  { path: '/textreverse', icon: 'R', labelKey: 'textreverse.title', descKey: 'textreverse.desc', color: 'bg-violet-500', category: 'home.cat.text' },
  { path: '/removeempty', icon: '-+', labelKey: 'removeempty.title', descKey: 'removeempty.desc', color: 'bg-emerald-500', category: 'home.cat.text' },
  { path: '/extract', icon: 'E', labelKey: 'textextract.title', descKey: 'textextract.desc', color: 'bg-red-500', category: 'home.cat.text' },
  { path: '/wordfreq', icon: 'F', labelKey: 'wordfreq.title', descKey: 'wordfreq.desc', color: 'bg-indigo-500', category: 'home.cat.text' },
  { path: '/unicode', icon: 'U+', labelKey: 'unicode.title', descKey: 'unicode.desc', color: 'bg-cyan-500', category: 'home.cat.text' },
  { path: '/morse', icon: '..', labelKey: 'morse.title', descKey: 'morse.desc', color: 'bg-emerald-500', category: 'home.cat.text' },
  { path: '/markdown', icon: 'M', labelKey: 'markdown.title', descKey: 'markdown.desc', color: 'bg-slate-500', category: 'home.cat.text' },

  // 数字工具
  { path: '/timestamp', icon: '#', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: 'bg-purple-500', category: 'home.cat.number' },
  { path: '/numberbase', icon: '0b', labelKey: 'numberbase.title', descKey: 'numberbase.desc', color: 'bg-lime-500', category: 'home.cat.number' },
  { path: '/random', icon: '?', labelKey: 'random.title', descKey: 'random.desc', color: 'bg-fuchsia-500', category: 'home.cat.number' },
  { path: '/roman', icon: 'X', labelKey: 'roman.title', descKey: 'roman.desc', color: 'bg-amber-500', category: 'home.cat.number' },

  // 实用工具
  { path: '/color', icon: 'C', labelKey: 'color.title', descKey: 'color.desc', color: 'bg-pink-500', category: 'home.cat.utils' },
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: 'bg-slate-500', category: 'home.cat.utils' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: 'bg-red-500', category: 'home.cat.utils' },
  { path: '/unit', icon: 'U', labelKey: 'unit.title', descKey: 'unit.desc', color: 'bg-amber-500', category: 'home.cat.utils' },
  { path: '/pomodoro', icon: 'T', labelKey: 'pomodoro.title', descKey: 'pomodoro.desc', color: 'bg-red-500', category: 'home.cat.utils' },
  { path: '/coin', icon: '$', labelKey: 'coin.title', descKey: 'coin.desc', color: 'bg-yellow-500', category: 'home.cat.utils' },
]

const categories = [
  { key: 'home.cat.dev', color: 'text-blue-600' },
  { key: 'home.cat.text', color: 'text-emerald-600' },
  { key: 'home.cat.number', color: 'text-purple-600' },
  { key: 'home.cat.utils', color: 'text-pink-600' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">{t('title')}</h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* Categories */}
      {categories.map((cat) => {
        const categoryTools = tools.filter((tool) => tool.category === cat.key)
        if (categoryTools.length === 0) return null
        return (
          <div key={cat.key} className="mb-10">
            <h2 className={`category-label ${cat.color} text-base font-bold`}>{t(cat.key)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="tool-card">
                  <div className={`tool-icon ${tool.color} text-white`}>
                    {tool.icon}
                  </div>
                  <div className="tool-title">{t(tool.labelKey)}</div>
                  <div className="tool-desc">{t(tool.descKey)}</div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
