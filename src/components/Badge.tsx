interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const variantStyles = {
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700'
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
