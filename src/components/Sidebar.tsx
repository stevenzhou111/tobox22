import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  onNavigate?: () => void
}

const tools = [
  { path: '/json', icon: '{ }', labelKey: 'json.title' },
  { path: '/base64', icon: 'B64', labelKey: 'base64.title' },
  { path: '/url', icon: '🔗', labelKey: 'url.title' },
  { path: '/timestamp', icon: '⏱', labelKey: 'timestamp.title' },
  { path: '/color', icon: '🎨', labelKey: 'color.title' },
  { path: '/diff', icon: '⇔', labelKey: 'diff.title' },
  { path: '/regex', icon: '.*', labelKey: 'regex.title' },
  { path: '/password', icon: '🔑', labelKey: 'password.title' },
]

export default function Sidebar({ onNavigate }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-gray-200 shrink-0">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-gray-800" onClick={onNavigate}>
          <span className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center text-sm font-bold">TB</span>
          {t('title')}
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
          onClick={onNavigate}
        >
          <span className="w-6 text-center text-xs">🏠</span>
          {t('home')}
        </NavLink>

        <div className="pt-2 pb-1 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
          {t('tools')}
        </div>

        {tools.map((tool) => (
          <NavLink
            key={tool.path}
            to={tool.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={onNavigate}
          >
            <span className="w-6 text-center text-xs font-mono">{tool.icon}</span>
            {t(tool.labelKey)}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
