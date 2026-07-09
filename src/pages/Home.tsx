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

const allTools: Tool[] = [
  // 精选工具 (8)
  { path: '/json', icon: '{ }', labelKey: 'json.title', descKey: 'json.desc', color: '#f5a623', category: 'featured' },
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: '#7b68ee', category: 'featured' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: '#e74c3c', category: 'featured' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: '#2ecc71', category: 'featured' },
  { path: '/color', icon: 'C', labelKey: 'color.title', descKey: 'color.desc', color: '#e91e63', category: 'featured' },
  { path: '/imgcompress', icon: 'IC', labelKey: 'imgcompress.title', descKey: 'imgcompress.desc', color: '#00bcd4', category: 'featured' },
  { path: '/markdown', icon: 'M', labelKey: 'markdown.title', descKey: 'markdown.desc', color: '#607d8b', category: 'featured' },
  { path: '/unit', icon: 'U', labelKey: 'unit.title', descKey: 'unit.desc', color: '#ff9800', category: 'featured' },

  // 图片工具 (12)
  { path: '/imgcompress', icon: 'IC', labelKey: 'imgcompress.title', descKey: 'imgcompress.desc', color: '#00bcd4', category: 'image' },
  { path: '/imgbase64', icon: 'IB', labelKey: 'imgbase64.title', descKey: 'imgbase64.desc', color: '#009688', category: 'image' },
  { path: '/colorpicker', icon: 'CP', labelKey: 'colorpicker.title', descKey: 'colorpicker.desc', color: '#9c27b0', category: 'image' },
  { path: '/drawboard', icon: 'DB', labelKey: 'drawboard.title', descKey: 'drawboard.desc', color: '#ff9800', category: 'image' },
  { path: '/imgresize', icon: 'IR', labelKey: 'imgreresize.title', descKey: 'imgreresize.desc', color: '#2196f3', category: 'image' },
  { path: '/imgfilter', icon: 'IF', labelKey: 'imgfilter.title', descKey: 'imgfilter.desc', color: '#e91e63', category: 'image' },
  { path: '/imginfo', icon: 'II', labelKey: 'imginfo.title', descKey: 'imginfo.desc', color: '#00bcd4', category: 'image' },
  { path: '/palette', icon: 'PA', labelKey: 'palette.title', descKey: 'palette.desc', color: '#673ab7', category: 'image' },
  { path: '/gradient', icon: 'GR', labelKey: 'gradient.title', descKey: 'gradient.desc', color: '#00bcd4', category: 'image' },
  { path: '/shadow', icon: 'SH', labelKey: 'shadow.title', descKey: 'shadow.desc', color: '#607d8b', category: 'image' },
  { path: '/hexcolor', icon: 'HC', labelKey: 'hexcolor.title', descKey: 'hexcolor.desc', color: '#9c27b0', category: 'image' },
  { path: '/base64img', icon: 'B64I', labelKey: 'base64img.title', descKey: 'base64img.desc', color: '#4caf50', category: 'image' },

  // 文本工具 (25)
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
  { path: '/textbinary', icon: '01', labelKey: 'textbinary.title', descKey: 'textbinary.desc', color: '#795548', category: 'text' },
  { path: '/texthex', icon: '0x', labelKey: 'texthex.title', descKey: 'texthex.desc', color: '#607d8b', category: 'text' },
  { path: '/textascii', icon: 'A', labelKey: 'textascii.title', descKey: 'textascii.desc', color: '#009688', category: 'text' },
  { path: '/textstats', icon: 'S', labelKey: 'textstats.title', descKey: 'textstats.desc', color: '#673ab7', category: 'text' },
  { path: '/textwrap', icon: 'TW', labelKey: 'textwrap.title', descKey: 'textwrap.desc', color: '#795548', category: 'text' },
  { path: '/linenumbers', icon: 'LN', labelKey: 'linenumbers.title', descKey: 'linenumbers.desc', color: '#607d8b', category: 'text' },
  { path: '/textcounter', icon: 'TC', labelKey: 'textcounter.title', descKey: 'textcounter.desc', color: '#009688', category: 'text' },
  { path: '/textcounteradv', icon: 'TC2', labelKey: 'textcounteradv.title', descKey: 'textcounteradv.desc', color: '#795548', category: 'text' },
  { path: '/texttransform', icon: 'TT', labelKey: 'texttransform.title', descKey: 'texttransform.desc', color: '#00bcd4', category: 'text' },
  { path: '/textdiff2', icon: 'TD', labelKey: 'textcompare.title', descKey: 'textcompare.desc', color: '#ff5722', category: 'text' },
  { path: '/textsort', icon: 'SO', labelKey: 'textsort.title', descKey: 'textsort.desc', color: '#009688', category: 'text' },
  { path: '/slug', icon: 'SL', labelKey: 'slug.title', descKey: 'slug.desc', color: '#607d8b', category: 'text' },
  { path: '/htmlencode', icon: 'H', labelKey: 'htmlencode.title', descKey: 'htmlencode.desc', color: '#ff5722', category: 'text' },
  { path: '/regextool', icon: 'RG', labelKey: 'regextool.title', descKey: 'regextool.desc', color: '#9c27b0', category: 'text' },

  // 数字工具 (12)
  { path: '/timestamp', icon: '#', labelKey: 'timestamp.title', descKey: 'timestamp.desc', color: '#9b59b6', category: 'number' },
  { path: '/numberbase', icon: '0b', labelKey: 'numberbase.title', descKey: 'numberbase.desc', color: '#8bc34a', category: 'number' },
  { path: '/random', icon: '?', labelKey: 'random.title', descKey: 'random.desc', color: '#e91e63', category: 'number' },
  { path: '/roman', icon: 'X', labelKey: 'roman.title', descKey: 'roman.desc', color: '#ff5722', category: 'number' },
  { path: '/numconvert', icon: 'NC', labelKey: 'numconvert.title', descKey: 'numconvert.desc', color: '#4caf50', category: 'number' },
  { path: '/fibonacci', icon: 'FI', labelKey: 'fibonacci.title', descKey: 'fibonacci.desc', color: '#67c23a', category: 'number' },
  { path: '/prime', icon: 'PR', labelKey: 'prime.title', descKey: 'prime.desc', color: '#e6a23c', category: 'number' },
  { path: '/gcdlcm', icon: 'GL', labelKey: 'gcdlcm.title', descKey: 'gcdlcm.desc', color: '#f56c6c', category: 'number' },
  { path: '/factorial', icon: '!', labelKey: 'factorial.title', descKey: 'factorial.desc', color: '#909399', category: 'number' },
  { path: '/numwords', icon: 'NW', labelKey: 'numwords.title', descKey: 'numwords.desc', color: '#9b59b6', category: 'number' },
  { path: '/numwords2', icon: 'NW2', labelKey: 'numwords2.title', descKey: 'numwords2.desc', color: '#e91e63', category: 'number' },
  { path: '/numconv2', icon: 'NC2', labelKey: 'numconv.title', descKey: 'numconv.desc', color: '#4caf50', category: 'number' },

  // 加密工具 (12)
  { path: '/base64', icon: 'B64', labelKey: 'base64.title', descKey: 'base64.desc', color: '#4caf50', category: 'encrypt' },
  { path: '/url', icon: '%', labelKey: 'url.title', descKey: 'url.desc', color: '#2196f3', category: 'encrypt' },
  { path: '/hash', icon: '#', labelKey: 'hash.title', descKey: 'hash.desc', color: '#2ecc71', category: 'encrypt' },
  { path: '/jwt', icon: 'J', labelKey: 'jwt.title', descKey: 'jwt.desc', color: '#8e44ad', category: 'encrypt' },
  { path: '/regex', icon: '.*', labelKey: 'regex.title', descKey: 'regex.desc', color: '#9c27b0', category: 'encrypt' },
  { path: '/textencrypt', icon: 'TE', labelKey: 'textencrypt.title', descKey: 'textencrypt.desc', color: '#f44336', category: 'encrypt' },
  { path: '/passwordstrength', icon: 'PS', labelKey: 'passwordstrength.title', descKey: 'passwordstrength.desc', color: '#e91e63', category: 'encrypt' },
  { path: '/uuid', icon: 'ID', labelKey: 'uuid.title', descKey: 'uuid.desc', color: '#00bcd4', category: 'encrypt' },
  { path: '/randomstr', icon: 'RS', labelKey: 'randomstr.title', descKey: 'randomstr.desc', color: '#ff9800', category: 'encrypt' },
  { path: '/base32', icon: 'B32', labelKey: 'base32.title', descKey: 'base32.desc', color: '#4caf50', category: 'encrypt' },
  { path: '/rot13', icon: 'R13', labelKey: 'rot13.title', descKey: 'rot13.desc', color: '#ff5722', category: 'encrypt' },
  { path: '/atbash', icon: 'AT', labelKey: 'atbash.title', descKey: 'atbash.desc', color: '#795548', category: 'encrypt' },

  // 数据图表 (3)
  { path: '/barchart', icon: 'BC', labelKey: 'barchart.title', descKey: 'barchart.desc', color: '#2196f3', category: 'chart' },
  { path: '/piechart', icon: 'PC', labelKey: 'piechart.title', descKey: 'piechart.desc', color: '#4caf50', category: 'chart' },
  { path: '/linechart', icon: 'LC', labelKey: 'linechart.title', descKey: 'linechart.desc', color: '#9c27b0', category: 'chart' },

  // 办公辅助 (14)
  { path: '/qrcode', icon: 'QR', labelKey: 'qrcode.title', descKey: 'qrcode.desc', color: '#7b68ee', category: 'office' },
  { path: '/password', icon: 'P', labelKey: 'password.title', descKey: 'password.desc', color: '#e74c3c', category: 'office' },
  { path: '/pomodoro', icon: 'T', labelKey: 'pomodoro.title', descKey: 'pomodoro.desc', color: '#e74c3c', category: 'office' },
  { path: '/coin', icon: '$', labelKey: 'coin.title', descKey: 'coin.desc', color: '#f39c12', category: 'office' },
  { path: '/csvjson', icon: 'CJ', labelKey: 'csvjson.title', descKey: 'csvjson.desc', color: '#3f51b5', category: 'office' },
  { path: '/jsonconvert', icon: 'JC', labelKey: 'jsonconverter.title', descKey: 'jsonconverter.desc', color: '#ff9800', category: 'office' },
  { path: '/jsonyaml', icon: 'JY', labelKey: 'jsonyaml.title', descKey: 'jsonyaml.desc', color: '#00bcd4', category: 'office' },
  { path: '/csvviewer', icon: 'CV', labelKey: 'csvviewer.title', descKey: 'csvviewer.desc', color: '#4caf50', category: 'office' },
  { path: '/jsontotable', icon: 'JT', labelKey: 'jsontotable.title', descKey: 'jsontotable.desc', color: '#2196f3', category: 'office' },
  { path: '/excelpreview', icon: 'EP', labelKey: 'excelpreview.title', descKey: 'excelpreview.desc', color: '#8bc34a', category: 'office' },
  { path: '/xmlconvert', icon: 'XC', labelKey: 'xmlconvert.title', descKey: 'xmlconvert.desc', color: '#ff5722', category: 'office' },
  { path: '/mdhtml', icon: 'MH', labelKey: 'mdhtml.title', descKey: 'mdhtml.desc', color: '#607d8b', category: 'office' },
  { path: '/csvtable', icon: 'CT', labelKey: 'csvtable.title', descKey: 'csvtable.desc', color: '#4caf50', category: 'office' },
  { path: '/cron', icon: 'CR', labelKey: 'cron.title', descKey: 'cron.desc', color: '#607d8b', category: 'office' },

  // 计算器 (7)
  { path: '/calculator', icon: 'CAL', labelKey: 'calculator.title', descKey: 'calculator.desc', color: '#303133', category: 'calc' },
  { path: '/percentage', icon: '%', labelKey: 'percentage.title', descKey: 'percentage.desc', color: '#409eff', category: 'calc' },
  { path: '/tip', icon: 'TP', labelKey: 'tip.title', descKey: 'tip.desc', color: '#67c23a', category: 'calc' },
  { path: '/bmi', icon: 'BM', labelKey: 'bmi.title', descKey: 'bmi.desc', color: '#409eff', category: 'calc' },
  { path: '/age', icon: 'AG', labelKey: 'age.title', descKey: 'age.desc', color: '#e6a23c', category: 'calc' },
  { path: '/loan', icon: 'LN', labelKey: 'loan.title', descKey: 'loan.desc', color: '#f56c6c', category: 'calc' },
  { path: '/unit', icon: 'U', labelKey: 'unit.title', descKey: 'unit.desc', color: '#ff9800', category: 'calc' },
]

