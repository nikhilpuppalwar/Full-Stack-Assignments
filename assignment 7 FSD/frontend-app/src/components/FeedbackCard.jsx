import React, { useState } from 'react';

const initials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });

export function Stars({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="stars">
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={`star ${(hov||value) >= n ? "star-filled":"star-empty"}`}
          onMouseEnter={() => onChange && setHov(n)}
          onMouseLeave={() => onChange && setHov(0)}
          onClick={() => onChange && onChange(n)}
        >★</span>
      ))}
    </div>
  );
}

export default function FeedbackCard({ fb, onHelpful, onDelete, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  
  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply(fb._id, replyText);
    setIsReplying(false);
  };

  return (
    <div className="feedback-card">
      <div className="card-header">
        <div className="card-author">
          <div className="avatar">{initials(fb.studentName)}</div>
          <div>
            <div className="author-name">{fb.studentName}</div>
            <div className="author-meta">{fb.instructor} · {fb.course}</div>
          </div>
        </div>
        <div className="card-badges">
          <span className="badge badge-cat">{fb.category}</span>
          <span className="badge badge-date">{formatDate(fb.createdAt)}</span>
        </div>
      </div>
      <Stars value={fb.rating} />
      <p className="card-comment">"{fb.comment}"</p>
      
      {fb.reply && (
        <div className="instructor-reply">
          <div className="reply-header">💬 Instructor Response</div>
          <div className="reply-text">{fb.reply}</div>
        </div>
      )}

      {isReplying && (
        <div className="reply-input-box">
          <textarea 
            placeholder="Type your reply to this student..." 
            value={replyText} 
            onChange={e=>setReplyText(e.target.value)}
            style={{minHeight: "80px"}}
          />
          <button className="submit-reply-btn" onClick={handleReplySubmit}>Post Reply</button>
        </div>
      )}

      <div className="card-footer">
        <div className="footer-actions">
          <button className="action-btn helpful-btn" onClick={() => onHelpful(fb._id)}>
            👍 Helpful ({fb.helpful})
          </button>
          {!fb.reply && (
            <button className="action-btn reply-btn" onClick={() => setIsReplying(!isReplying)}>
              ↩ Reply
            </button>
          )}
        </div>
        <button className="delete-btn" title="Delete" onClick={() => onDelete(fb._id)}>🗑</button>
      </div>
    </div>
  );
}
