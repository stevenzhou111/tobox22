import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Calculator() {
  const { t } = useTranslation()
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState<string | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [reset, setReset] = useState(false)

  const inputDigit = (d: string) => {
    setDisplay(reset ? d : display === '0' ? d : display + d)
    setReset(false)
  }

  const inputDot = () => {
    if (reset) { setDisplay('0.'); setReset(false); return }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const clear = () => { setDisplay('0'); setPrev(null); setOp(null) }

  const performOp = (nextOp: string) => {
    const current = parseFloat(display)
    if (prev !== null && op) {
      const p = parseFloat(prev)
      let result = 0
      switch (op) {
        case '+': result = p + current; break
        case '-': result = p - current; break
        case '*': result = p * current; break
        case '/': result = current !== 0 ? p / current : 0; break
      }
      setDisplay(String(result))
      setPrev(String(result))
    } else {
      setPrev(display)
    }
    setOp(nextOp)
    setReset(true)
  }

  const equals = () => {
    if (prev === null || op === null) return
    performOp('=')
    setOp(null)
    setPrev(null)
  }

  const percent = () => setDisplay(String(parseFloat(display) / 100))
  const negate = () => setDisplay(String(-parseFloat(display)))

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('calculator.title')}</h2>
      <p className="text-[#909399] mb-6">{t('calculator.desc')}</p>

      <div className="max-w-xs mx-auto">
        <div className="bg-[#303133] rounded-t-lg p-4 text-right">
          <div className="text-3xl font-mono text-white truncate">{display}</div>
        </div>
        <div className="bg-[#f5f7fa] rounded-b-lg p-2 grid grid-cols-4 gap-2">
          {buttons.map((row, i) => (
            row.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') clear()
                  else if (btn === '±') negate()
                  else if (btn === '%') percent()
                  else if (btn === '=') equals()
                  else if (['+', '-', '*', '/'].includes(btn)) performOp(btn)
                  else if (btn === '.') inputDot()
                  else inputDigit(btn)
                }}
                className={`h-12 rounded-lg font-medium text-lg transition-colors ${
                  btn === '0' ? 'col-span-2' : ''
                } ${
                  ['+', '-', '*', '/', '='].includes(btn)
                    ? 'bg-[#ff9500] text-white hover:bg-[#ffaa33]'
                    : ['C', '±', '%'].includes(btn)
                    ? 'bg-[#a5a5a5] text-[#303133] hover:bg-[#c5c5c5]'
                    : 'bg-white text-[#303133] hover:bg-[#e5e5e5] border border-[#e5e5e5]'
                }`}
              >
                {btn}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}
