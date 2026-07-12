import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DiceRoller() {
  const { t } = useTranslation()
  const [sides, setSides] = useState(6)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<number[]>([])
  const [rolling, setRolling] = useState(false)

  const roll = () => {
    setRolling(true)
    setTimeout(() => {
      const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
      setResults(rolls)
      setRolling(false)
    }, 500)
  }

  const total = results.reduce((a, b) => a + b, 0)

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('dice.title')}</h2>
      <p className="text-[#909399] mb-6">{t('dice.desc')}</p>

      <div className="max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#909399] mb-1">{t('dice.sides')}</label>
            <select className="input-field" value={sides} onChange={(e) => setSides(Number(e.target.value))}>
              <option value={4}>D4</option>
              <option value={6}>D6</option>
              <option value={8}>D8</option>
              <option value={10}>D10</option>
              <option value={12}>D12</option>
              <option value={20}>D20</option>
              <option value={100}>D100</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#909399] mb-1">{t('dice.count')}</label>
            <input type="number" className="input-field" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="10" />
          </div>
        </div>

        <button onClick={roll} className="btn-primary w-full" disabled={rolling}>
          {rolling ? t('dice.rolling') : t('dice.roll')}
        </button>

        {results.length > 0 && (
          <div className="text-center">
            <div className="flex justify-center gap-3 mb-4">
              {results.map((r, i) => (
                <div key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold bg-white border-2 border-[#e5e7eb] ${rolling ? 'animate-bounce' : ''}`}>
                  {r}
                </div>
              ))}
            </div>
            {count > 1 && (
              <div className="text-lg text-[#909399]">
                {t('dice.total')}: <span className="font-bold text-[#303133]">{total}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
