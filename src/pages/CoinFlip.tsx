import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CoinFlip() {
  const { t } = useTranslation()
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [flipping, setFlipping] = useState(false)
  const [history, setHistory] = useState<('heads' | 'tails')[]>([])

  const flip = () => {
    setFlipping(true)
    setTimeout(() => {
      const r: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(r)
      setHistory((prev) => [r, ...prev].slice(0, 20))
      setFlipping(false)
    }, 600)
  }

  const stats = {
    heads: history.filter((h) => h === 'heads').length,
    tails: history.filter((h) => h === 'tails').length,
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('coin.title')}</h2>
      <p className="text-gray-500 mb-6">{t('coin.desc')}</p>

      <div className="text-center">
        <div className={`w-32 h-32 mx-auto rounded-full border-4 border-gray-300 flex items-center justify-center text-4xl font-bold transition-transform ${flipping ? 'animate-spin' : ''} ${result === 'heads' ? 'bg-amber-100 text-amber-700' : result === 'tails' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
          {result ? (result === 'heads' ? 'H' : 'T') : '?'}
        </div>

        <div className="mt-4 text-lg font-medium text-gray-700">
          {result ? t(`coin.${result}`) : t('coin.flip')}
        </div>

        <button onClick={flip} disabled={flipping} className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
          {t('coin.button')}
        </button>

        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-sm text-gray-500">{t('coin.heads')}: <span className="font-bold text-amber-600">{stats.heads}</span></div>
              <div className="text-sm text-gray-500">{t('coin.tails')}: <span className="font-bold text-blue-600">{stats.tails}</span></div>
            </div>
            <div className="flex justify-center gap-1 flex-wrap">
              {history.map((h, i) => (
                <span key={i} className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${h === 'heads' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {h === 'heads' ? 'H' : 'T'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
