import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function BarChart() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState('10,20,30,40,50')
  const [labels, setLabels] = useState('A,B,C,D,E')
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#4F6EF7')

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const values = data.split(',').map(Number).filter((v) => !isNaN(v) && v > 0)
    const lbls = labels.split(',').map((l) => l.trim())
    if (values.length === 0) return

    const padding = { top: 40, right: 20, bottom: 50, left: 50 }
    const width = canvas.width - padding.left - padding.right
    const height = canvas.height - padding.top - padding.bottom
    const maxVal = Math.max(...values) * 1.1

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Title
    if (title) {
      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(title, canvas.width / 2, 25)
    }

    // Y-axis
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + height - (height * i / 5)
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + width, y)
      ctx.stroke()
      ctx.fillStyle = '#6B7280'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(String(Math.round(maxVal * i / 5)), padding.left - 8, y + 4)
    }

    // Bars
    const barWidth = (width / values.length) * 0.6
    const gap = (width / values.length) * 0.4

    values.forEach((val, i) => {
      const barHeight = (val / maxVal) * height
      const x = padding.left + i * (barWidth + gap) + gap / 2
      const y = padding.top + height - barHeight

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()

      // Value label
      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(val), x + barWidth / 2, y - 6)

      // X-axis label
      ctx.fillStyle = '#6B7280'
      ctx.font = '12px sans-serif'
      ctx.fillText(lbls[i] || String(i + 1), x + barWidth / 2, padding.top + height + 20)
    })
  }

  useEffect(() => { drawChart() }, [data, labels, title, color])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'chart.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('barchart.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('barchart.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="bg-white border border-[var(--border)] rounded-xl p-4">
          <canvas ref={canvasRef} width={600} height={400} className="w-full" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('barchart.title_label')}</label>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('barchart.title_placeholder')} />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('barchart.data')}</label>
            <input className="input-field font-mono" value={data} onChange={(e) => setData(e.target.value)} placeholder="10,20,30" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('barchart.labels')}</label>
            <input className="input-field font-mono" value={labels} onChange={(e) => setLabels(e.target.value)} placeholder="A,B,C" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('barchart.color')}</label>
            <input type="color" className="w-full h-10 rounded-lg cursor-pointer" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <button onClick={download} className="btn-primary w-full">{t('barchart.download')}</button>
        </div>
      </div>
    </div>
  )
}
