import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AUTH_API } from '../api'
export default function Auth(){
  const { role } = useParams()
  const nav = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    const url = AUTH_API + (mode==='register' ? '/register' : '/login')
    const body = mode==='register' ? { name, email, password, role } : { email, password }
    const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    const data = await res.json()
    if(res.ok){ localStorage.setItem('user', JSON.stringify(data.user)); nav(role==='requester'?'/requester':'/responder') }
    else alert(data.message || 'Auth failed')
  }
  return (
    <div style={{marginTop:28}}>
      <div className="card" style={{maxWidth:900,margin:'0 auto',display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <h2 style={{marginTop:0}}>{role==='requester'?'Requester':'Volunteer'} - {mode==='login'?'Login':'Register'}</h2>
          <p className="subtle">Please {mode==='login'?'login':'create an account'} to continue.</p>
          <form onSubmit={submit} style={{marginTop:12}}>
            {mode==='register' && <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />}
            <div style={{height:12}} />
            <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <div style={{height:12}} />
            <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <div style={{height:12}} />
            <div style={{display:'flex',gap:8}}>
              <button className="btn" type="submit">{mode==='login'?'Login':'Register'}</button>
              <button type="button" className="btn ghost" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Switch to Register':'Switch to Login'}</button>
            </div>
          </form>
        </div>
        <div style={{width:320}}>
          <img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=60" alt="ai-illustration" style={{width:'100%',borderRadius:12}} />
          <p className="subtle" style={{marginTop:12}}>You are registering as a <strong>{role}</strong>.</p>
        </div>
      </div>
    </div>
  )
}
