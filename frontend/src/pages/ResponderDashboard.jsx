import React, { useEffect, useState } from 'react'
import { REQ_API } from '../api'
export default function ResponderDashboard(){
  const api = REQ_API
  const [requests, setRequests] = useState([])
  const [demoMode, setDemoMode] = useState(false)
  useEffect(()=>{ fetchRequests() }, [])
  const fetchRequests = async () => {
    try {
      const res = await fetch(api)
      if(!res.ok) throw new Error('no api')
      const data = await res.json()
      setRequests(data)
    } catch (err) {
      setDemoMode(true)
      setRequests([
        { _id:'d1', requesterName:'Anita Rao', need:'Grocery Support', details:'Need groceries', location:'Indiranagar', image:null, status:'Pending', responses:[] },
        { _id:'d2', requesterName:'Sanjeev', need:'Medicine Pickup', details:'Please collect from pharmacy', location:'MG Road', image:null, status:'Pending', responses:[] }
      ])
    }
  }
  const respond = async (id, name, contact, message) => {
    if(demoMode){
      setRequests(prev => prev.map(r=> r._id===id ? {...r, responses:[...r.responses, { volunteerName:name, volunteerContact:contact, message, respondedAt: new Date().toISOString() }], status:'Accepted'} : r ))
      return
    }
    await fetch(api + '/' + id + '/respond', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ volunteerName: name, volunteerContact: contact, message })
    })
    fetchRequests()
  }
  return (
    <div style={{marginTop:28}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Available Requests</h2>
        <p className="subtle">Browse and respond. Your responses will appear under each request.</p>
        <div style={{marginTop:12}}>
          {requests.map(r=>(
            <div key={r._id} className="card" style={{marginBottom:12}}>
              <div className="request-card">
                <div className="req-left">
                  <div className="req-need">{r.need}</div>
                  <div className="small">By {r.requesterName} • {r.location}</div>
                  <div style={{marginTop:8}}>{r.details}</div>
                  {r.image && <img src={r.image.startsWith('http')? r.image : 'http://localhost:5000'+r.image} className="wide-img" />}
                  <div className="responses" style={{marginTop:8}}>
                    {r.responses && r.responses.length>0 && (<>
                      <strong>Responses</strong>
                      {r.responses.map((resp,i)=>(
                        <div className="response" key={i}>
                          <div className="who">{resp.volunteerName}</div>
                          <div className="small">{resp.volunteerContact} • {new Date(resp.respondedAt || Date.now()).toLocaleString()}</div>
                          <div style={{marginTop:6}}>{resp.message}</div>
                        </div>
                      ))}
                    </>)}
                  </div>
                </div>
                <div className="req-right">
                  <div className={"badge "+(r.status==='Pending'?'pending':r.status==='Accepted'?'accepted':'completed')}>{r.status}</div>
                  <div className="small" style={{marginTop:18}}>{new Date(r.createdAt || Date.now()).toLocaleString()}</div>
                </div>
              </div>
              <div style={{marginTop:12,display:'flex',gap:8,alignItems:'center'}}>
                <input placeholder="Your name" id={'n'+r._id} className="input" style={{width:200}} />
                <input placeholder="Contact (phone/email)" id={'c'+r._id} className="input" style={{width:200}} />
                <input placeholder="Short message" id={'m'+r._id} className="input" style={{width:320}} />
                <button className="btn" onClick={()=> respond(r._id, document.getElementById('n'+r._id).value || 'Volunteer', document.getElementById('c'+r._id).value || '', document.getElementById('m'+r._id).value || '')}>Respond</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
