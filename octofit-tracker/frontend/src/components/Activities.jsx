import ResourcePage from './ResourcePage.jsx'

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
      endpoint="/api/activities/"
      title="Activity log"
      description="Training sessions recorded across the community."
      columns={columns}
    />
  )
}