import ResourcePage from './ResourcePage.jsx'
import { API_BASE_URL } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/teams/`

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  {
    key: 'members',
    label: 'Members',
    render: (members) => Array.isArray(members) ? members.length : members,
  },
]

export default function Teams() {
  return (
    <ResourcePage
      resource="teams"
      endpoint={endpoint}
      title="Teams"
      description="Training groups building consistency together."
      columns={columns}
    />
  )
}