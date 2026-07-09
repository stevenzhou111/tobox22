import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function TimestampTool() {
  const { t } = useTranslation()
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))
  const [dateInput, setDateInput] = useState('')
  const [tsInput, setTsInput] = useState('')
  const [dateResult, setDateResult] = useState('')
  const [tsResult, setTsResult] = useState('')
  const [error, setError] = useState('')
  const [useMs, setUseMs] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleToDate = () => {
    setError('')
    try {
      let ts = parseInt(tsInput)
      if (isNaN(ts)) throw new Error()
      if (ts > 1e12) {
        setUseMs(true)
      } else {
        setUseMs(false)
        ts *= 1000
      }
      const date = new Date(ts)
      if (isNaN(date.getTime())) throw new Error()
      setDateResult(date.toLocaleString())
    } catch {
      setDateResult('')
      setError(t('timestamp.error'))
    }
  }

  const handleToTimestamp = () => {
    setError('')
    try {
      const date = new Date(dateInput)
      if (isNaN(date.getTime())) throw new Error()
      const ts = Math.floor(date.getTime() / 1000)
      setTsResult(useMs ? String(date.getTime()) : String(ts))
    } catch {
      setTsResult('')
      setError(t('timestamp.error'))
    }
  }

  const handleNow = () => {
    const ts = Math.floor(Date.now() / 1000)
    setNow(ts)
    setTsInput(String(useMs ? Date.now() : ts))
    const date = new Date()
    setDateInput(date.toISOString().slice(0, 16))
  }

  return (
    <div>
      <ToolHeader title={t('timestamp.title')} desc={t('timestamp.desc')} />

      <div className="space-y-6">
        {/* Current time */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">{t('timestamp.currentTime')}</div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-mono font-bold text-gray-900">{now}</span>
            <button onClick={handleNow} className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              {t('timestamp.now')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timestamp to Date */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">{t('timestamp.toDate')}</h3>
            <input
              type="text"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              placeholder={t('timestamp.timestampInput')}
              className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="flex gap-2 mt-3">
              <button onClick={handleToDate} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                {t('timestamp.toDate')}
              </button>
            </div>
            {dateResult && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm font-mono text-green-800">
                {dateResult}
              </div>
            )}
          </div>

          {/* Date to Timestamp */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">{t('timestamp.toTimestamp')}</h3>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="flex gap-2 mt-3">
              <button onClick={handleToTimestamp} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                {t('timestamp.toTimestamp')}
              </button>
            </div>
            {tsResult && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm font-mono text-green-800">
                {tsResult}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}
      </div>
    </div>
  )
}
