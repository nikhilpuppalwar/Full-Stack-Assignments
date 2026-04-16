document.addEventListener('DOMContentLoaded', () => {

  // Auto-dismiss flash messages after 4.5s
  document.querySelectorAll('.flash-msg').forEach(el => {
    setTimeout(() => {
      const inst = bootstrap.Alert.getOrCreateInstance(el);
      if (inst) inst.close();
    }, 4500);
  });

  // Inbox unread badge
  const badge = document.getElementById('inboxBadge');
  if (badge) {
    fetch('/inquiries/unread-count')
      .then(r => r.json())
      .then(data => {
        if (data.count > 0) {
          badge.textContent = data.count;
          badge.classList.remove('d-none');
        }
      })
      .catch(() => {});
  }

  // Scroll-reveal product cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.prod-card').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = `opacity .4s ease ${i * 0.04}s, transform .4s ease ${i * 0.04}s`;
    obs.observe(el);
  });

  // Form submit loading spinner
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
      const btn = this.querySelector('[type="submit"]');
      if (btn && this.checkValidity()) {
        btn.disabled  = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Please wait…`;
        setTimeout(() => { btn.disabled = false; }, 8000);
      }
    });
  });

  // Tooltip init
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

});
