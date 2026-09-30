import ResourcePage from './ResourcePage.jsx'
import { API_BASE_URL } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : `${API_BASE_URL}/activities/`

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'user', label: 'Athlete' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'caloriesBurned', label: 'Calories' },
  { key: 'performedAt', label: 'Date', render: formatDate },
]

export default function Activities() {
  return (
    <ResourcePage
      resource="activities"
      endpoint={endpoint}
      title="Activity log"
      description="Training sessions recorded across the community."
      columns={columns}
    />
  )
}