export interface DashboardData {
  id?: string
  date: string
  todaySales: number
  patientCount: number
  newPatients: number
  surgeryCount: number
  healthCheckups: number
  groomingCount: number
  expenses: number
  bankBalance: number
  directorMemo: string
}

export interface MonthlyData {
  id?: string
  month: string
  year: number
  sales: number
  profit: number
  profitMargin: number
  events: DashboardData[]
}

export interface Settings {
  id?: string
  hospitalName: string
  dailySalesGoal: number
  lastBackup?: string
}

export interface ChartDataPoint {
  month: string
  sales: number
  profit: number
  profitMargin: number
}
