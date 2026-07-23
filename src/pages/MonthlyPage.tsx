import { Header } from '../components/Header'
import { Card } from '../components/Card'

export function MonthlyPage() {
  return (
    <div>
      <Header title="Monthly" subtitle="View monthly performance" />
      <div className="p-4 space-y-4">
        <Card>
          <p className="text-gray-500 text-center py-8">Calendar coming soon</p>
        </Card>
      </div>
    </div>
  )
}
