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
  // 精选工具
  { path: '/json', icon: '{ }', labelKey: 'json.title', descKey: 'json.desc', color: '#f5a623', category: 'home.featured' },
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: '#7b68ee', category: 'home.featured' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: '#e74c3c', category: 'home.featured' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: '#2ecc71', category: 'home.featured' },
  { path: '/color', icon: 'C', labelKey: 'color.title', descKey: 'color.desc', color: '#e91e63', category: 'home.featured' },
  { path: '/colorpicker', icon: 'CP', labelKey: 'colorpicker.title', descKey: 'colorpicker.desc', color: '#9c27b0', category: 'home.featured' },
  { path: '/imgcompress', icon: 'IC', labelKey: 'imgcompress.title', descKey: 'imgcompress.desc', color: '#00bcd4', category: 'home.featured' },
  { path: '/markdown', icon: 'M', labelKey: 'markdown.title', descKey: 'markdown.desc', color: '#607d8b', category: 'home.featured' },

  // 图片工具
  { path: '/imgcompress', icon: 'IC', labelKey: 'imgcompress.title', descKey: 'imgcompress.desc', color: '#00bcd4', category: 'home.image' },
  { path: '/imgbase64', icon: 'IB', labelKey: 'imgbase64.title', descKey: 'imgbase64.desc', color: '#009688', category: 'home.image' },
  { path: '/colorpicker', icon: 'CP', labelKey: 'colorpicker.title', descKey: 'colorpicker.desc', color: '#9c27b0', category: 'home.image' },
  { path: '/drawboard', icon: 'DB', labelKey: 'drawboard.title', descKey: 'drawboard.desc', color: '#ff9800', category: 'home.image' },
  { path: '/imgresize', icon: 'IR', labelKey: 'imgreresize.title', descKey: 'imgreresize.desc', color: '#2196f3', category: 'home.image' },
  { path: '/imgfilter', icon: 'IF', labelKey: 'imgfilter.title', descKey: 'imgfilter.desc', color: '#e91e63', category: 'home.image' },

  // 文档处理
  { path: '/markdown', icon: 'M', labelKey: 'markdown.title', descKey: 'markdown.desc', color: '#607d8b', category: 'home.docProcess' },

  // 文档转换
  { path: '/csvjson', icon: 'CJ', labelKey: 'csvjson.title', descKey: 'csvjson.desc', color: '#3f51b5', category: 'home.docConvert' },

  // 数据图表
  { path: '/barchart', icon: 'BC', labelKey: 'barchart.title', descKey: 'barchart.desc', color: '#2196f3', category: 'home.chart' },
  { path: '/piechart', icon: 'PC', labelKey: 'piechart.title', descKey: 'piechart.desc', color: '#4caf50', category: 'home.chart' },
  { path: '/linechart', icon: 'LC', labelKey: 'linechart.title', descKey: 'linechart.desc', color: '#9c27b0', category: 'home.chart' },

  // 办公辅助
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: '#7b68ee', category: 'home.office' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: '#e74c3c', category: 'home.office' },
  { path: '/timestamp', icon: '#', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: '#9b59b6', category: 'home.office' },
  { path: '/pomodoro', icon: 'T', labelKey: 'pomodoro.title', descKey: 'pomodoro.desc', color: '#e74c3c', category: 'home.office' },
  { path: '/coin', icon: '$', labelKey: 'coin.title', descKey: 'coin.desc', color: '#f39c12', category: 'home.office' },
  { path: '/jwt', icon: 'J', labelKey: 'jwt.title', descKey: 'jwt.desc', color: '#8e44ad', category: 'home.office' },

  // 文本工具
  { path: '/wordcount', icon: 'W', labelKey: 'wordcount.title', descKey: 'wordcount.desc', color: '#1abc9c', category: 'home.text' },
  { path: '/case', icon: 'Aa', labelKey: 'case.title', descKey: 'case.desc', color: '#e67e22', category: 'home.text' },
  { path: '/diff', icon: '<>', labelKey: 'diff.title', descKey: 'diff.desc', color: '#00bcd4', category: 'home.text' },
  { path: '/textreplace', icon: 'S>R', labelKey: 'textreplace.title', descKey: 'textreplace.desc', color: '#03a9f4', category: 'home.text' },
  { path: '/textreverse', icon: 'R', labelKey: 'textreverse.title', descKey: 'textreverse.desc', color: '#673ab7', category: 'home.text' },
  { path: '/removeempty', icon: '-+', labelKey: 'removeempty.title', descKey: 'removeempty.desc', color: '#4caf50', category: 'home.text' },
  { path: '/extract', icon: 'E', labelKey: 'textextract.title', descKey: 'textextract.desc', color: '#f44336', category: 'home.text' },
  { path: '/wordfreq', icon: 'F', labelKey: 'wordfreq.title', descKey: 'wordfreq.desc', color: '#3f51b5', category: 'home.text' },
  { path: '/unicode', icon: 'U+', labelKey: 'unicode.title', descKey: 'unicode.desc', color: '#00bcd4', category: 'home.text' },
  { path: '/morse', icon: '..', labelKey: 'morse.title', descKey: 'morse.desc', color: '#4caf50', category: 'home.text' },
  { path: '/textsplit', icon: 'TS', labelKey: 'textsplit.title', descKey: 'textsplit.desc', color: '#ff9800', category: 'home.text' },

  // 数字工具
  { path: '/timestamp', icon: '#', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: '#9b59b6', category: 'home.number' },
  { path: '/numberbase', icon: '0b', labelKey: 'numberbase.title', descKey: 'numberbase.desc', color: '#8bc34a', category: 'home.number' },
  { path: '/random', icon: '?', labelKey: 'random.title', descKey: 'random.desc', color: '#e91e63', category: 'home.number' },
  { path: '/roman', icon: 'X', labelKey: 'roman.title', descKey: 'roman.desc', color: '#ff5722', category: 'home.number' },

  // 加密工具
  { path: '/base64', icon: 'B64', labelKey: 'base64.title', descKey: 'base64.desc', color: '#4caf50', category: 'home.encrypt' },
  { path: '/url', icon: '%', labelKey: 'url.title', descKey: 'url.desc', color: '#2196f3', category: 'home.encrypt' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: '#2ecc71', category: 'home.encrypt' },

  // 单位转换
  { path: '/unit', icon: 'U', labelKey: 'unit.title', descKey: 'unit.desc', color: '#ff9800', category: 'home.unit' },
]

