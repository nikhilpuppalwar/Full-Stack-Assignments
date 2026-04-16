import React, { useState } from 'react';
import { Stars } from './FeedbackCard';

export const CATEGORIES = ["Overall","Teaching Quality","Course Content","Support","Infrastructure"];

export default function SubmitForm({ onSubmitted }) {
  const [form, setForm] = useState({
    studentName:"", course:"", instructor:"",
    rating:0, comment:"", category:"Overall"
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({...f, [k]:v}));

  const API_BASE = "http://localhost:5001/api";

  const handleSubmit = async () => {
    if (!form.studentName || !form.course || !form.instructor || !form.rating || !form.comment)
      return onSubmitted(null, "Please fill all fields and select a rating.");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/feedbacks`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm({ studentName:"", course:"", instructor:"", rating:0, comment:"", category:"Overall" });
      onSubmitted(data);
    } catch(e) { onSubmitted(null, e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="form-card">
      <div className="form-title">Share Your Feedback</div>
      <div className="form-sub">Help improve the learning experience for everyone.</div>
      <div className="form-grid">
        <div className="form-group">
          <label>Your Name</label>
          <input placeholder="e.g. Aarav Mehta" value={form.studentName} onChange={e=>set("studentName",e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input placeholder="e.g. Data Structures" value={form.course} onChange={e=>set("course",e.target.value)} />
        </div>
        <div className="form-group">
          <label>Instructor</label>
          <input placeholder="e.g. Dr. Sharma" value={form.instructor} onChange={e=>set("instructor",e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={form.category} onChange={e=>set("category",e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label>Rating</label>
          <div className="rating-row">
            <Stars value={form.rating} onChange={v=>set("rating",v)}/>
            <span className="rating-label">{["","Poor","Fair","Good","Great","Excellent"][form.rating]||"Select"}</span>
          </div>
        </div>
        <div className="form-group full">
          <label>Comment</label>
          <textarea placeholder="Describe your experience in detail..." value={form.comment} onChange={e=>set("comment",e.target.value)} />
        </div>
      </div>
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting…" : "Submit Feedback →"}
      </button>
    </div>
  );
}
