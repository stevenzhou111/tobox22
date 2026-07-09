interface Props {
  title: string
  desc: string
  icon?: string
  color?: string
}

export default function ToolHeader({ title, desc, icon, color }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${color || 'bg-blue-500'} text-white flex items-center justify-center font-mono font-bold text-sm`}>
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-bold text-[var(--text)]">{title}</h1>
      </div>
      <p className="text-[var(--text-secondary)]">{desc}</p>
    </div>
  )
}
