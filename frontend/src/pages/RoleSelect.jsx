import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function RoleSelect(){
  const nav = useNavigate()
  return (
    <div style={{marginTop:28}}>
      <div className="card">
        <h2 style={{margin:0}}>How would you like to continue?</h2>
        <p className="subtle">Choose whether you need help or want to offer help.</p>
        <div style={{marginTop:18}} className="role-cards">
          <div className="role-card" onClick={()=>nav('/auth/requester')}>
           <img
  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=60"
  alt="request"
  style={{ borderRadius: 12 }}
/>

            <h3>Request Help</h3>
            <p className="subtle">Post requests for groceries, medicines, or transport.</p>
          </div>
          <div className="role-card" onClick={()=>nav('/auth/responder')}>
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=60" alt="volunteer"/>
            <h3>Volunteer</h3>
            <p className="subtle">Find requests and volunteer to help people nearby.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
