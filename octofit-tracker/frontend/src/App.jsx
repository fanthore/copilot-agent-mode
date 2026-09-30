import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/activities" aria-label="OctoFit activities">
          <img src={logo} alt="" />
          <span className="brand-name">OctoFit</span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-section">MOVEMENT INDEX</span>
        </Link>
        <span className="header-status"><span /> API WORKSPACE</span>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <p className="sidebar-label">TRACKER</p>
          <nav className="primary-nav" aria-label="Main navigation">
            {navigation.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <span className="nav-index">0{index + 1}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-foot">
            <span className="sidebar-rule" />
            <p>OCTOFIT TRACKER</p>
            <span>COMMUNITY / TRAINING</span>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
