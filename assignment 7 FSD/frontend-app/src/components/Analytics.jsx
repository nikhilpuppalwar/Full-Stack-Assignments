import React, { useState, useEffect } from 'react';

const COLORS = ["#1e3a8a", "#2563eb", "#3b82f6", "#f59e0b", "#10b981"];

export default function Analytics() {
  const [data, setData] = useState(null);
  const API_BASE = "http://localhost:5001/api";

  useEffect(() => {
    fetch(`${API_BASE}/analytics`).then(r=>r.json()).then(setData).catch(()=>setData({}));
  }, []);

  if (!data) return <div className="loader"><div className="spinner"/></div>;

  const maxCount = data.byCourse?.reduce((m,c) => Math.max(m,c.count),1) || 1;
  const maxCat   = data.byCategory?.reduce((m,c) => Math.max(m,c.count),1) || 1;

  return (
    <div className="analytics-grid">
      <div className="analytics-card">
        <div className="analytics-title">📚 Course Ratings</div>
        {data.byCourse?.length ? data.byCourse.map((c,i) => (
          <div className="bar-row" key={c._id}>
            <div className="bar-meta">
              <span>{c._id}</span>
              <span>⭐ {c.avg?.toFixed(1)} ({c.count})</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{width:`${(c.avg/5)*100}%`, background: COLORS[i%5]}}/>
            </div>
          </div>
        )) : <p style={{color:"var(--muted)",fontSize:14}}>No data yet.</p>}
      </div>
      <div className="analytics-card">
        <div className="analytics-title">🏷 Feedback by Category</div>
        {data.byCategory?.length ? data.byCategory.map((c,i) => (
          <div className="bar-row" key={c._id}>
            <div className="bar-meta">
              <span>{c._id}</span>
              <span>{c.count} reviews</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{width:`${(c.count/maxCat)*100}%`, background: COLORS[(i+2)%5]}}/>
            </div>
          </div>
        )) : <p style={{color:"var(--muted)",fontSize:14}}>No data yet.</p>}
      </div>
      <div className="analytics-card" style={{gridColumn:"1/-1"}}>
        <div className="analytics-title">⭐ Rating Distribution</div>
        <div style={{display:"flex",gap:12,alignItems:"flex-end",height:100}}>
          {[1,2,3,4,5].map(r => {
            const cnt = data.byRating?.find(x=>x._id===r)?.count||0;
            const max = data.byRating?.reduce((m,x)=>Math.max(m,x.count),1)||1;
            return (
              <div key={r} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <span style={{fontSize:12,color:"var(--muted)"}}>{cnt}</span>
                <div style={{width:"100%",background:COLORS[r-1],borderRadius:"6px 6px 0 0",height:`${(cnt/max)*80}px`,minHeight:4,transition:"height .6s ease"}}/>
                <span style={{fontSize:12,color:"var(--muted)"}}>{"★".repeat(r)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
