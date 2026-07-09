import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface Software {
  name: string
  desc: string
  icon: string
  category: string
  downloads: { label: string; url: string }[]
}

const softwareList: Software[] = [
  // 开发工具
  { name: 'Visual Studio Code', desc: '轻量级代码编辑器', icon: 'VS', category: 'dev', downloads: [{ label: '下载', url: 'https://code.visualstudio.com/' }] },
  { name: 'Node.js', desc: 'JavaScript 运行时', icon: 'NJ', category: 'dev', downloads: [{ label: '下载', url: 'https://nodejs.org/' }] },
  { name: 'Git', desc: '分布式版本控制', icon: 'GT', category: 'dev', downloads: [{ label: '下载', url: 'https://git-scm.com/' }] },
  { name: 'Docker Desktop', desc: '容器化应用平台', icon: 'DK', category: 'dev', downloads: [{ label: '下载', url: 'https://www.docker.com/products/docker-desktop/' }] },
  { name: 'Postman', desc: 'API 测试工具', icon: 'PM', category: 'dev', downloads: [{ label: '下载', url: 'https://www.postman.com/downloads/' }] },
  { name: 'IntelliJ IDEA', desc: 'Java/Kotlin IDE', icon: 'IJ', category: 'dev', downloads: [{ label: '下载', url: 'https://www.jetbrains.com/idea/download/' }] },
  { name: 'WebStorm', desc: 'JavaScript IDE', icon: 'WS', category: 'dev', downloads: [{ label: '下载', url: 'https://www.jetbrains.com/webstorm/download/' }] },
  { name: 'Python', desc: 'Python 编程语言', icon: 'PY', category: 'dev', downloads: [{ label: '下载', url: 'https://www.python.org/downloads/' }] },
  { name: 'Go', desc: 'Go 编程语言', icon: 'GO', category: 'dev', downloads: [{ label: '下载', url: 'https://go.dev/dl/' }] },
  { name: 'Rust', desc: 'Rust 编程语言', icon: 'RS', category: 'dev', downloads: [{ label: '下载', url: 'https://www.rust-lang.org/tools/install' }] },
  { name: 'Android Studio', desc: 'Android 开发 IDE', icon: 'AS', category: 'dev', downloads: [{ label: '下载', url: 'https://developer.android.com/studio' }] },
  { name: 'Xcode', desc: 'iOS/macOS 开发 IDE', icon: 'XC', category: 'dev', downloads: [{ label: '下载', url: 'https://developer.apple.com/xcode/' }] },
  { name: 'Navicat', desc: '数据库管理工具', icon: 'NV', category: 'dev', downloads: [{ label: '下载', url: 'https://www.navicat.com/en/download/navicat-premium' }] },
  { name: 'Redis Desktop', desc: 'Redis 可视化工具', icon: 'RD', category: 'dev', downloads: [{ label: '下载', url: 'https://redis.com/redis-enterprise/redis-insight/' }] },

  // 浏览器
  { name: 'Google Chrome', desc: '快速安全的浏览器', icon: 'GC', category: 'browser', downloads: [{ label: '下载', url: 'https://www.google.com/chrome/' }] },
  { name: 'Mozilla Firefox', desc: '隐私保护浏览器', icon: 'FF', category: 'browser', downloads: [{ label: '下载', url: 'https://www.mozilla.org/firefox/download/' }] },
  { name: 'Microsoft Edge', desc: '微软浏览器', icon: 'ED', category: 'browser', downloads: [{ label: '下载', url: 'https://www.microsoft.com/edge' }] },
  { name: 'Brave', desc: '隐私浏览器', icon: 'BR', category: 'browser', downloads: [{ label: '下载', url: 'https://brave.com/download/' }] },
  { name: 'Arc', desc: '创新浏览器', icon: 'AR', category: 'browser', downloads: [{ label: '下载', url: 'https://arc.net/' }] },
  { name: 'Safari', desc: 'macOS 默认浏览器', icon: 'SF', category: 'browser', downloads: [{ label: '下载', url: 'https://support.apple.com/zh-cn/102659' }] },

  // 编辑器
  { name: 'Notepad++', desc: 'Windows 文本编辑器', icon: 'NP', category: 'editor', downloads: [{ label: '下载', url: 'https://notepad-plus-plus.org/downloads/' }] },
  { name: 'Sublime Text', desc: '优雅的代码编辑器', icon: 'ST', category: 'editor', downloads: [{ label: '下载', url: 'https://www.sublimetext.com/download' }] },
  { name: 'Typora', desc: '极简 Markdown 编辑器', icon: 'TP', category: 'editor', downloads: [{ label: '下载', url: 'https://typora.io/' }] },
  { name: 'Obsidian', desc: '知识管理笔记', icon: 'OB', category: 'editor', downloads: [{ label: '下载', url: 'https://obsidian.md/download' }] },
  { name: 'Vim', desc: '终端编辑器', icon: 'VI', category: 'editor', downloads: [{ label: '下载', url: 'https://www.vim.org/download.php' }] },
  { name: 'Neovim', desc: '现代 Vim 编辑器', icon: 'NV', category: 'editor', downloads: [{ label: '下载', url: 'https://neovim.io/download/' }] },
  { name: 'Emacs', desc: '可扩展编辑器', icon: 'EM', category: 'editor', downloads: [{ label: '下载', url: 'https://www.gnu.org/software/emacs/download.html' }] },

  // 实用工具
  { name: '7-Zip', desc: '免费压缩软件', icon: '7Z', category: 'utility', downloads: [{ label: '下载', url: 'https://www.7-zip.org/download.html' }] },
  { name: 'Everything', desc: '快速文件搜索', icon: 'EV', category: 'utility', downloads: [{ label: '下载', url: 'https://www.voidtools.com/downloads/' }] },
  { name: 'Snipaste', desc: '截图贴图工具', icon: 'SN', category: 'utility', downloads: [{ label: '下载', url: 'https://www.snipaste.com/download.html' }] },
  { name: 'PowerToys', desc: 'Windows 增强工具', icon: 'PT', category: 'utility', downloads: [{ label: '下载', url: 'https://github.com/microsoft/PowerToys/releases/latest' }] },
  { name: 'uTools', desc: '效率工具集', icon: 'UT', category: 'utility', downloads: [{ label: '下载', url: 'https://www.u.tools/download.html' }] },
  { name: 'Listary', desc: '文件快速启动', icon: 'LI', category: 'utility', downloads: [{ label: '下载', url: 'https://www.listary.com/download' }] },
  { name: 'Flow Launcher', desc: '开源快速启动', icon: 'FL', category: 'utility', downloads: [{ label: '下载', url: 'https://www.flowlauncher.com/download/' }] },
  { name: 'Alfred', desc: 'macOS 效率工具', icon: 'AL', category: 'utility', downloads: [{ label: '下载', url: 'https://www.alfredapp.com/' }] },
  { name: 'Raycast', desc: 'macOS 快速启动', icon: 'RX', category: 'utility', downloads: [{ label: '下载', url: 'https://www.raycast.com/' }] },
  { name: 'Notion', desc: '笔记与知识管理', icon: 'NO', category: 'utility', downloads: [{ label: '下载', url: 'https://www.notion.so/desktop' }] },
  { name: 'Logseq', desc: '开源笔记工具', icon: 'LQ', category: 'utility', downloads: [{ label: '下载', url: 'https://logseq.com/downloads' }] },
  { name: 'Clash Verge', desc: '代理工具', icon: 'CV', category: 'utility', downloads: [{ label: '下载', url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases' }] },
  { name: 'CheatSheet', desc: 'macOS 快捷键查看', icon: 'CS', category: 'utility', downloads: [{ label: '下载', url: 'https://www.mediaatelier.com/CheatSheet/' }] },
  { name: 'Karabiner', desc: 'macOS 键位修改', icon: 'KB', category: 'utility', downloads: [{ label: '下载', url: 'https://karabiner-elements.pqrs.org/' }] },

  // 媒体工具
  { name: 'OBS Studio', desc: '开源录屏软件', icon: 'OS', category: 'media', downloads: [{ label: '下载', url: 'https://obsproject.com/download' }] },
  { name: 'VLC Media Player', desc: '万能播放器', icon: 'VL', category: 'media', downloads: [{ label: '下载', url: 'https://www.videolan.org/vlc/' }] },
  { name: 'Audacity', desc: '音频编辑器', icon: 'AU', category: 'media', downloads: [{ label: '下载', url: 'https://www.audacityteam.org/download/' }] },
  { name: 'GIMP', desc: '开源图像编辑', icon: 'GI', category: 'media', downloads: [{ label: '下载', url: 'https://www.gimp.org/downloads/' }] },
  { name: 'ShareX', desc: '截图录屏工具', icon: 'SX', category: 'media', downloads: [{ label: '下载', url: 'https://getsharex.com/downloads' }] },
  { name: 'Shotcut', desc: '开源视频编辑', icon: 'SC', category: 'media', downloads: [{ label: '下载', url: 'https://shotcut.org/download/' }] },
  { name: 'DaVinci Resolve', desc: '专业视频剪辑', icon: 'DR', category: 'media', downloads: [{ label: '下载', url: 'https://www.blackmagicdesign.com/products/davinciresolve' }] },
  { name: 'Blender', desc: '3D 建模/动画', icon: 'BL', category: 'media', downloads: [{ label: '下载', url: 'https://www.blender.org/download/' }] },
  { name: 'HandBrake', desc: '视频格式转换', icon: 'HB', category: 'media', downloads: [{ label: '下载', url: 'https://handbrake.fr/downloads.php' }] },
  { name: 'IINA', desc: 'macOS 播放器', icon: 'IN', category: 'media', downloads: [{ label: '下载', url: 'https://iina.io/download/' }] },

  // 设计工具
  { name: 'Figma', desc: '协作设计工具', icon: 'FG', category: 'design', downloads: [{ label: '下载', url: 'https://www.figma.com/downloads/' }] },
  { name: 'Inkscape', desc: '矢量图形编辑', icon: 'IK', category: 'design', downloads: [{ label: '下载', url: 'https://inkscape.org/release/' }] },
  { name: 'Penpot', desc: '开源设计工具', icon: 'PP', category: 'design', downloads: [{ label: '下载', url: 'https://penpot.app/' }] },
  { name: 'Excalidraw', desc: '手绘风格白板', icon: 'EX', category: 'design', downloads: [{ label: '下载', url: 'https://excalidraw.com/' }] },
  { name: 'Snagit', desc: '截图标注工具', icon: 'SG', category: 'design', downloads: [{ label: '下载', url: 'https://www.techsmith.com/screen-capture.html' }] },
  { name: 'Canva', desc: '在线设计平台', icon: 'CA', category: 'design', downloads: [{ label: '下载', url: 'https://www.canva.com/download/' }] },

  // 远程工具
  { name: 'ToDesk', desc: '国产远程控制', icon: 'TD', category: 'remote', downloads: [{ label: '下载', url: 'https://www.todesk.com/download.html' }] },
  { name: 'AnyDesk', desc: '轻量远程桌面', icon: 'AD', category: 'remote', downloads: [{ label: '下载', url: 'https://anydesk.com/downloads' }] },
  { name: 'TeamViewer', desc: '专业远程控制', icon: 'TV', category: 'remote', downloads: [{ label: '下载', url: 'https://www.teamviewer.com/download/' }] },
  { name: 'RustDesk', desc: '开源远程桌面', icon: 'RS', category: 'remote', downloads: [{ label: '下载', url: 'https://rustdesk.com/download' }] },
  { name: 'Parsec', desc: '游戏远程串流', icon: 'PC', category: 'remote', downloads: [{ label: '下载', url: 'https://parsec.app/downloads' }] },
  { name: '向日葵', desc: '国产远程控制', icon: 'XR', category: 'remote', downloads: [{ label: '下载', url: 'https://sunlogin.oray.com/download' }] },
  { name: 'Moonlight', desc: '开源游戏串流', icon: 'ML', category: 'remote', downloads: [{ label: '下载', url: 'https://moonlight-stream.org/downloads' }] },
  { name: 'Apache Guacamole', desc: 'Web 远程桌面', icon: 'GU', category: 'remote', downloads: [{ label: '下载', url: 'https://guacamole.apache.org/releases/' }] },
  { name: 'Remmina', desc: 'Linux 远程桌面', icon: 'RM', category: 'remote', downloads: [{ label: '下载', url: 'https://remmina.org/download/' }] },

  // 社交/通讯
  { name: '微信', desc: '社交通讯', icon: 'WX', category: 'social', downloads: [{ label: '下载', url: 'https://weixin.qq.com/' }] },
  { name: 'QQ', desc: '社交通讯', icon: 'QQ', category: 'social', downloads: [{ label: '下载', url: 'https://im.qq.com/' }] },
  { name: 'Telegram', desc: '加密通讯', icon: 'TG', category: 'social', downloads: [{ label: '下载', url: 'https://desktop.telegram.org/' }] },
  { name: 'Discord', desc: '语音社区', icon: 'DC', category: 'social', downloads: [{ label: '下载', url: 'https://discord.com/download' }] },
  { name: 'Slack', desc: '团队协作', icon: 'SK', category: 'social', downloads: [{ label: '下载', url: 'https://slack.com/downloads' }] },
  { name: '飞书', desc: '办公协作', icon: 'FS', category: 'social', downloads: [{ label: '下载', url: 'https://www.feishu.cn/download' }] },
  { name: '钉钉', desc: '企业通讯', icon: 'DD', category: 'social', downloads: [{ label: '下载', url: 'https://www.dingtalk.com/download' }] },
  { name: '腾讯会议', desc: '在线会议', icon: 'HM', category: 'social', downloads: [{ label: '下载', url: 'https://meeting.tencent.com/download-center.html' }] },
  { name: 'Zoom', desc: '视频会议', icon: 'ZM', category: 'social', downloads: [{ label: '下载', url: 'https://zoom.us/download' }] },
  { name: 'Microsoft Teams', desc: '团队协作', icon: 'MT', category: 'social', downloads: [{ label: '下载', url: 'https://www.microsoft.com/microsoft-teams/download-app' }] },
  { name: 'Signal', desc: '加密通讯', icon: 'SG', category: 'social', downloads: [{ label: '下载', url: 'https://signal.org/download/' }] },
  { name: 'Element', desc: 'Matrix 协议通讯', icon: 'EL', category: 'social', downloads: [{ label: '下载', url: 'https://element.io/download' }] },
  { name: 'Lark', desc: '国际版飞书', icon: 'LK', category: 'social', downloads: [{ label: '下载', url: 'https://www.larksuite.com/download' }] },

  // 下载工具
  { name: 'IDM', desc: '下载加速器', icon: 'ID', category: 'download', downloads: [{ label: '下载', url: 'https://www.internetdownloadmanager.com/download.html' }] },
  { name: 'Motrix', desc: '开源下载工具', icon: 'MX', category: 'download', downloads: [{ label: '下载', url: 'https://motrix.app/download' }] },
  { name: 'aria2', desc: '命令行下载工具', icon: 'A2', category: 'download', downloads: [{ label: '下载', url: 'https://aria2.github.io/' }] },
  { name: 'Free Download Manager', desc: '免费下载管理', icon: 'FD', category: 'download', downloads: [{ label: '下载', url: 'https://www.freedownloadmanager.org/download.htm' }] },
  { name: 'qBittorrent', desc: '开源 BT 下载', icon: 'QB', category: 'download', downloads: [{ label: '下载', url: 'https://www.qbittorrent.org/download' }] },

  // 安全工具
  { name: 'KeePass', desc: '密码管理器', icon: 'KP', category: 'security', downloads: [{ label: '下载', url: 'https://keepass.info/download.html' }] },
  { name: 'Bitwarden', desc: '云端密码管理', icon: 'BW', category: 'security', downloads: [{ label: '下载', url: 'https://bitwarden.com/download/' }] },
  { name: 'ClamAV', desc: '开源杀毒软件', icon: 'CA', category: 'security', downloads: [{ label: '下载', url: 'https://www.clamav.net/downloads' }] },
  { name: '1Password', desc: '密码管理器', icon: '1P', category: 'security', downloads: [{ label: '下载', url: 'https://1password.com/downloads' }] },
  { name: 'Wireguard', desc: '现代 VPN 协议', icon: 'WG', category: 'security', downloads: [{ label: '下载', url: 'https://www.wireguard.com/install/' }] },
  { name: 'ProtonVPN', desc: '免费 VPN', icon: 'PV', category: 'security', downloads: [{ label: '下载', url: 'https://protonvpn.com/download' }] },

  // AI 工具
  { name: 'ChatGPT Desktop', desc: 'OpenAI 客户端', icon: 'CG', category: 'ai', downloads: [{ label: '下载', url: 'https://chat.openai.com/' }] },
  { name: 'Ollama', desc: '本地运行 LLM', icon: 'OL', category: 'ai', downloads: [{ label: '下载', url: 'https://ollama.ai/download' }] },
  { name: 'LM Studio', desc: '本地 LLM 管理', icon: 'LM', category: 'ai', downloads: [{ label: '下载', url: 'https://lmstudio.ai/' }] },
  { name: 'Stable Diffusion', desc: 'AI 图像生成', icon: 'SD', category: 'ai', downloads: [{ label: '下载', url: 'https://stability.ai/stable-diffusion' }] },
  { name: 'ComfyUI', desc: 'AI 图像工作流', icon: 'CU', category: 'ai', downloads: [{ label: '下载', url: 'https://github.com/comfyanonymous/ComfyUI' }] },
]

const categories = [
  { key: 'dev', label: '开发工具', color: '#409eff', icon: '{}' },
  { key: 'browser', label: '浏览器', color: '#67c23a', icon: 'G' },
  { key: 'editor', label: '编辑器', color: '#e6a23c', icon: 'E' },
  { key: 'utility', label: '实用工具', color: '#f56c6c', icon: 'U' },
  { key: 'media', label: '媒体工具', color: '#9b59b6', icon: 'M' },
  { key: 'design', label: '设计工具', color: '#e91e63', icon: 'D' },
  { key: 'remote', label: '远程工具', color: '#00bcd4', icon: 'R' },
  { key: 'social', label: '社交/通讯', color: '#ff9800', icon: 'S' },
  { key: 'download', label: '下载工具', color: '#8bc34a', icon: 'DL' },
  { key: 'security', label: '安全工具', color: '#607d8b', icon: 'SE' },
  { key: 'ai', label: 'AI 工具', color: '#7c3aed', icon: 'AI' },
]

export default function SoftwareDownloads() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSoftware = softwareList.filter((sw) => {
    const matchCategory = !activeCategory || sw.category === activeCategory
    const matchSearch = !searchTerm || sw.name.toLowerCase().includes(searchTerm.toLowerCase()) || sw.desc.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('software.title')}</h2>
        <p className="text-[#909399]">{t('software.desc')}</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="input-field"
          placeholder={t('software.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${!activeCategory ? 'bg-[#409eff] text-white' : 'bg-[#f5f7fa] text-[#606266] hover:bg-[#e4e7ed]'}`}
        >
          {t('software.all')} ({softwareList.length})
        </button>
        {categories.map((cat) => {
          const count = softwareList.filter((s) => s.category === cat.key).length
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${activeCategory === cat.key ? 'text-white' : 'bg-[#f5f7fa] text-[#606266] hover:bg-[#e4e7ed]'}`}
              style={activeCategory === cat.key ? { background: cat.color } : {}}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Software Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSoftware.map((sw) => {
          const cat = categories.find((c) => c.key === sw.category)
          return (
            <div key={`${sw.name}-${sw.category}`} className="bg-white border border-[#e5e7eb] rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm"
                  style={{ background: cat?.color || '#409eff' }}
                >
                  {sw.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[#303133] truncate text-sm">{sw.name}</div>
                  <div className="text-xs text-[#909399] mt-0.5 line-clamp-1">{sw.desc}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sw.downloads.map((dl) => (
                  <a
                    key={dl.label}
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#f5f7fa] rounded-md text-xs text-[#606266] hover:bg-[#409eff] hover:text-white transition-colors"
                  >
                    {dl.label}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filteredSoftware.length === 0 && (
        <div className="text-center py-12 text-[#909399]">
          {t('software.noResult')}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-[#e5e7eb] text-center text-sm text-[#909399]">
        {t('software.total', { count: softwareList.length })}
      </div>
    </div>
  )
}
