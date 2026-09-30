import ResourcePage from './ResourcePage.jsx'
import { API_BASE_URL } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : `${API_BASE_URL}/users/`

const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
]

export default function Users() {
  return (
    <ResourcePage
      resource="users"
      endpoint={endpoint}
      title="Athletes"
      description="People taking part in the OctoFit community."
      columns={columns}
    />
  )
}