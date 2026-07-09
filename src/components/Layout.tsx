import { Outlet, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const categories = [
  { key: 'nav.video', path: '/category/video' },
  { key: 'nav.audio', path: '/category/audio' },
  { key: 'nav.image', path: '/category/image' },
  { key: 'nav.docProcess', path: '/category/doc-process' },
  { key: 'nav.docConvert', path: '/category/doc-convert' },
  { key: 'nav.chart', path: '/category/chart' },
  { key: 'nav.office', path: '/category/office' },
  { key: 'nav.text', path: '/category/text' },
  { key: 'nav.number', path: '/category/number' },
  { key: 'nav.encrypt', path: '/category/encrypt' },
  { key: 'nav.unit', path: '/category/unit' },
]

export default function Layout() {
  const { i18n, t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rankOpen, setRankOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(true)

  const toggleLang = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M8 10.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 19.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 28.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 37.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 19L8 24L16 29V19Z" fill="none" stroke="#444" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>

        <nav className="sidebar-menu">
          {/* Home */}
          <NavLink to="/" end className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.home')}</span>
          </NavLink>

          {/* Rankings */}
          <div className="menu-submenu">
            <div className="submenu-title" onClick={() => setRankOpen(!rankOpen)}>
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M17 18H4V42H17V18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 6H17V42H30V6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M43 26H30V42H43V26Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t('nav.rankings')}</span>
              <svg className={`arrow ${rankOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            {rankOpen && (
              <div className="submenu-list" style={{ position: 'absolute', left: '100%', top: 0, zIndex: 100 }}>
                <a href="/rank/new">{t('nav.rankNew')}</a>
                <a href="/rank/hot">{t('nav.rankHot')}</a>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="menu-submenu">
            <div className="submenu-title" onClick={() => setCatOpen(!catOpen)}>
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
              </svg>
              <span>{t('nav.categories')}</span>
              <svg className={`arrow ${catOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            {catOpen && (
              <div className="submenu-list" style={{ position: 'absolute', left: '100%', top: 0, zIndex: 100, maxHeight: '400px', overflowY: 'auto' }}>
                {categories.map((cat) => (
                  <NavLink key={cat.key} to={cat.path} className={({ isActive }) => isActive ? 'text-blue-500' : ''}>
                    {t(cat.key)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Favorites */}
          <a href="/favorites" className="menu-item">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.favorites')}</span>
          </a>

          {/* Pricing */}
          <a href="/pricing" className="menu-item">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M4.50326 16.3661L12.5158 7.67177C12.909 7.2452 13.4807 7 14.0821 7H33.9179C34.5193 7 35.091 7.2452 35.4842 7.67177L43.4967 16.3661C44.1809 17.1084 44.1659 18.2125 43.4618 18.9383L24.7499 40.1499C24.3518 40.6012 23.6482 40.6012 23.2501 40.1499L4.5382 18.9383C3.83415 18.2125 3.81915 17.1084 4.50326 16.3661Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 20L24 29L32 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.pricing')}</span>
          </a>

          {/* Client */}
          <a href="#" className="menu-item">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="19" y="32" width="10" height="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="5" y="8" width="38" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M22 27H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 41L34 41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.client')}</span>
          </a>
        </nav>
      </aside>

      {/* Main */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <div className="search-box">
              <input type="text" placeholder={t('nav.search')} />
            </div>
          </div>

          <div className="header-center">
            <a href="/pricing" className="tag-btn danger">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M4.50326 16.3661L12.5158 7.67177C12.909 7.2452 13.4807 7 14.0821 7H33.9179C34.5193 7 35.091 7.2452 35.4842 7.67177L43.4967 16.3661C44.1809 17.1084 44.1659 18.2125 43.4618 18.9383L24.7499 40.1499C24.3518 40.6012 23.6482 40.6012 23.2501 40.1499L4.5382 18.9383C3.83415 18.2125 3.81915 17.1084 4.50326 16.3661Z" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 20L24 29L32 20" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              &nbsp;{t('nav.member')}
            </a>
            <a href="#" className="tag-btn danger">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="19" y="32" width="10" height="9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="8" width="38" height="24" rx="2" fill="none" stroke="#fff" strokeWidth="3"/>
                <path d="M22 27H26" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 41L34 41" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              &nbsp;{t('nav.download')}
            </a>
          </div>

          <div className="header-right">
            <button onClick={toggleLang} className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50">
              {t('switchLang')}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-90 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
