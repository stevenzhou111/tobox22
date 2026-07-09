import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HttpStatusCodes() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const codes = [
    { code: 200, name: 'OK', desc: t('httpcodes.200'), category: 'success' },
    { code: 201, name: 'Created', desc: t('httpcodes.201'), category: 'success' },
    { code: 204, name: 'No Content', desc: t('httpcodes.204'), category: 'success' },
    { code: 301, name: 'Moved Permanently', desc: t('httpcodes.301'), category: 'redirect' },
    { code: 302, name: 'Found', desc: t('httpcodes.302'), category: 'redirect' },
    { code: 304, name: 'Not Modified', desc: t('httpcodes.304'), category: 'redirect' },
    { code: 400, name: 'Bad Request', desc: t('httpcodes.400'), category: 'client' },
    { code: 401, name: 'Unauthorized', desc: t('httpcodes.401'), category: 'client' },
    { code: 403, name: 'Forbidden', desc: t('httpcodes.403'), category: 'client' },
    { code: 404, name: 'Not Found', desc: t('httpcodes.404'), category: 'client' },
    { code: 405, name: 'Method Not Allowed', desc: t('httpcodes.405'), category: 'client' },
    { code: 408, name: 'Request Timeout', desc: t('httpcodes.408'), category: 'client' },
    { code: 409, name: 'Conflict', desc: t('httpcodes.409'), category: 'client' },
    { code: 413, name: 'Payload Too Large', desc: t('httpcodes.413'), category: 'client' },
    { code: 429, name: 'Too Many Requests', desc: t('httpcodes.429'), category: 'client' },
    { code: 500, name: 'Internal Server Error', desc: t('httpcodes.500'), category: 'server' },
    { code: 501, name: 'Not Implemented', desc: t('httpcodes.501'), category: 'server' },
    { code: 502, name: 'Bad Gateway', desc: t('httpcodes.502'), category: 'server' },
    { code: 503, name: 'Service Unavailable', desc: t('httpcodes.503'), category: 'server' },
    { code: 504, name: 'Gateway Timeout', desc: t('httpcodes.504'), category: 'server' },
  ]

  const categoryColors: Record<string, string> = {
    success: '#67c23a',
    redirect: '#e6a23c',
    client: '#f56c6c',
    server: '#f56c6c',
  }

  const categoryLabels: Record<string, string> = {
    success: '2xx Success',
    redirect: '3xx Redirection',
    client: '4xx Client Error',
    server: '5xx Server Error',
  }

  const filtered = codes.filter((c) => !search || String(c.code).includes(search) || c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('httpcodes.title')}</h2>
      <p className="text-[#909399] mb-6">{t('httpcodes.desc')}</p>
      <input className="input-field mb-6" placeholder={t('httpcodes.search')} value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="space-y-3">
        {filtered.map((code) => (
          <div key={code.code} className="flex items-center gap-4 p-3 bg-white border border-[#e5e7eb] rounded-lg hover:shadow-sm transition-shadow">
            <span className="font-mono font-bold text-lg w-12" style={{ color: categoryColors[code.category] }}>{code.code}</span>
            <span className="font-medium text-[#303133] w-40">{code.name}</span>
            <span className="text-sm text-[#909399] flex-1">{code.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
