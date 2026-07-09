import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const allTools = [
  { path: '/json', label: 'JSON 格式化' },
  { path: '/base64', label: 'Base64 编解码' },
  { path: '/url', label: 'URL 编解码' },
  { path: '/hash', label: '哈希生成' },
  { path: '/jwt', label: 'JWT 解析' },
  { path: '/regex', label: '正则表达式测试' },
  { path: '/password', label: '密码生成器' },
  { path: '/wordcount', label: '字数统计' },
  { path: '/case', label: '大小写转换' },
  { path: '/diff', label: '文本对比' },
  { path: '/textreplace', label: '文本替换' },
  { path: '/textreverse', label: '文本反转' },
  { path: '/removeempty', label: '删除空行' },
  { path: '/extract', label: '文本提取' },
  { path: '/wordfreq', label: '词频统计' },
  { path: '/unicode', label: 'Unicode 转换' },
  { path: '/morse', label: '摩尔斯电码' },
  { path: '/textsplit', label: '文本分割合并' },
  { path: '/markdown', label: 'Markdown 预览' },
  { path: '/timestamp', label: '时间戳转换' },
  { path: '/numberbase', label: '进制转换' },
  { path: '/random', label: '随机数生成' },
  { path: '/roman', label: '罗马数字' },
  { path: '/color', label: '颜色转换' },
  { path: '/colorpicker', label: '颜色吸取器' },
  { path: '/qrcode', label: '二维码生成' },
  { path: '/unit', label: '单位转换' },
  { path: '/pomodoro', label: '番茄钟' },
  { path: '/coin', label: '随机决策' },
  { path: '/imgcompress', label: '图片压缩' },
  { path: '/imgbase64', label: '图片 Base64' },
  { path: '/drawboard', label: '在线画板' },
  { path: '/imgresize', label: '图片裁切缩放' },
  { path: '/imgfilter', label: '图片滤镜' },
  { path: '/csvjson', label: 'CSV/JSON 转换' },
  { path: '/barchart', label: '柱状图' },
  { path: '/piechart', label: '饼图' },
  { path: '/linechart', label: '折线图' },
]

export default function Layout() {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof allTools>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      const results = allTools.filter((tool) =>
        tool.label.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectTool = (path: string) => {
    navigate(path)
    setSearchQuery('')
    setSearchResults([])
  }

  const toggleLang = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
            <path d="M8 10.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 19.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 28.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 37.5H40" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 19L8 24L16 29V19Z" fill="none" stroke="#444" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/" end className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.home')}</span>
          </NavLink>

          <NavLink to="/category/text" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <path d="M12 6H36V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 12V42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M18 42H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span>{t('nav.text')}</span>
          </NavLink>

          <NavLink to="/category/number" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <path d="M17 18H4V42H17V18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 6H17V42H30V6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M43 26H30V42H43V26Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.number')}</span>
          </NavLink>

          <NavLink to="/category/encrypt" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <rect x="8" y="20" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M16 20V14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span>{t('nav.encrypt')}</span>
          </NavLink>

          <NavLink to="/category/image" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
              <circle cx="17" cy="19" r="4" stroke="currentColor" strokeWidth="3"/>
              <path d="M6 32L16 24L24 30L34 20L42 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.image')}</span>
          </NavLink>

          <NavLink to="/category/chart" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <path d="M6 42V22H14V42H6Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 42V12H26V42H18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 42V6H38V42H30Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('nav.chart')}</span>
          </NavLink>

          <NavLink to="/category/office" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="3"/>
              <path d="M6 16H42" stroke="currentColor" strokeWidth="3"/>
              <path d="M16 6V16" stroke="currentColor" strokeWidth="3"/>
              <path d="M32 6V16" stroke="currentColor" strokeWidth="3"/>
            </svg>
            <span>{t('nav.office')}</span>
          </NavLink>

          <NavLink to="/category/unit" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <path d="M6 6H42V42H6V6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M6 18H42" stroke="currentColor" strokeWidth="3"/>
              <path d="M18 18V42" stroke="currentColor" strokeWidth="3"/>
            </svg>
            <span>{t('nav.unit')}</span>
          </NavLink>

          <NavLink to="/category/software" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
              <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="3"/>
              <path d="M6 18H42" stroke="currentColor" strokeWidth="3"/>
              <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
              <circle cx="22" cy="14" r="1.5" fill="currentColor"/>
            </svg>
            <span>{t('nav.software')}</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <div className="search-box" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  borderRadius: '4px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  marginTop: '5px',
                }}>
                  {searchResults.map((tool) => (
                    <div
                      key={tool.path}
                      onClick={() => handleSelectTool(tool.path)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderBottom: '1px solid #ebeef5',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f7fa')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                    >
                      {tool.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
