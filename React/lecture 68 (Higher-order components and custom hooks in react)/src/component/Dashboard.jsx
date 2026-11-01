import withAuth from "../utils/withAuth"

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}


export const AuthDashboard = withAuth(Dashboard)