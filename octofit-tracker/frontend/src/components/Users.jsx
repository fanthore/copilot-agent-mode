import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
]

export default function Users() {
  return (
    <ResourcePage
      resource="users"
      title="Athletes"
      description="People taking part in the OctoFit community."
      columns={columns}
    />
  )
}