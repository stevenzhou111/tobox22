import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const unitCategories = [
  {
    name: 'length',
    units: [
      { key: 'mm', label: '毫米 (mm)', factor: 0.001 },
      { key: 'cm', label: '厘米 (cm)', factor: 0.01 },
      { key: 'm', label: '米 (m)', factor: 1 },
      { key: 'km', label: '千米 (km)', factor: 1000 },
      { key: 'in', label: '英寸 (in)', factor: 0.0254 },
      { key: 'ft', label: '英尺 (ft)', factor: 0.3048 },
      { key: 'yd', label: '码 (yd)', factor: 0.9144 },
      { key: 'mi', label: '英里 (mi)', factor: 1609.344 },
    ],
  },
  {
    name: 'weight',
    units: [
      { key: 'mg', label: '毫克 (mg)', factor: 0.000001 },
      { key: 'g', label: '克 (g)', factor: 0.001 },
      { key: 'kg', label: '千克 (kg)', factor: 1 },
      { key: 't', label: '吨 (t)', factor: 1000 },
      { key: 'oz', label: '盎司 (oz)', factor: 0.028349523 },
      { key: 'lb', label: '磅 (lb)', factor: 0.453592 },
    ],
  },
  {
    name: 'temperature',
    units: [
      { key: 'c', label: '摄氏度 (°C)' },
      { key: 'f', label: '华氏度 (°F)' },
      { key: 'k', label: '开尔文 (K)' },
    ],
  },
  {
    name: 'area',
    units: [
      { key: 'mm2', label: '平方毫米 (mm²)', factor: 0.000001 },
      { key: 'cm2', label: '平方厘米 (cm²)', factor: 0.0001 },
      { key: 'm2', label: '平方米 (m²)', factor: 1 },
      { key: 'km2', label: '平方千米 (km²)', factor: 1000000 },
      { key: 'ha', label: '公顷 (ha)', factor: 10000 },
      { key: 'ac', label: '英亩 (ac)', factor: 4046.86 },
      { key: 'ft2', label: '平方英尺 (ft²)', factor: 0.0929 },
    ],
  },
  {
    name: 'volume',
    units: [
      { key: 'ml', label: '毫升 (mL)', factor: 0.001 },
      { key: 'l', label: '升 (L)', factor: 1 },
      { key: 'gal', label: '加仑 (gal)', factor: 3.78541 },
      { key: 'qt', label: '夸脱 (qt)', factor: 0.946353 },
      { key: 'pt', label: '品脱 (pt)', factor: 0.473176 },
      { key: 'cup', label: '杯 (cup)', factor: 0.236588 },
      { key: 'floz', label: '液盎司 (fl oz)', factor: 0.0295735 },
    ],
  },
  {
    name: 'speed',
    units: [
      { key: 'ms', label: '米/秒 (m/s)', factor: 1 },
      { key: 'kmh', label: '千米/时 (km/h)', factor: 0.277778 },
      { key: 'mph', label: '英里/时 (mph)', factor: 0.44704 },
      { key: 'kn', label: '节 (kn)', factor: 0.514444 },
    ],
  },
  {
    name: 'time',
    units: [
      { key: 'ms', label: '毫秒 (ms)', factor: 0.001 },
      { key: 's', label: '秒 (s)', factor: 1 },
      { key: 'min', label: '分钟 (min)', factor: 60 },
      { key: 'h', label: '小时 (h)', factor: 3600 },
      { key: 'd', label: '天 (d)', factor: 86400 },
      { key: 'w', label: '周 (w)', factor: 604800 },
    ],
  },
]

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number
  switch (from) {
    case 'c': celsius = value; break
    case 'f': celsius = (value - 32) * 5 / 9; break
    case 'k': celsius = value - 273.15; break
    default: celsius = value
  }
  switch (to) {
    case 'c': return celsius
    case 'f': return celsius * 9 / 5 + 32
    case 'k': return celsius + 273.15
    default: return celsius
  }
}

export default function UnitConverter() {
  const { t } = useTranslation()
  const [category, setCategory] = useState(0)
  const [fromUnit, setFromUnit] = useState(0)
  const [toUnit, setToUnit] = useState(1)
  const [inputValue, setInputValue] = useState('1')

  const currentCategory = unitCategories[category]

  const convert = (): string => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) return ''

    if (currentCategory.name === 'temperature') {
      return convertTemperature(value, currentCategory.units[fromUnit].key, currentCategory.units[toUnit].key).toFixed(6)
    }

    const fromUnitData = currentCategory.units[fromUnit] as { key: string; label: string; factor: number }
    const toUnitData = currentCategory.units[toUnit] as { key: string; label: string; factor: number }
    const baseValue = value * fromUnitData.factor
    return (baseValue / toUnitData.factor).toFixed(6)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('unit.title')}</h2>
      <p className="text-gray-500 mb-6">{t('unit.desc')}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {unitCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => { setCategory(i); setFromUnit(0); setToUnit(1) }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${category === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t(`unit.categories.${cat.name}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('unit.from')}</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={fromUnit}
            onChange={(e) => setFromUnit(Number(e.target.value))}
          >
            {currentCategory.units.map((u, i) => (
              <option key={u.key} value={i}>{u.label}</option>
            ))}
          </select>
        </div>

        <button onClick={swapUnits} className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-xl">
          ⇄
        </button>

        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('unit.result')}</label>
          <div className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 font-mono min-h-[44px]">
            {convert()}
          </div>
          <select
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            value={toUnit}
            onChange={(e) => setToUnit(Number(e.target.value))}
          >
            {currentCategory.units.map((u, i) => (
              <option key={u.key} value={i}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
