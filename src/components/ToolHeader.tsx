interface Props {
  title: string
  desc: string
}

export default function ToolHeader({ title, desc }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-gray-500">{desc}</p>
    </div>
  )
}
