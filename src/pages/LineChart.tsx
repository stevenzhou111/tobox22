import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LineChart() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState('10,25,18,32,28,45,38')
  const [labels, setLabels] = useState('Mon,Tue,Wed,Thu,Fri,Sat,Sun')
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#4F6EF7')

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const values = data.split(',').map(Number).filter((v) => !isNaN(v))
    const lbls = labels.split(',').map((l) => l.trim())
    if (values.length < 2) return

    const padding = { top: 40, right: 20, bottom: 50, left: 50 }
    const width = canvas.width - padding.left - padding.right
    const height = canvas.height - padding.top - padding.bottom
    const maxVal = Math.max(...values) * 1.1
    const minVal = 0

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (title) {
      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(title, canvas.width / 2, 25)
    }

    // Grid
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

    // Points and line
    const points: [number, number][] = values.map((val, i) => [
      padding.left + (i / (values.length - 1)) * width,
      padding.top + height - ((val - minVal) / (maxVal - minVal)) * height,
    ])

    // Area fill
    ctx.beginPath()
    ctx.moveTo(points[0][0], padding.top + height)
    points.forEach((p) => ctx.lineTo(p[0], p[1]))
    ctx.lineTo(points[points.length - 1][0], padding.top + height)
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + height)
    gradient.addColorStop(0, color + '40')
    gradient.addColorStop(1, color + '05')
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    points.forEach((p) => ctx.lineTo(p[0], p[1]))
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Points and labels
    points.forEach((p, i) => {
      ctx.beginPath()
      ctx.arc(p[0], p[1], 5, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 11px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(values[i]), p[0], p[1] - 12)

      ctx.fillStyle = '#6B7280'
      ctx.font = '12px sans-serif'
      ctx.fillText(lbls[i] || String(i + 1), p[0], padding.top + height + 20)
    })
  }

  useEffect(() => { drawChart() }, [data, labels, title, color])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'line-chart.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('linechart.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('linechart.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="bg-white border border-[var(--border)] rounded-xl p-4">
          <canvas ref={canvasRef} width={600} height={400} className="w-full" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('linechart.title_label')}</label>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('linechart.title_placeholder')} />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('linechart.data')}</label>
            <input className="input-field font-mono" value={data} onChange={(e) => setData(e.target.value)} placeholder="10,25,18" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('linechart.labels')}</label>
            <input className="input-field font-mono" value={labels} onChange={(e) => setLabels(e.target.value)} placeholder="Mon,Tue,Wed" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('linechart.color')}</label>
            <input type="color" className="w-full h-10 rounded-lg cursor-pointer" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <button onClick={download} className="btn-primary w-full">{t('linechart.download')}</button>
        </div>
      </div>
    </div>
  )
}
