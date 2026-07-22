const DB_NAME = 'VeterinaryDashboard'
const STORE_DASHBOARD = 'dashboard'
const STORE_SETTINGS = 'settings'
const DB_VERSION = 1

let db: IDBDatabase | null = null

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result

      // Create dashboard store
      if (!database.objectStoreNames.contains(STORE_DASHBOARD)) {
        const dashboardStore = database.createObjectStore(STORE_DASHBOARD, { keyPath: 'id', autoIncrement: true })
        dashboardStore.createIndex('date', 'date', { unique: false })
      }

      // Create settings store
      if (!database.objectStoreNames.contains(STORE_SETTINGS)) {
        database.createObjectStore(STORE_SETTINGS, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

function getDB(): IDBDatabase {
  if (!db) throw new Error('Database not initialized')
  return db
}

export async function addDashboardEntry(data: any): Promise<number> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD], 'readwrite')
    const store = transaction.objectStore(STORE_DASHBOARD)
    const request = store.add({ ...data, id: Date.now() })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as number)
  })
}

export async function updateDashboardEntry(id: number, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD], 'readwrite')
    const store = transaction.objectStore(STORE_DASHBOARD)
    const request = store.put({ ...data, id })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function getDashboardByDate(date: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD], 'readonly')
    const store = transaction.objectStore(STORE_DASHBOARD)
    const index = store.index('date')
    const request = index.get(date)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result || null)
  })
}

export async function getAllDashboardEntries(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD], 'readonly')
    const store = transaction.objectStore(STORE_DASHBOARD)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result || [])
  })
}

export async function getDashboardEntriesByMonth(year: number, month: number): Promise<any[]> {
  const entries = await getAllDashboardEntries()
  const monthStr = String(month).padStart(2, '0')
  const yearStr = String(year)
  return entries.filter(e => e.date.startsWith(`${yearStr}-${monthStr}`))
}

export async function getSettings(): Promise<any | null> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_SETTINGS], 'readonly')
    const store = transaction.objectStore(STORE_SETTINGS)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const results = request.result
      resolve(results.length > 0 ? results[0] : null)
    }
  })
}

export async function updateSettings(data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_SETTINGS], 'readwrite')
    const store = transaction.objectStore(STORE_SETTINGS)
    const request = store.put({ ...data, id: 1 })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function exportData(): Promise<string> {
  const dashboardData = await getAllDashboardEntries()
  const settings = await getSettings()
  return JSON.stringify({ dashboard: dashboardData, settings }, null, 2)
}

export async function importData(jsonData: string): Promise<void> {
  try {
    const data = JSON.parse(jsonData)
    
    // Clear existing data
    await clearAllData()
    
    // Import dashboard entries
    if (data.dashboard && Array.isArray(data.dashboard)) {
      for (const entry of data.dashboard) {
        await addDashboardEntry(entry)
      }
    }
    
    // Import settings
    if (data.settings) {
      await updateSettings(data.settings)
    }
  } catch (error) {
    throw new Error('Invalid JSON data')
  }
}

export async function clearAllData(): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD, STORE_SETTINGS], 'readwrite')
    
    const dashboardClear = transaction.objectStore(STORE_DASHBOARD).clear()
    const settingsClear = transaction.objectStore(STORE_SETTINGS).clear()

    dashboardClear.onerror = () => reject(dashboardClear.error)
    settingsClear.onerror = () => reject(settingsClear.error)
    
    transaction.oncomplete = () => resolve()
  })
}

export async function deleteDashboardEntry(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = getDB().transaction([STORE_DASHBOARD], 'readwrite')
    const store = transaction.objectStore(STORE_DASHBOARD)
    const request = store.delete(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}
