import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Tool {
  path: string
  icon: string
  labelKey: string
  descKey: string
  color: string
  category: string
}

const allTools: Tool[] = [
  // 文本工具
  { path: '/wordcount', icon: 'W', labelKey: 'wordcount.title', descKey: 'wordcount.desc', color: '#1abc9c', category: 'text' },
  { path: '/case', icon: 'Aa', labelKey: 'case.title', descKey: 'case.desc', color: '#e67e22', category: 'text' },
  { path: '/diff', icon: '<>', labelKey: 'diff.title', descKey: 'diff.desc', color: '#00bcd4', category: 'text' },
  { path: '/textreplace', icon: 'S>R', labelKey: 'textreplace.title', descKey: 'textreplace.desc', color: '#03a9f4', category: 'text' },
  { path: '/textreverse', icon: 'R', labelKey: 'textreverse.title', descKey: 'textreverse.desc', color: '#673ab7', category: 'text' },
  { path: '/removeempty', icon: '-+', labelKey: 'removeempty.title', descKey: 'removeempty.desc', color: '#4caf50', category: 'text' },
  { path: '/extract', icon: 'E', labelKey: 'textextract.title', descKey: 'textextract.desc', color: '#f44336', category: 'text' },
  { path: '/wordfreq', icon: 'F', labelKey: 'wordfreq.title', descKey: 'wordfreq.desc', color: '#3f51b5', category: 'text' },
  { path: '/unicode', icon: 'U+', labelKey: 'unicode.title', descKey: 'unicode.desc', color: '#00bcd4', category: 'text' },
  { path: '/morse', icon: '..', labelKey: 'morse.title', descKey: 'morse.desc', color: '#4caf50', category: 'text' },
  { path: '/textsplit', icon: 'TS', labelKey: 'textsplit.title', descKey: 'textsplit.desc', color: '#ff9800', category: 'text' },
  { path: '/markdown', icon: 'M', labelKey: 'markdown.title', descKey: 'markdown.desc', color: '#607d8b', category: 'text' },
  { path: '/json', icon: '{ }', labelKey: 'json.title', descKey: 'json.desc', color: '#f5a623', category: 'text' },
  { path: '/textbinary', icon: '01', labelKey: 'textbinary.title', descKey: 'textbinary.desc', color: '#795548', category: 'text' },
  { path: '/texthex', icon: '0x', labelKey: 'texthex.title', descKey: 'texthex.desc', color: '#607d8b', category: 'text' },
  { path: '/textascii', icon: 'A', labelKey: 'textascii.title', descKey: 'textascii.desc', color: '#009688', category: 'text' },
  { path: '/textstats', icon: 'S', labelKey: 'textstats.title', descKey: 'textstats.desc', color: '#673ab7', category: 'text' },

  // 数字工具
  { path: '/timestamp', icon: '#', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: '#9b59b6', category: 'number' },
  { path: '/numberbase', icon: '0b', labelKey: 'numberbase.title', descKey: 'numberbase.desc', color: '#8bc34a', category: 'number' },
  { path: '/random', icon: '?', labelKey: 'random.title', descKey: 'random.desc', color: '#e91e63', category: 'number' },
  { path: '/roman', icon: 'X', labelKey: 'roman.title', descKey: 'roman.desc', color: '#ff5722', category: 'number' },
  { path: '/numconvert', icon: 'NC', labelKey: 'numconvert.title', descKey: 'numconvert.desc', color: '#4caf50', category: 'number' },

  // 加密工具
  { path: '/base64', icon: 'B64', labelKey: 'base64.title', descKey: 'base64.desc', color: '#4caf50', category: 'encrypt' },
  { path: '/url', icon: '%', labelKey: 'url.title', descKey: 'url.desc', color: '#2196f3', category: 'encrypt' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: '#2ecc71', category: 'encrypt' },
  { path: '/jwt', icon: 'J', labelKey: 'jwt.title', descKey: 'jwt.desc', color: '#8e44ad', category: 'encrypt' },
  { path: '/regex', icon: '.*', labelKey: 'regex.title', descKey: 'regex.desc', color: '#9c27b0', category: 'encrypt' },
  { path: '/textencrypt', icon: 'TE', labelKey: 'textencrypt.title', descKey: 'textencrypt.desc', color: '#f44336', category: 'encrypt' },
  { path: '/passwordstrength', icon: 'PS', labelKey: 'passwordstrength.title', descKey: 'passwordstrength.desc', color: '#e91e63', category: 'encrypt' },

  // 图片工具
  { path: '/imgcompress', icon: 'IC', labelKey: 'imgcompress.title', descKey: 'imgcompress.desc', color: '#00bcd4', category: 'image' },
  { path: '/imgbase64', icon: 'IB', labelKey: 'imgbase64.title', descKey: 'imgbase64.desc', color: '#009688', category: 'image' },
  { path: '/colorpicker', icon: 'CP', labelKey: 'colorpicker.title', descKey: 'colorpicker.desc', color: '#9c27b0', category: 'image' },
  { path: '/drawboard', icon: 'DB', labelKey: 'drawboard.title', descKey: 'drawboard.desc', color: '#ff9800', category: 'image' },
  { path: '/imgresize', icon: 'IR', labelKey: 'imgreresize.title', descKey: 'imgreresize.desc', color: '#2196f3', category: 'image' },
  { path: '/imgfilter', icon: 'IF', labelKey: 'imgfilter.title', descKey: 'imgfilter.desc', color: '#e91e63', category: 'image' },
  { path: '/color', icon: 'C', labelKey: 'color.title', descKey: 'color.desc', color: '#e91e63', category: 'image' },

  // 数据图表
  { path: '/barchart', icon: 'BC', labelKey: 'barchart.title', descKey: 'barchart.desc', color: '#2196f3', category: 'chart' },
  { path: '/piechart', icon: 'PC', labelKey: 'piechart.title', descKey: 'piechart.desc', color: '#4caf50', category: 'chart' },
  { path: '/linechart', icon: 'LC', labelKey: 'linechart.title', descKey: 'linechart.desc', color: '#9c27b0', category: 'chart' },

  // 办公辅助
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: '#7b68ee', category: 'office' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: '#e74c3c', category: 'office' },
  { path: '/pomodoro', icon: 'T', labelKey: 'pomodoro.title', descKey: 'pomodoro.desc', color: '#e74c3c', category: 'office' },
  { path: '/coin', icon: '$', labelKey: 'coin.title', descKey: 'coin.desc', color: '#f39c12', category: 'office' },
  { path: '/csvjson', icon: 'CJ', labelKey: 'csvjson.title', descKey: 'csvjson.desc', color: '#3f51b5', category: 'office' },
  { path: '/jsonconvert', icon: 'JC', labelKey: 'jsonconverter.title', descKey: 'jsonconverter.desc', color: '#ff9800', category: 'office' },
  { path: '/jsonyaml', icon: 'JY', labelKey: 'jsonyaml.title', descKey: 'jsonyaml.desc', color: '#00bcd4', category: 'office' },

  // 单位转换
  { path: '/unit', icon: 'U', labelKey: 'unit.title', descKey: 'unit.desc', color: '#ff9800', category: 'unit' },
]

const categoryInfo: Record<string, { labelKey: string; color: string }> = {
  text: { labelKey: 'home.text', color: '#1abc9c' },
  number: { labelKey: 'home.number', color: '#9b59b6' },
  encrypt: { labelKey: 'home.encrypt', color: '#4caf50' },
  image: { labelKey: 'home.image', color: '#00bcd4' },
  chart: { labelKey: 'home.chart', color: '#2196f3' },
  office: { labelKey: 'home.office', color: '#e91e63' },
  unit: { labelKey: 'home.unit', color: '#ff9800' },
}

export default function CategoryPage() {
  const { id } = useParams()
  const { t } = useTranslation()

  const categoryTools = allTools.filter((tool) => tool.category === id)
  const info = categoryInfo[id || ''] || { labelKey: 'home.featured', color: '#409eff' }

  return (
    <div>
      <div className="tool-section">
        <div className="section-header">
          <h3 style={{ color: info.color }}>{t(info.labelKey)}</h3>
          <span style={{ color: '#909399', fontSize: '14px' }}>共 {categoryTools.length} 个工具</span>
        </div>
        <div className="tool-grid">
          {categoryTools.map((tool) => (
            <Link key={tool.path} to={tool.path} className="tool-card">
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
    </div>
  )
}
