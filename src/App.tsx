import { useState, useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { MonthlyPage } from './pages/MonthlyPage'
import { YearlyPage } from './pages/YearlyPage'
import { SettingsPage } from './pages/SettingsPage'
import { initDB } from './lib/db'

type Page = 'home' | 'monthly' | 'yearly' | 'settings'

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [dbReady, setDbReady] = useState(false)

  useEffect(() => {
    initDB().then(() => setDbReady(true))
  }, [])

  if (!dbReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-emerald-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-emerald-600 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-20">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'monthly' && <MonthlyPage />}
        {currentPage === 'yearly' && <YearlyPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </div>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
