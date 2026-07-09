import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Pomodoro() {
  const { t } = useTranslation()
  const [workMin, setWorkMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)
  const [seconds, setSeconds] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isBreakRef = useRef(isBreak)

  useEffect(() => {
    isBreakRef.current = isBreak
  }, [isBreak])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (isBreakRef.current) {
              setIsBreak(false)
            } else {
              setSessions((s) => s + 1)
              setIsBreak(true)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  useEffect(() => {
    if (!isRunning) {
      setSeconds(isBreak ? breakMin * 60 : workMin * 60)
    }
  }, [workMin, breakMin, isBreak, isRunning])

  const reset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setSeconds(workMin * 60)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const progress = isBreak
    ? ((breakMin * 60 - seconds) / (breakMin * 60)) * 100
    : ((workMin * 60 - seconds) / (workMin * 60)) * 100

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pomodoro.title')}</h2>
      <p className="text-gray-500 mb-6">{t('pomodoro.desc')}</p>

      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${isBreak ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {isBreak ? t('pomodoro.break') : t('pomodoro.work')}
          </span>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx="96" cy="96" r="88" fill="none" stroke={isBreak ? '#10b981' : '#3b82f6'} strokeWidth="8" strokeDasharray={2 * Math.PI * 88} strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-mono font-bold text-gray-900">{formatTime(seconds)}</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setIsRunning(!isRunning)} className={`px-6 py-2 rounded-lg text-white transition-colors ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {isRunning ? t('pomodoro.pause') : t('pomodoro.start')}
          </button>
          <button onClick={reset} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            {t('pomodoro.reset')}
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-6">{t('pomodoro.sessions', { count: sessions })}</div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <label className="block text-sm text-gray-500 mb-1">{t('pomodoro.workTime')}</label>
            <input type="number" className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={workMin} onChange={(e) => setWorkMin(Number(e.target.value))} min="1" max="60" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">{t('pomodoro.breakTime')}</label>
            <input type="number" className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" value={breakMin} onChange={(e) => setBreakMin(Number(e.target.value))} min="1" max="30" />
          </div>
        </div>
      </div>
    </div>
  )
}
