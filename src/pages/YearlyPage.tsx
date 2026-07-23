import { Header } from '../components/Header'
import { Card } from '../components/Card'

export function YearlyPage() {
  return (
    <div>
      <Header title="Yearly" subtitle="View yearly performance" />
      <div className="p-4 space-y-4">
        <Card>
          <p className="text-gray-500 text-center py-8">Yearly charts coming soon</p>
        </Card>
      </div>
    </div>
  )
}
