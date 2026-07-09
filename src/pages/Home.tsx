import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const tools = [
  { path: '/json', icon: '{ }', labelKey: 'json.title', descKey: 'json.desc', color: 'bg-amber-50 text-amber-600' },
  { path: '/base64', icon: 'B64', labelKey: 'base64.title', descKey: 'base64.desc', color: 'bg-green-50 text-green-600' },
  { path: '/url', icon: '🔗', labelKey: 'url.title', descKey: 'url.desc', color: 'bg-blue-50 text-blue-600' },
  { path: '/timestamp', icon: '⏱', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: 'bg-purple-50 text-purple-600' },
  { path: '/color', icon: '🎨', labelKey: 'color.title', descKey: 'color.desc', color: 'bg-pink-50 text-pink-600' },
  { path: '/diff', icon: '⇔', labelKey: 'diff.title', descKey: 'diff.desc', color: 'bg-cyan-50 text-cyan-600' },
  { path: '/regex', icon: '.*', labelKey: 'regex.title', descKey: 'regex.desc', color: 'bg-indigo-50 text-indigo-600' },
  { path: '/password', icon: '🔑', labelKey: 'password.title', descKey: 'password.desc', color: 'bg-red-50 text-red-600' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${tool.color}`}>
              {tool.icon}
            </div>
            <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {t(tool.labelKey)}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t(tool.descKey)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
