import ResourcePage from './ResourcePage.jsx'

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
      title="Workout library"
      description="Sessions curated for a range of training levels."
      columns={columns}
    />
  )
}