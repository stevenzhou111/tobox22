import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JWTParser() {
  const { t } = useTranslation()
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const parse = () => {
    try {
      const parts = token.trim().split('.')
      if (parts.length < 2) throw new Error()
      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
      setError('')

      if (decodedPayload.exp) {
        const expDate = new Date(decodedPayload.exp * 1000)
        const now = new Date()
        if (expDate < now) {
          setError(t('jwt.expired'))
        }
      }
    } catch {
      setError(t('jwt.error'))
      setHeader('')
      setPayload('')
    }
  }

  const expTime = payload ? (() => {
    try {
      const p = JSON.parse(payload)
      if (p.exp) return new Date(p.exp * 1000).toLocaleString()
      return null
    } catch { return null }
  })() : null

  const iatTime = payload ? (() => {
    try {
      const p = JSON.parse(payload)
      if (p.iat) return new Date(p.iat * 1000).toLocaleString()
      return null
    } catch { return null }
  })() : null

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('jwt.title')}</h2>
      <p className="text-gray-500 mb-6">{t('jwt.desc')}</p>

      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-lg font-mono text-xs resize-y focus:outline-none focus:border-blue-400"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder={t('jwt.placeholder')}
      />

      <button onClick={parse} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {t('jwt.parse')}
      </button>

      {error && <div className="mt-4 text-amber-600 text-sm">{error}</div>}

      {header && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">Header</div>
            <pre className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-auto max-h-64">{header}</pre>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Payload</div>
            <pre className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-auto max-h-64">{payload}</pre>
            {(expTime || iatTime) && (
              <div className="mt-3 space-y-1 text-sm text-gray-500">
                {iatTime && <div>{t('jwt.issued')}: {iatTime}</div>}
                {expTime && <div>{t('jwt.expires')}: {expTime}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
