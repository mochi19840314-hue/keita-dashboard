interface StatBoxProps {
  label: string
  value: string | number
  icon: string
  trend?: number
  onClick?: () => void
}

export function StatBox({ label, value, icon, trend, onClick }: StatBoxProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-2 ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}
