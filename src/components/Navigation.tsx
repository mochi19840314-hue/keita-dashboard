interface NavigationItem {
  id: string
  label: string
  icon: string
}

const items: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'monthly', label: 'Monthly', icon: '📅' },
  { id: 'yearly', label: 'Yearly', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]

interface NavigationProps {
  currentPage: string
  onPageChange: (page: any) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around h-20 px-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
            currentPage === item.id
              ? 'text-emerald-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl mb-1">{item.icon}</span>
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
