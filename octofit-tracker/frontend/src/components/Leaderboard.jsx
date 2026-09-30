import ResourcePage from './ResourcePage.jsx'
import { API_BASE_URL } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/leaderboard/`

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      endpoint={endpoint}
      title="Leaderboard"
      description="Points earned by athletes and teams."
      columns={columns}
    />
  )
}