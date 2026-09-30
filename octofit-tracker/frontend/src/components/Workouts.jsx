import ResourcePage from './ResourcePage.jsx'
import { API_BASE_URL } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/workouts/`

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'difficulty', label: 'Level', render: (value) => value?.toUpperCase() },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'exercises', label: 'Exercises' },
]

export default function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      endpoint={endpoint}
      title="Workout library"
      description="Sessions curated for a range of training levels."
      columns={columns}
    />
  )
}