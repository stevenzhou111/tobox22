import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function PasswordGen() {
  const { t } = useTranslation()
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let chars = ''
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword('')
      return
    }

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    const result = Array.from(array, v => chars[v % chars.length]).join('')
    setPassword(result)
    setCopied(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <ToolHeader title={t('password.title')} desc={t('password.desc')} />

      <div className="space-y-6 max-w-lg">
        {/* Length slider */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('password.length')}: <span className="font-mono text-blue-600">{length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
          {[
            { checked: uppercase, onChange: setUppercase, label: t('password.uppercase') },
            { checked: lowercase, onChange: setLowercase, label: t('password.lowercase') },
            { checked: numbers, onChange: setNumbers, label: t('password.numbers') },
            { checked: symbols, onChange: setSymbols, label: t('password.symbols') },
          ].map((opt, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.onChange(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          {t('password.generate')}
        </button>

        {/* Result */}
        {password && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-gray-50 rounded-lg font-mono text-lg break-all select-all">
                {password}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                {copied ? t('password.copied') : t('password.copy')}
              </button>
            </div>
            {/* Strength indicator */}
            <div className="mt-3 flex gap-1">
              {[...Array(4)].map((_, i) => {
                const strength = password.length >= 24 ? 4 : password.length >= 16 ? 3 : password.length >= 10 ? 2 : 1
                return (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < strength
                        ? strength >= 3 ? 'bg-green-500' : strength >= 2 ? 'bg-yellow-500' : 'bg-red-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
