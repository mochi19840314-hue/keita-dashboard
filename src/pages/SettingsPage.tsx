import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function SettingsPage() {
  return (
    <div>
      <Header title="Settings" />
      <div className="p-4 space-y-4 mb-8">
        <Card className="space-y-4">
          <Input label="Hospital Name" placeholder="Enter hospital name" />
          <Input label="Daily Sales Goal" type="number" placeholder="Enter daily goal" />
        </Card>
        <Card className="space-y-3">
          <p className="font-medium text-gray-900">Backup & Restore</p>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">Export Data as JSON</Button>
            <Button variant="secondary" className="w-full">Import from JSON</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
