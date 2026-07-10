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
  { path: '/software', label: '电脑必备软件' },
]

const navItems = [
  { path: '/', labelKey: 'nav.home', icon: 'M9 18V42H39V18L24 6L9 18Z M19 29V42H29V29H19Z M9 42H39' },
  { path: '/category/text', labelKey: 'nav.text', icon: 'M12 6H36V12 M24 12V42 M18 42H30' },
  { path: '/category/number', labelKey: 'nav.number', icon: 'M17 18H4V42H17V18Z M30 6H17V42H30V6Z M43 26H30V42H43V26Z' },
  { path: '/category/encrypt', labelKey: 'nav.encrypt', icon: 'M8 20V42H40V20H8Z M16 20V14C16 9.6 19.6 6 24 6C28.4 6 32 9.6 32 14V20' },
  { path: '/category/image', labelKey: 'nav.image', icon: 'M6 8H42V40H6V8Z M17 19C19.2 19 21 17.2 21 15S19.2 11 17 11 13 12.8 13 15 14.8 19 17 19Z M6 32L16 24L24 30L34 20L42 28' },
  { path: '/category/chart', labelKey: 'nav.chart', icon: 'M6 42V22H14V42H6Z M18 42V12H26V42H18Z M30 42V6H38V42H30Z' },
  { path: '/category/office', labelKey: 'nav.office', icon: 'M6 6H42V42H6V6Z M6 16H42 M16 6V16 M32 6V16' },
  { path: '/category/unit', labelKey: 'nav.unit', icon: 'M6 6H42V42H6V6Z M6 18H42 M18 18V42' },
  { path: '/category/dev', labelKey: 'nav.dev', icon: 'M16 6L4 18L16 30 M32 6L44 18L32 30 M28 4L20 44' },
  { path: '/category/software', labelKey: 'nav.software', icon: 'M6 10H42V38H6V10Z M6 18H42 M12 14A1.5 1.5 0 1 0 12 17A1.5 1.5 0 1 0 12 14Z M17 14A1.5 1.5 0 1 0 17 17A1.5 1.5 0 1 0 17 14Z M22 14A1.5 1.5 0 1 0 22 17A1.5 1.5 0 1 0 22 14Z' },
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
    setSidebarOpen(false)
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
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
              <path d="M8 10.5H40" stroke="#409eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 19.5H40" stroke="#409eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 28.5H40" stroke="#409eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 37.5H40" stroke="#409eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 19L8 24L16 29V19Z" fill="#409eff" stroke="#409eff" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-[#303133] text-lg hidden sm:block">{t('title')}</span>
          </NavLink>
        </div>

        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 48 48" fill="none" width="20" height="20">
                <path d={item.icon} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="main-header">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 mr-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {sidebarOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>

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
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  marginTop: '8px',
                }}>
                  {searchResults.map((tool) => (
                    <div
                      key={tool.path}
                      onClick={() => handleSelectTool(tool.path)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderBottom: '1px solid #f5f7fa',
                        transition: 'background 0.2s',
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
            <button onClick={toggleLang} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
