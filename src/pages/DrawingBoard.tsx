import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function DrawingBoard() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen')
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setLastPos(getPos(e))
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !lastPos) return

    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    setLastPos(pos)
  }

  const endDraw = () => {
    setIsDrawing(false)
    setLastPos(null)
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'drawing.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB']

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('drawboard.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('drawboard.desc')}</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTool('pen')}
            className={`tab-btn ${tool === 'pen' ? 'active' : ''}`}
          >
            {t('drawboard.pen')}
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`tab-btn ${tool === 'eraser' ? 'active' : ''}`}
          >
            {t('drawboard.eraser')}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-secondary)]">{t('drawboard.size')}:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-[var(--text)]">{brushSize}</span>
        </div>

        <div className="flex gap-1">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-gray-300'}`}
              style={{ background: c }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={clear} className="btn-secondary text-sm">
            {t('clear')}
          </button>
          <button onClick={save} className="btn-primary text-sm">
            {t('drawboard.save')}
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full border border-[var(--border)] rounded-lg cursor-crosshair bg-white"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />
    </div>
  )
}
