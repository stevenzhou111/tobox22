import { Outlet, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Layout() {
  const { i18n, t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLang = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  const navCategories = [
    { key: 'nav.categories.dev', items: [
      { path: '/json', label: 'json.title' },
      { path: '/base64', label: 'base64.title' },
      { path: '/url', label: 'url.title' },
      { path: '/hash', label: 'hash.title' },
      { path: '/jwt', label: 'jwt.title' },
    ]},
    { key: 'nav.categories.text', items: [
      { path: '/wordcount', label: 'wordcount.title' },
      { path: '/case', label: 'case.title' },
      { path: '/diff', label: 'diff.title' },
      { path: '/regex', label: 'regex.title' },
      { path: '/replace', label: 'textreplace.title' },
    ]},
    { key: 'nav.categories.number', items: [
      { path: '/timestamp', label: 'timestamp.title' },
      { path: '/numberbase', label: 'numberbase.title' },
      { path: '/random', label: 'random.title' },
      { path: '/roman', label: 'roman.title' },
    ]},
    { key: 'nav.categories.tools', items: [
      { path: '/color', label: 'color.title' },
      { path: '/qrcode', label: 'qrcode.title' },
      { path: '/password', label: 'password.title' },
      { path: '/unit', label: 'unit.title' },
      { path: '/markdown', label: 'markdown.title' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--header-bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TB</span>
              </div>
              <span className="font-bold text-lg text-[var(--text)] hidden sm:block">{t('title')}</span>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navCategories.map((cat) => (
                <div key={cat.key} className="relative group">
                  <button className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors flex items-center gap-1">
                    {t(cat.key)}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                    <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] py-2 min-w-[180px]">
                      {cat.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--text)] transition-colors"
                        >
                          {t(item.label)}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
            >
              {t('switchLang')}
            </button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-white">
            <div className="p-4 space-y-4">
              {navCategories.map((cat) => (
                <div key={cat.key}>
                  <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                    {t(cat.key)}
                  </div>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg)] rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(item.label)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
