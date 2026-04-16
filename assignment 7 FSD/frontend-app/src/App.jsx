import React, { useState, useEffect, useCallback } from 'react';
import FeedbackCard from './components/FeedbackCard';
import SubmitForm, { CATEGORIES } from './components/SubmitForm';
import Analytics from './components/Analytics';
import './index.css';

const API_BASE = "http://localhost:5001/api";

function Toast({ msg, error, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className={`toast ${error?"error":""}`}>{msg}</div>;
}

export default function App() {
  const [tab, setTab] = useState("reviews");
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ course:"", instructor:"", category:"", rating:"", sort:"-createdAt" });

  const showToast = (msg, error=false) => setToast({ msg, error });

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.course) params.set("course", filters.course);
      if (filters.instructor) params.set("instructor", filters.instructor);
      if (filters.category) params.set("category", filters.category);
      if (filters.rating) params.set("rating", filters.rating);
      params.set("sort", filters.sort);
      const res = await fetch(`${API_BASE}/feedbacks?${params}`);
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
      setStats(data.stats || {});
    } catch(e) { showToast("Could not reach backend. Is the server running?", true); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { if(tab==="reviews") loadFeedbacks(); }, [tab, loadFeedbacks]);

  const handleSubmitted = (fb, err) => {
    if (err) { showToast(err, true); return; }
    showToast("Feedback submitted successfully!");
    setTab("reviews");
  };

  const handleHelpful = async (id) => {
    await fetch(`${API_BASE}/feedbacks/${id}/helpful`, { method:"PATCH" });
    setFeedbacks(prev => prev.map(f => f._id===id ? {...f, helpful:f.helpful+1}:f));
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/feedbacks/${id}`, { method:"DELETE" });
    setFeedbacks(prev => prev.filter(f => f._id!==id));
    showToast("Feedback removed.");
  };

  const handleReply = async (id, replyText) => {
    try {
      const res = await fetch(`${API_BASE}/feedbacks/${id}/reply`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText })
      });
      if(res.ok) {
        setFeedbacks(prev => prev.map(f => f._id === id ? {...f, reply: replyText}:f));
        showToast("Reply posted successfully!");
      }
    } catch(e) {
      showToast("Could not post reply.", true);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <div className="logo-icon">📡</div>
          <div className="logo-text">Edu<span>Pulse</span></div>
        </div>
        <nav className="nav">
          {[["reviews","📋 Reviews"],["submit","✍ Submit"],["analytics","📊 Analytics"]].map(([id,label])=>(
            <button key={id} className={`nav-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </nav>
      </div>

      {/* Stats */}
      {tab==="reviews" && (
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Total Reviews</div>
            <div className="stat-value purple">{stats.total ?? "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average Rating</div>
            <div className="stat-value gold">{stats.avgRating ? stats.avgRating.toFixed(2) : "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Showing Now</div>
            <div className="stat-value teal">{feedbacks.length}</div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {tab==="reviews" && (
        <>
          <div className="filter-bar">
            <input placeholder="🔍 Course name…" value={filters.course}
              onChange={e=>setFilters(f=>({...f,course:e.target.value}))} />
            <input placeholder="👩‍🏫 Instructor…" value={filters.instructor}
              onChange={e=>setFilters(f=>({...f,instructor:e.target.value}))} />
            <select value={filters.category} onChange={e=>setFilters(f=>({...f,category:e.target.value}))}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
            <select value={filters.rating} onChange={e=>setFilters(f=>({...f,rating:e.target.value}))}>
              <option value="">All Ratings</option>
              {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Stars</option>)}
            </select>
            <span className="sort-label">Sort:</span>
            <select value={filters.sort} onChange={e=>setFilters(f=>({...f,sort:e.target.value}))} style={{maxWidth:160}}>
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="-rating">Highest Rated</option>
              <option value="rating">Lowest Rated</option>
              <option value="-helpful">Most Helpful</option>
            </select>
          </div>
          {loading
            ? <div className="loader"><div className="spinner"/></div>
            : feedbacks.length === 0
              ? <div className="empty">
                  <div className="empty-icon">📭</div>
                  <div className="empty-text">No feedback yet</div>
                  <div style={{color:"var(--muted)",fontSize:14}}>Be the first to share your experience.</div>
                </div>
              : <div className="cards-grid">
                  {feedbacks.map(fb => (
                    <FeedbackCard key={fb._id} fb={fb} onHelpful={handleHelpful} onDelete={handleDelete} onReply={handleReply}/>
                  ))}
                </div>
          }
        </>
      )}

      {/* Submit Tab */}
      {tab==="submit" && <SubmitForm onSubmitted={handleSubmitted}/>}

      {/* Analytics Tab */}
      {tab==="analytics" && <Analytics/>}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} error={toast.error} onDone={()=>setToast(null)}/>}
    </div>
  );
}
