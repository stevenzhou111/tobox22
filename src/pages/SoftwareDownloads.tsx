import { useTranslation } from 'react-i18next'

interface Software {
  name: string
  desc: string
  icon: string
  category: string
  downloads: { label: string; url: string }[]
}

const softwareList: Software[] = [
  { name: 'Visual Studio Code', desc: '轻量级代码编辑器', icon: 'VS', category: 'dev', downloads: [
    { label: 'Windows', url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user' },
    { label: 'macOS', url: 'https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal' },
    { label: 'Linux', url: 'https://code.visualstudio.com/sha/download?build=stable&os=linux-x64-deb' },
  ]},
  { name: 'Google Chrome', desc: '快速安全的浏览器', icon: 'GC', category: 'browser', downloads: [
    { label: 'Windows', url: 'https://www.google.com/chrome/' },
    { label: 'macOS', url: 'https://www.google.com/chrome/' },
    { label: 'Linux', url: 'https://www.google.com/chrome/' },
  ]},
  { name: 'Mozilla Firefox', desc: '隐私保护浏览器', icon: 'FF', category: 'browser', downloads: [
    { label: 'Windows', url: 'https://www.mozilla.org/firefox/download/' },
    { label: 'macOS', url: 'https://www.mozilla.org/firefox/download/' },
    { label: 'Linux', url: 'https://www.mozilla.org/firefox/download/' },
  ]},
  { name: 'Node.js', desc: 'JavaScript 运行时', icon: 'NJ', category: 'dev', downloads: [
    { label: 'Windows', url: 'https://nodejs.org/download/' },
    { label: 'macOS', url: 'https://nodejs.org/download/' },
    { label: 'Linux', url: 'https://nodejs.org/download/' },
  ]},
  { name: 'Git', desc: '分布式版本控制', icon: 'GT', category: 'dev', downloads: [
    { label: 'Windows', url: 'https://git-scm.com/download/win' },
    { label: 'macOS', url: 'https://git-scm.com/download/mac' },
    { label: 'Linux', url: 'https://git-scm.com/download/linux' },
  ]},
  { name: 'Docker Desktop', desc: '容器化应用平台', icon: 'DK', category: 'dev', downloads: [
    { label: 'Windows', url: 'https://www.docker.com/products/docker-desktop/' },
    { label: 'macOS', url: 'https://www.docker.com/products/docker-desktop/' },
    { label: 'Linux', url: 'https://www.docker.com/products/docker-desktop/' },
  ]},
  { name: 'Notepad++', desc: 'Windows 文本编辑器', icon: 'NP', category: 'editor', downloads: [
    { label: 'Windows', url: 'https://notepad-plus-plus.org/downloads/' },
  ]},
  { name: 'Sublime Text', desc: '优雅的代码编辑器', icon: 'ST', category: 'editor', downloads: [
    { label: 'Windows', url: 'https://www.sublimetext.com/download' },
    { label: 'macOS', url: 'https://www.sublimetext.com/download' },
    { label: 'Linux', url: 'https://www.sublimetext.com/download' },
  ]},
  { name: '7-Zip', desc: '免费压缩软件', icon: '7Z', category: 'utility', downloads: [
    { label: 'Windows', url: 'https://www.7-zip.org/download.html' },
  ]},
  { name: 'Everything', desc: '快速文件搜索', icon: 'EV', category: 'utility', downloads: [
    { label: 'Windows', url: 'https://www.voidtools.com/downloads/' },
  ]},
  { name: 'OBS Studio', desc: '开源录屏软件', icon: 'OB', category: 'media', downloads: [
    { label: 'Windows', url: 'https://obsproject.com/download' },
    { label: 'macOS', url: 'https://obsproject.com/download' },
    { label: 'Linux', url: 'https://obsproject.com/download' },
  ]},
  { name: 'VLC Media Player', desc: '万能播放器', icon: 'VL', category: 'media', downloads: [
    { label: 'Windows', url: 'https://www.videolan.org/vlc/' },
    { label: 'macOS', url: 'https://www.videolan.org/vlc/' },
    { label: 'Linux', url: 'https://www.videolan.org/vlc/' },
  ]},
  { name: 'Postman', desc: 'API 测试工具', icon: 'PM', category: 'dev', downloads: [
    { label: 'Windows', url: 'https://www.postman.com/downloads/' },
    { label: 'macOS', url: 'https://www.postman.com/downloads/' },
  ]},
  { name: 'Figma', desc: '协作设计工具', icon: 'FG', category: 'design', downloads: [
    { label: 'Windows', url: 'https://www.figma.com/downloads/' },
    { label: 'macOS', url: 'https://www.figma.com/downloads/' },
  ]},
  { name: 'Snipaste', desc: '截图贴图工具', icon: 'SN', category: 'utility', downloads: [
    { label: 'Windows', url: 'https://www.snipaste.com/download.html' },
    { label: 'macOS', url: 'https://www.snipaste.com/download.html' },
  ]},
  { name: 'Typora', desc: '极简 Markdown 编辑器', icon: 'TP', category: 'editor', downloads: [
    { label: 'Windows', url: 'https://typora.io/' },
    { label: 'macOS', url: 'https://typora.io/' },
    { label: 'Linux', url: 'https://typora.io/' },
  ]},
  { name: 'PowerToys', desc: 'Windows 增强工具', icon: 'PT', category: 'utility', downloads: [
    { label: 'Windows', url: 'https://github.com/microsoft/PowerToys/releases/latest' },
  ]},
  { name: 'uTools', desc: '效率工具集', icon: 'UT', category: 'utility', downloads: [
    { label: 'Windows', url: 'https://www.u.tools/download.html' },
    { label: 'macOS', url: 'https://www.u.tools/download.html' },
    { label: 'Linux', url: 'https://www.u.tools/download.html' },
  ]},
]

const categories = [
  { key: 'dev', label: '开发工具', color: '#409eff' },
  { key: 'browser', label: '浏览器', color: '#67c23a' },
  { key: 'editor', label: '编辑器', color: '#e6a23c' },
  { key: 'utility', label: '实用工具', color: '#f56c6c' },
  { key: 'media', label: '媒体工具', color: '#9b59b6' },
  { key: 'design', label: '设计工具', color: '#e91e63' },
]

export default function SoftwareDownloads() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('software.title')}</h2>
      <p className="text-[#909399] mb-6">{t('software.desc')}</p>

      {categories.map((cat) => {
        const items = softwareList.filter((s) => s.category === cat.key)
        if (items.length === 0) return null
        return (
          <div key={cat.key} className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-[#e5e7eb]" style={{ color: cat.color }}>{cat.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((sw) => (
                <div key={sw.name} className="bg-white border border-[#e5e7eb] rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: cat.color }}>{sw.icon}</div>
                    <div>
                      <div className="font-medium text-[#303133]">{sw.name}</div>
                      <div className="text-xs text-[#909399]">{sw.desc}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sw.downloads.map((dl) => (
                      <a key={dl.label} href={dl.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#f5f7fa] rounded text-xs text-[#606266] hover:bg-[#e4e7ed] hover:text-[#409eff] transition-colors">
                        {dl.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
