import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { StatBox } from '../components/StatBox'

export function HomePage() {
  return (
    <div>
      <Header title="Dashboard" subtitle="Today's Overview" />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBox label="Today's Sales" value="¥0" icon="💰" />
          <StatBox label="Patients" value="0" icon="🐾" />
          <StatBox label="New Patients" value="0" icon="✨" />
          <StatBox label="Surgery" value="0" icon="🏥" />
          <StatBox label="Checkups" value="0" icon="💊" />
          <StatBox label="Grooming" value="0" icon="✂️" />
        </div>
        <Card className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Expenses</span>
            <span className="text-xl font-bold text-gray-900">¥0</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Profit</span>
            <span className="text-xl font-bold text-emerald-600">¥0</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Profit Margin</span>
            <span className="text-xl font-bold text-gray-900">0%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Bank Balance</span>
            <span className="text-xl font-bold text-gray-900">¥0</span>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-700 mb-2">Director's Memo</p>
          <p className="text-gray-500 text-sm">No memo</p>
        </Card>
      </div>
    </div>
  )
}
