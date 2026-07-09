import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function PieChart() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState('30,25,20,15,10')
  const [labels, setLabels] = useState('A,B,C,D,E')
  const [title, setTitle] = useState('')

  const colors = ['#4F6EF7', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const values = data.split(',').map(Number).filter((v) => !isNaN(v) && v > 0)
    const lbls = labels.split(',').map((l) => l.trim())
    if (values.length === 0) return

    const total = values.reduce((a, b) => a + b, 0)
    const cx = canvas.width / 2
    const cy = canvas.height / 2 + 10
    const radius = Math.min(cx, cy) - 60

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (title) {
      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(title, cx, 25)
    }

    let startAngle = -Math.PI / 2

    values.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      const midAngle = startAngle + sliceAngle / 2
      const labelX = cx + Math.cos(midAngle) * (radius * 0.7)
      const labelY = cy + Math.sin(midAngle) * (radius * 0.7)
      const pct = Math.round((val / total) * 100)

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${pct}%`, labelX, labelY + 5)

      startAngle += sliceAngle
    })

    // Legend
    const legendX = 20
    let legendY = canvas.height - 30
    ctx.font = '12px sans-serif'
    lbls.forEach((lbl, i) => {
      if (i < values.length) {
        const x = legendX + (i % 3) * 180
        const y = legendY - Math.floor(i / 3) * 20
        ctx.fillStyle = colors[i % colors.length]
        ctx.fillRect(x, y - 8, 12, 12)
        ctx.fillStyle = '#6B7280'
        ctx.textAlign = 'left'
        ctx.fillText(`${lbl}: ${values[i]}`, x + 16, y + 2)
      }
    })
  }

  useEffect(() => { drawChart() }, [data, labels, title])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'pie-chart.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('piechart.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('piechart.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="bg-white border border-[var(--border)] rounded-xl p-4">
          <canvas ref={canvasRef} width={500} height={400} className="w-full" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('piechart.title_label')}</label>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('piechart.title_placeholder')} />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('piechart.data')}</label>
            <input className="input-field font-mono" value={data} onChange={(e) => setData(e.target.value)} placeholder="30,25,20" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('piechart.labels')}</label>
            <input className="input-field font-mono" value={labels} onChange={(e) => setLabels(e.target.value)} placeholder="A,B,C" />
          </div>
          <button onClick={download} className="btn-primary w-full">{t('piechart.download')}</button>
        </div>
      </div>
    </div>
  )
}
