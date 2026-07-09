import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CronExpression() {
  const { t } = useTranslation()
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [day, setDay] = useState('*')
  const [month, setMonth] = useState('*')
  const [weekday, setWeekday] = useState('*')

  const expression = `${minute} ${hour} ${day} ${month} ${weekday}`

  const presets = [
    { label: t('cron.everyMinute'), expr: '* * * * *' },
    { label: t('cron.everyHour'), expr: '0 * * * *' },
    { label: t('cron.everyDay'), expr: '0 0 * * *' },
    { label: t('cron.everyWeek'), expr: '0 0 * * 0' },
    { label: t('cron.everyMonth'), expr: '0 0 1 * *' },
    { label: t('cron.weekdays'), expr: '0 9 * * 1-5' },
  ]

  const applyPreset = (expr: string) => {
    const [m, h, d, mo, w] = expr.split(' ')
    setMinute(m); setHour(h); setDay(d); setMonth(mo); setWeekday(w)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('cron.title')}</h2>
      <p className="text-[#909399] mb-6">{t('cron.desc')}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map((p) => <button key={p.label} onClick={() => applyPreset(p.expr)} className="btn-secondary text-sm">{p.label}</button>)}
      </div>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {[{ label: t('cron.minute'), value: minute, set: setMinute }, { label: t('cron.hour'), value: hour, set: setHour }, { label: t('cron.day'), value: day, set: setDay }, { label: t('cron.month'), value: month, set: setMonth }, { label: t('cron.weekday'), value: weekday, set: setWeekday }].map((f) => (
          <div key={f.label}><label className="block text-sm text-[#909399] mb-1">{f.label}</label><input className="input-field text-center font-mono" value={f.value} onChange={(e) => f.set(e.target.value)} /></div>
        ))}
      </div>
      <div className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-lg text-center">{expression}</div>
      <button onClick={() => navigator.clipboard.writeText(expression)} className="btn-secondary mt-3 w-full">{t('copy')}</button>
    </div>
  )
}
