import  React  from "react"
import { Router } from "@reach/router"
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './views/Dashboard'

const router = () => {
  return <Router>
    <SignIn path="/" />
    <SignUp path="signup" show="true"/>
    <Dashboard path="dashboard" />
  </Router>
}


export default router