const categorySections = [
  { key: 'home.featured', color: '#409eff' },
  { key: 'home.image', color: '#00bcd4' },
  { key: 'home.docProcess', color: '#607d8b' },
  { key: 'home.docConvert', color: '#3f51b5' },
  { key: 'home.chart', color: '#2196f3' },
  { key: 'home.office', color: '#e91e63' },
  { key: 'home.text', color: '#1abc9c' },
  { key: 'home.number', color: '#9b59b6' },
  { key: 'home.encrypt', color: '#4caf50' },
  { key: 'home.unit', color: '#ff9800' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Banner Title */}
      <h3 className="banner-title">{t('home.motto')}</h3>

      {/* Stats */}
      <div className="banner-stats">
        <div className="stat-card">
          <div className="icon blue">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="12" width="36" height="30" rx="2" fill="#409eff" stroke="#409eff" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M17.9497 24.0083H29.9497" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 13L13 5H35L42 13" stroke="#409eff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text">
            <p>{tools.length}</p>
            <p>{t('home.toolCount')}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon red">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="#f56c6c" stroke="#f56c6c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text">
            <p>1000+</p>
            <p>{t('home.usageCount')}</p>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {categorySections.map((section) => {
        const sectionTools = tools.filter((tool) => tool.category === section.key)
        if (sectionTools.length === 0) return null
        return (
          <div key={section.key} className="tool-section">
            <div className="section-header">
              <h3 style={{ color: section.color }}>{t(section.key)}</h3>
              <a className="more">{t('home.viewAll')}</a>
            </div>
            <div className="tool-grid">
              {sectionTools.slice(0, 8).map((tool) => (
                <Link key={`${section.key}-${tool.path}`} to={tool.path} className="tool-card">
                  <div className="card-icon" style={{ background: tool.color }}>
                    {tool.icon}
                  </div>
                  <div className="card-info">
                    <h4>{t(tool.labelKey)}</h4>
                    <p>{t(tool.descKey)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
