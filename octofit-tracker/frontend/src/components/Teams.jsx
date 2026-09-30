import ResourcePage from './ResourcePage.jsx'

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
      endpoint="/api/teams/"
      title="Teams"
      description="Training groups building consistency together."
      columns={columns}
    />
  )
}