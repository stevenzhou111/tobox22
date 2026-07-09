import { useTranslation } from 'react-i18next'

interface Software {
  name: string
  desc: string
  icon: string
  category: string
  downloads: { label: string; url: string }[]
}

const softwareList: Software[] = [
  // 开发工具
  { name: 'Visual Studio Code', desc: '轻量级代码编辑器', icon: 'VS', category: 'dev', downloads: [
    { label: '下载', url: 'https://code.visualstudio.com/' },
  ]},
  { name: 'Node.js', desc: 'JavaScript 运行时', icon: 'NJ', category: 'dev', downloads: [
    { label: '下载', url: 'https://nodejs.org/' },
  ]},
  { name: 'Git', desc: '分布式版本控制', icon: 'GT', category: 'dev', downloads: [
    { label: '下载', url: 'https://git-scm.com/' },
  ]},
  { name: 'Docker Desktop', desc: '容器化应用平台', icon: 'DK', category: 'dev', downloads: [
    { label: '下载', url: 'https://www.docker.com/products/docker-desktop/' },
  ]},
  { name: 'Postman', desc: 'API 测试工具', icon: 'PM', category: 'dev', downloads: [
    { label: '下载', url: 'https://www.postman.com/downloads/' },
  ]},
  { name: 'IntelliJ IDEA', desc: 'Java IDE', icon: 'IJ', category: 'dev', downloads: [
    { label: '下载', url: 'https://www.jetbrains.com/idea/download/' },
  ]},
  { name: 'WebStorm', desc: 'JavaScript IDE', icon: 'WS', category: 'dev', downloads: [
    { label: '下载', url: 'https://www.jetbrains.com/webstorm/download/' },
  ]},
  { name: 'Python', desc: 'Python 编程语言', icon: 'PY', category: 'dev', downloads: [
    { label: '下载', url: 'https://www.python.org/downloads/' },
  ]},

  // 浏览器
  { name: 'Google Chrome', desc: '快速安全的浏览器', icon: 'GC', category: 'browser', downloads: [
    { label: '下载', url: 'https://www.google.com/chrome/' },
  ]},
  { name: 'Mozilla Firefox', desc: '隐私保护浏览器', icon: 'FF', category: 'browser', downloads: [
    { label: '下载', url: 'https://www.mozilla.org/firefox/download/' },
  ]},
  { name: 'Microsoft Edge', desc: '微软浏览器', icon: 'ED', category: 'browser', downloads: [
    { label: '下载', url: 'https://www.microsoft.com/edge' },
  ]},
  { name: 'Brave', desc: '隐私浏览器', icon: 'BR', category: 'browser', downloads: [
    { label: '下载', url: 'https://brave.com/download/' },
  ]},
  { name: 'Arc', desc: '创新浏览器', icon: 'AR', category: 'browser', downloads: [
    { label: '下载', url: 'https://arc.net/' },
  ]},

  // 编辑器
  { name: 'Notepad++', desc: 'Windows 文本编辑器', icon: 'NP', category: 'editor', downloads: [
    { label: '下载', url: 'https://notepad-plus-plus.org/downloads/' },
  ]},
  { name: 'Sublime Text', desc: '优雅的代码编辑器', icon: 'ST', category: 'editor', downloads: [
    { label: '下载', url: 'https://www.sublimetext.com/download' },
  ]},
  { name: 'Typora', desc: '极简 Markdown 编辑器', icon: 'TP', category: 'editor', downloads: [
    { label: '下载', url: 'https://typora.io/' },
  ]},
  { name: 'Obsidian', desc: '知识管理笔记', icon: 'OB', category: 'editor', downloads: [
    { label: '下载', url: 'https://obsidian.md/download' },
  ]},

  // 实用工具
  { name: '7-Zip', desc: '免费压缩软件', icon: '7Z', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.7-zip.org/download.html' },
  ]},
  { name: 'Everything', desc: '快速文件搜索', icon: 'EV', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.voidtools.com/downloads/' },
  ]},
  { name: 'Snipaste', desc: '截图贴图工具', icon: 'SN', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.snipaste.com/download.html' },
  ]},
  { name: 'PowerToys', desc: 'Windows 增强工具', icon: 'PT', category: 'utility', downloads: [
    { label: '下载', url: 'https://github.com/microsoft/PowerToys/releases/latest' },
  ]},
  { name: 'uTools', desc: '效率工具集', icon: 'UT', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.u.tools/download.html' },
  ]},
  { name: 'Listary', desc: '文件快速启动', icon: 'LI', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.listary.com/download' },
  ]},
  { name: 'Flow Launcher', desc: '开源快速启动', icon: 'FL', category: 'utility', downloads: [
    { label: '下载', url: 'https://www.flowlauncher.com/download/' },
  ]},

  // 媒体工具
  { name: 'OBS Studio', desc: '开源录屏软件', icon: 'OS', category: 'media', downloads: [
    { label: '下载', url: 'https://obsproject.com/download' },
  ]},
  { name: 'VLC Media Player', desc: '万能播放器', icon: 'VL', category: 'media', downloads: [
    { label: '下载', url: 'https://www.videolan.org/vlc/' },
  ]},
  { name: 'Audacity', desc: '音频编辑器', icon: 'AU', category: 'media', downloads: [
    { label: '下载', url: 'https://www.audacityteam.org/download/' },
  ]},
  { name: 'GIMP', desc: '开源图像编辑', icon: 'GI', category: 'media', downloads: [
    { label: '下载', url: 'https://www.gimp.org/downloads/' },
  ]},
  { name: 'ShareX', desc: '截图录屏工具', icon: 'SX', category: 'media', downloads: [
    { label: '下载', url: 'https://getsharex.com/downloads' },
  ]},

  // 设计工具
  { name: 'Figma', desc: '协作设计工具', icon: 'FG', category: 'design', downloads: [
    { label: '下载', url: 'https://www.figma.com/downloads/' },
  ]},
  { name: 'Blender', desc: '3D 建模软件', icon: 'BL', category: 'design', downloads: [
    { label: '下载', url: 'https://www.blender.org/download/' },
  ]},
  { name: 'Inkscape', desc: '矢量图形编辑', icon: 'IK', category: 'design', downloads: [
    { label: '下载', url: 'https://inkscape.org/release/' },
  ]},
  { name: 'Penpot', desc: '开源设计工具', icon: 'PP', category: 'design', downloads: [
    { label: '下载', url: 'https://penpot.app/' },
  ]},

  // 远程工具
  { name: 'ToDesk', desc: '国产远程控制', icon: 'TD', category: 'remote', downloads: [
    { label: '下载', url: 'https://www.todesk.com/download.html' },
  ]},
  { name: 'AnyDesk', desc: '轻量远程桌面', icon: 'AD', category: 'remote', downloads: [
    { label: '下载', url: 'https://anydesk.com/downloads' },
  ]},
  { name: 'TeamViewer', desc: '专业远程控制', icon: 'TV', category: 'remote', downloads: [
    { label: '下载', url: 'https://www.teamviewer.com/download/' },
  ]},
  { name: 'RustDesk', desc: '开源远程桌面', icon: 'RD', category: 'remote', downloads: [
    { label: '下载', url: 'https://rustdesk.com/download' },
  ]},
  { name: 'Parsec', desc: '游戏远程串流', icon: 'PC', category: 'remote', downloads: [
    { label: '下载', url: 'https://parsec.app/downloads' },
  ]},
  { name: '向日葵', desc: '国产远程控制', icon: 'XR', category: 'remote', downloads: [
    { label: '下载', url: 'https://sunlogin.oray.com/download' },
  ]},

  // 社交/通讯
  { name: '微信', desc: '社交通讯', icon: 'WX', category: 'social', downloads: [
    { label: '下载', url: 'https://weixin.qq.com/' },
  ]},
  { name: 'QQ', desc: '社交通讯', icon: 'QQ', category: 'social', downloads: [
    { label: '下载', url: 'https://im.qq.com/' },
  ]},
  { name: 'Telegram', desc: '加密通讯', icon: 'TG', category: 'social', downloads: [
    { label: '下载', url: 'https://desktop.telegram.org/' },
  ]},
  { name: 'Discord', desc: '语音社区', icon: 'DC', category: 'social', downloads: [
    { label: '下载', url: 'https://discord.com/download' },
  ]},
  { name: 'Slack', desc: '团队协作', icon: 'SK', category: 'social', downloads: [
    { label: '下载', url: 'https://slack.com/downloads' },
  ]},
  { name: '飞书', desc: '办公协作', icon: 'FS', category: 'social', downloads: [
    { label: '下载', url: 'https://www.feishu.cn/download' },
  ]},
  { name: '钉钉', desc: '企业通讯', icon: 'DD', category: 'social', downloads: [
    { label: '下载', url: 'https://www.dingtalk.com/download' },
  ]},
  { name: '腾讯会议', desc: '在线会议', icon: 'HM', category: 'social', downloads: [
    { label: '下载', url: 'https://meeting.tencent.com/download-center.html' },
  ]},

  // 下载工具
  { name: 'IDM', desc: '下载加速器', icon: 'ID', category: 'download', downloads: [
    { label: '下载', url: 'https://www.internetdownloadmanager.com/download.html' },
  ]},
  { name: 'Motrix', desc: '开源下载工具', icon: 'MX', category: 'download', downloads: [
    { label: '下载', url: 'https://motrix.app/download' },
  ]},
  { name: 'aria2', desc: '命令行下载工具', icon: 'A2', category: 'download', downloads: [
    { label: '下载', url: 'https://aria2.github.io/' },
  ]},

  // 安全工具
  { name: 'KeePass', desc: '密码管理器', icon: 'KP', category: 'security', downloads: [
    { label: '下载', url: 'https://keepass.info/download.html' },
  ]},
  { name: 'Bitwarden', desc: '云端密码管理', icon: 'BW', category: 'security', downloads: [
    { label: '下载', url: 'https://bitwarden.com/download/' },
  ]},
  { name: 'ClamAV', desc: '开源杀毒软件', icon: 'CA', category: 'security', downloads: [
    { label: '下载', url: 'https://www.clamav.net/downloads' },
  ]},
]

const categories = [
  { key: 'dev', label: '开发工具', color: '#409eff' },
  { key: 'browser', label: '浏览器', color: '#67c23a' },
  { key: 'editor', label: '编辑器', color: '#e6a23c' },
  { key: 'utility', label: '实用工具', color: '#f56c6c' },
  { key: 'media', label: '媒体工具', color: '#9b59b6' },
  { key: 'design', label: '设计工具', color: '#e91e63' },
  { key: 'remote', label: '远程工具', color: '#00bcd4' },
  { key: 'social', label: '社交/通讯', color: '#ff9800' },
  { key: 'download', label: '下载工具', color: '#8bc34a' },
  { key: 'security', label: '安全工具', color: '#607d8b' },
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
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: cat.color }}>{sw.icon}</div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#303133] truncate">{sw.name}</div>
                      <div className="text-xs text-[#909399] truncate">{sw.desc}</div>
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