const categorySections = [
  { key: 'featured', label: 'home.featured', color: '#409eff' },
  { key: 'text', label: 'home.text', color: '#1abc9c' },
  { key: 'number', label: 'home.number', color: '#9b59b6' },
  { key: 'encrypt', label: 'home.encrypt', color: '#4caf50' },
  { key: 'image', label: 'home.image', color: '#00bcd4' },
  { key: 'chart', label: 'home.chart', color: '#2196f3' },
  { key: 'office', label: 'home.office', color: '#e91e63' },
  { key: 'calc', label: 'home.calc', color: '#ff9800' },
]

export default function Home() {
  const { t } = useTranslation()
  const uniqueToolCount = new Set(allTools.map((tool) => tool.path)).size

  return (
    <div>
      <h3 className="banner-title">{t('home.motto')}</h3>

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
            <p>{uniqueToolCount}</p>
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
            <p>10K+</p>
            <p>{t('home.usageCount')}</p>
          </div>
        </div>
      </div>

      {categorySections.map((section) => {
        const sectionTools = allTools.filter((tool) => tool.category === section.key)
        if (sectionTools.length === 0) return null
        return (
          <div key={section.key} className="tool-section">
            <div className="section-header">
              <h3 style={{ color: section.color }}>{t(section.label)}</h3>
              <Link to={`/category/${section.key}`} className="more">{t('home.viewAll')}</Link>
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
