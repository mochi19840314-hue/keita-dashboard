import { DashboardData, ChartDataPoint } from './types'

export function calculateProfit(sales: number, expenses: number): number {
  return sales - expenses
}

export function calculateProfitMargin(sales: number, profit: number): number {
  if (sales === 0) return 0
  return (profit / sales) * 100
}

export function calculateGoalAchievement(sales: number, goal: number): number {
  if (goal === 0) return 0
  return (sales / goal) * 100
}

export function getTodayDate(): string {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month - 1] || ''
}

export function getMonthlyChartData(entries: DashboardData[]): ChartDataPoint[] {
  const monthMap: { [key: string]: { sales: number; expenses: number; count: number } } = {}

  entries.forEach(entry => {
    const date = new Date(entry.date)
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!monthMap[month]) {
      monthMap[month] = { sales: 0, expenses: 0, count: 0 }
    }
    monthMap[month].sales += entry.todaySales
    monthMap[month].expenses += entry.expenses
    monthMap[month].count += 1
  })

  return Object.entries(monthMap)
    .map(([month, data]) => {
      const profit = data.sales - data.expenses
      return {
        month: getMonthName(parseInt(month.split('-')[1])),
        sales: data.sales,
        profit,
        profitMargin: calculateProfitMargin(data.sales, profit)
      }
    })
    .sort((a, b) => entries.findIndex(e => e.date.includes(a.month)) - entries.findIndex(e => e.date.includes(b.month)))
}

export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[date.getDay()]
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}
