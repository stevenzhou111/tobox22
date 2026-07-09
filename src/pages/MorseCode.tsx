import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const charToMorse: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
  '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.',
}

const morseToChar = Object.fromEntries(Object.entries(charToMorse).map(([k, v]) => [v, k]))

export default function MorseCode() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')
  const [mode, setMode] = useState<'text' | 'morse'>('text')

  const textToMorse = () => {
    const result = text.toUpperCase().split('').map((c) => charToMorse[c] || c).join(' ')
    setMorse(result)
  }

  const morseToText = () => {
    const result = morse.split(' ').map((c) => morseToChar[c] || c).join('')
    setText(result)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('morse.title')}</h2>
      <p className="text-gray-500 mb-6">{t('morse.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('morse.text')}</label>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('morse.textPlaceholder')}
          />
          <button onClick={textToMorse} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('morse.textToMorse')}
          </button>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('morse.morse')}</label>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={morse}
            onChange={(e) => setMorse(e.target.value)}
            placeholder={t('morse.morsePlaceholder')}
          />
          <button onClick={morseToText} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('morse.morseToText')}
          </button>
        </div>
      </div>
    </div>
  )
}
