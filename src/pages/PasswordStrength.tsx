import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PasswordStrength() {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')

  const analyze = (pwd: string) => {
    let score = 0
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
      long: pwd.length >= 12,
    }

    if (checks.length) score += 1
    if (checks.uppercase) score += 1
    if (checks.lowercase) score += 1
    if (checks.numbers) score += 1
    if (checks.special) score += 1
    if (checks.long) score += 1

    let strength = ''
    let color = ''
    if (score <= 2) { strength = t('passwordstrength.weak'); color = '#f56c6c' }
    else if (score <= 4) { strength = t('passwordstrength.medium'); color = '#e6a23c' }
    else { strength = t('passwordstrength.strong'); color = '#67c23a' }

    return { score, strength, color, checks }
  }

  const result = password ? analyze(password) : null

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('passwordstrength.title')}</h2>
      <p className="text-[#909399] mb-6">{t('passwordstrength.desc')}</p>

      <div className="mb-6">
        <label className="block text-sm text-[#909399] mb-1">{t('passwordstrength.input')}</label>
        <input
          type="text"
          className="input-field font-mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('passwordstrength.placeholder')}
        />
      </div>

      {result && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-3 bg-[#ebeef5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(result.score / 6) * 100}%`, background: result.color }}
              />
            </div>
            <span className="font-bold" style={{ color: result.color }}>{result.strength}</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(result.checks).map(([key, passed]) => (
              <div key={key} className={`flex items-center gap-2 text-sm ${passed ? 'text-[#67c23a]' : 'text-[#909399]'}`}>
                <span>{passed ? '✓' : '✗'}</span>
                <span>{t(`passwordstrength.checks.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
