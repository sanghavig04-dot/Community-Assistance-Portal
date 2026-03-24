import React, { useEffect, useState } from 'react'
import { REQ_API, authUser } from '../api'
export default function RequesterDashboard(){
  const api = REQ_API
  const [requests, setRequests] = useState([])
  const [form, setForm] = useState({ requesterName:'', phone:'', need:'', location:'', details:'' })
  const [image, setImage] = useState(null)
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
      setRequests([{ _id:'d1', requesterName:'Anita Rao', need:'Grocery Support', details:'Need groceries', location:'Indiranagar', image:null, status:'Pending', responses:[] }])
    }
  }
  const submit = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    const user = authUser()
    fd.append('requesterId', user ? user.id : '')
    fd.append('requesterName', form.requesterName || (user?user.name:'Anonymous'))
    fd.append('phone', form.phone)
    fd.append('need', form.need)
    fd.append('location', form.location)
    fd.append('details', form.details)
    if(image) fd.append('image', image)
    if(demoMode){ setRequests(prev=>[{...form,_id:'local'+Date.now(),responses:[],status:'Pending',requesterName:form.requesterName||'You'} ,...prev]); setForm({requesterName:'',phone:'',need:'',location:'',details:''}); return }
    await fetch(api,{ method:'POST', body: fd })
    fetchRequests()
  }
  return (
    <div style={{marginTop:28}}>
      <div className="grid">
        <div className="card">
          <h2 style={{marginTop:0}}>Post a Help Request</h2>
          <p className="subtle">Fill details and post. Volunteers will respond.</p>
          <form onSubmit={submit}>
            <input className="input" placeholder="Your name" value={form.requesterName} onChange={e=>setForm({...form,requesterName:e.target.value})} required />
            <div style={{height:10}} />
            <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <div style={{height:10}} />
            <input className="input" placeholder="Need (e.g., Food, Medicine)" value={form.need} onChange={e=>setForm({...form,need:e.target.value})} required />
            <div style={{height:10}} />
            <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
            <div style={{height:10}} />
            <textarea className="input" placeholder="Details" value={form.details} onChange={e=>setForm({...form,details:e.target.value})}></textarea>
            <div style={{height:10}} />
            <input type="file" onChange={e=>setImage(e.target.files[0])} />
            <div style={{height:14}} />
            <button className="btn" type="submit">Post Request</button>
          </form>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Your Requests</h3>
          <p className="subtle">View requests you posted and responses from volunteers.</p>
          <div style={{marginTop:12}}>
            {requests.map(r=>(
              <div key={r._id} className="card" style={{marginBottom:12}}>
                <div className="request-card">
                  <div className="req-left">
                    <div className="req-need">{r.need}</div>
                    <div className="small">By {r.requesterName} • {r.location}</div>
                    <div style={{marginTop:8}}>{r.details}</div>
                    {r.image && <img src={r.image.startsWith('http')? r.image : 'http://localhost:5000'+r.image} className="wide-img" />}
                    {r.responses && r.responses.length>0 && <div className="responses">
                      <strong>Responses</strong>
                      {r.responses.map((resp,i)=>(
                        <div className="response" key={i}>
                          <div className="who">{resp.volunteerName}</div>
                          <div className="small">{resp.volunteerContact} • {new Date(resp.respondedAt || Date.now()).toLocaleString()}</div>
                          <div style={{marginTop:6}}>{resp.message}</div>
                        </div>
                      ))}
                    </div>}
                  </div>
                  <div className="req-right">
                    <div className={"badge "+(r.status==='Pending'?'pending':r.status==='Accepted'?'accepted':'completed')}>{r.status}</div>
                    <div className="small" style={{marginTop:18}}>{new Date(r.createdAt || Date.now()).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
