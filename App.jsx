import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RoleSelect from './pages/RoleSelect'
import Auth from './pages/Auth'
import RequesterDashboard from './pages/RequesterDashboard'
import ResponderDashboard from './pages/ResponderDashboard'
import { authUser } from './api'
function Header(){
  const user = authUser()
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">NH</div>
        <div><div className="title">Neumo Help</div><div className="subtle">Soft UI — Laptop Ready</div></div>
      </div>
      <div className="top-actions">
        <Link to="/"><button className="btn ghost">Home</button></Link>
        {!user && <Link to="/auth/requester"><button className="btn">Request Help</button></Link>}
        {!user && <Link to="/auth/responder"><button className="btn">Volunteer</button></Link>}
        {user && <div className="subtle">Hi, {user.name} ({user.role})</div>}
      </div>
    </header>
  )
}
export default function App(){
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={<RoleSelect/>} />
          <Route path="/auth/:role" element={<Auth/>} />
          <Route path="/requester" element={<RequesterDashboard/>} />
          <Route path="/responder" element={<ResponderDashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
