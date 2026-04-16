// ============================================================
// PORTFOLIO FRONTEND — script.js
// Connects to the Node.js + Express + MongoDB backend
// via the Fetch API to dynamically render all content.
//
// Handles:
//   • Page loader
//   • Mobile navigation
//   • Contact form → POST /contact
//   • Load projects → GET /projects
//   • Load skills   → GET /skills
//   • Load experience → GET /experience
//   • Scroll animations
//   • Toast notifications
// ============================================================

'use strict';

// ============================================================
// CONFIGURATION
// ============================================================

// Base URL for API calls.
// Since the frontend is served from the same Express server,
// we use a relative path (no hostname needed).
const API_BASE = '';   // e.g., '' → http://localhost:5000

// ============================================================
// PAGE LOADER
// ============================================================

window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// ============================================================
// TOAST NOTIFICATION HELPER
// ============================================================

/**
 * showToast — Displays a temporary notification banner.
 * @param {string} message  - Text to display
 * @param {string} type     - 'success' or 'error'
 * @param {number} duration - How long to show (ms), default 3500
 */
function showToast(message, type = 'success', duration = 3500) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.className = 'toast';
    }, duration);
}

// ============================================================
// MOBILE NAVIGATION TOGGLE
// ============================================================

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================================
// SMOOTH SCROLLING (for all anchor links)
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================

const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.nav-link');
const navbar    = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    // Highlight active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Navbar shadow on scroll
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow  = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow  = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    }
});

// ============================================================
// SCROLL FADE-IN ANIMATION (Intersection Observer)
// ============================================================

const observerOptions = {
    threshold:  0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeObserver.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe static elements (dynamic ones are observed after rendering)
function observeElements() {
    document.querySelectorAll('.cert-card, .stat-item, .education-item').forEach(el => {
        el.classList.add('fade-in-ready');
        fadeObserver.observe(el);
    });
}

// ============================================================
// SKILL BAR ANIMATION HELPER
// ============================================================

/**
 * Animates all skill progress bars on the page.
 * Uses IntersectionObserver so bars only animate when visible.
 */
function setupSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-level') + '%';
                // Small delay for visual polish
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ============================================================
// RENDER SKILLS — Dynamically from GET /skills
// ============================================================

/**
 * Groups a flat list of skills by their category.
 * @param {Array} skills
 * @returns {Object} { 'Category Name': [skill, skill, ...], ... }
 */
function groupSkillsByCategory(skills) {
    return skills.reduce((groups, skill) => {
        if (!groups[skill.category]) {
            groups[skill.category] = [];
        }
        groups[skill.category].push(skill);
        return groups;
    }, {});
}

/**
 * Renders skill category cards into #skillsContainer.
 * @param {Array} skills - Array of skill objects from API
 */
function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    if (!skills || skills.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary); text-align:center; grid-column:1/-1;">No skills found.</p>';
        return;
    }

    const grouped = groupSkillsByCategory(skills);

    const html = Object.entries(grouped).map(([category, categorySkills]) => {
        const skillItems = categorySkills.map(skill => `
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">${escapeHtml(skill.name)}</span>
                    <span class="skill-level-text">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress"
                         data-level="${skill.level}"
                         style="width: 0"
                         role="progressbar"
                         aria-valuenow="${skill.level}"
                         aria-valuemin="0"
                         aria-valuemax="100"
                         aria-label="${skill.name} ${skill.level}%">
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="skill-category fade-in-ready">
                <h3>${escapeHtml(category)}</h3>
                <div class="skill-items">
                    ${skillItems}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;

    // Attach fade-in and skill bar animations
    container.querySelectorAll('.skill-category').forEach(el => fadeObserver.observe(el));
    setupSkillBarAnimations();
}

/**
 * Fetches skills from the backend API and renders them.
 */
async function loadSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/skills`);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            renderSkills(result.data);
        } else {
            throw new Error(result.message || 'Failed to load skills');
        }

    } catch (error) {
        console.error('Error loading skills:', error.message);
        if (container) {
            container.innerHTML = `
                <div class="loading-state" style="grid-column:1/-1;">
                    <p style="color:var(--accent-color);">⚠️ Could not load skills. Is the backend server running?</p>
                    <p style="font-size:0.85rem; margin-top:0.5rem; color:var(--text-secondary);">${error.message}</p>
                </div>`;
        }
    }
}

// ============================================================
// RENDER EXPERIENCE — Dynamically from GET /experience
// ============================================================

/**
 * Renders experience timeline items into #experienceContainer.
 */
function renderExperience(experiences) {
    const container = document.getElementById('experienceContainer');
    if (!container) return;

    if (!experiences || experiences.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary);">No experience entries found.</p>';
        return;
    }

    const html = experiences.map((exp, index) => {
        // description is an array of bullet points
        const bullets = Array.isArray(exp.description)
            ? exp.description.map(point => `<li>${escapeHtml(point)}</li>`).join('')
            : `<li>${escapeHtml(exp.description)}</li>`;

        return `
            <div class="timeline-item fade-in-ready" style="transition-delay: ${index * 0.15}s">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${escapeHtml(exp.role)}</h3>
                    <p class="company">${escapeHtml(exp.company)}</p>
                    <p class="duration">${escapeHtml(exp.duration)}</p>
                    <ul class="description">
                        ${bullets}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;

    // Attach scroll animation
    container.querySelectorAll('.timeline-item').forEach(el => fadeObserver.observe(el));
}

/**
 * Fetches experience from the backend API and renders them.
 */
async function loadExperience() {
    const container = document.getElementById('experienceContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/experience`);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            renderExperience(result.data);
        } else {
            throw new Error(result.message || 'Failed to load experience');
        }

    } catch (error) {
        console.error('Error loading experience:', error.message);
        if (container) {
            container.innerHTML = `
                <div class="loading-state">
                    <p style="color:var(--accent-color);">⚠️ Could not load experience. Is the backend server running?</p>
                </div>`;
        }
    }
}

// ============================================================
// RENDER PROJECTS — Dynamically from GET /projects
// ============================================================

/**
 * Renders project cards into #projectsContainer.
 */
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    if (!projects || projects.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;grid-column:1/-1;">No projects found.</p>';
        return;
    }

    const html = projects.map((project, index) => {
        // techStack is an array; render as tags
        const tags = Array.isArray(project.techStack)
            ? project.techStack.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')
            : '';

        const gradient = project.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

        // Use real project screenshot if available, otherwise show gradient background
        const projectImageHtml = project.imageUrl
            ? `<img src="${escapeHtml(project.imageUrl)}"
                    alt="${escapeHtml(project.title)} screenshot"
                    class="project-real-img"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.querySelector('.project-gradient').style.display='block';">
               <div class="project-gradient" style="background: ${gradient}; display: none;"></div>`
            : `<div class="project-gradient" style="background: ${gradient}"></div>`;

        return `
            <div class="project-card fade-in-ready" style="transition-delay: ${index * 0.1}s">
                <div class="project-image">
                    ${projectImageHtml}
                    <div class="project-overlay">
                        <a href="${escapeHtml(project.githubLink || '#')}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-link">View on GitHub</a>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;

    // Attach scroll animation
    container.querySelectorAll('.project-card').forEach(el => fadeObserver.observe(el));
}

/**
 * Fetches projects from the backend API and renders them.
 */
async function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/projects`);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            renderProjects(result.data);
        } else {
            throw new Error(result.message || 'Failed to load projects');
        }

    } catch (error) {
        console.error('Error loading projects:', error.message);
        if (container) {
            container.innerHTML = `
                <div class="loading-state" style="grid-column:1/-1;">
                    <p style="color:var(--accent-color);">⚠️ Could not load projects. Is the backend server running?</p>
                </div>`;
        }
    }
}

// ============================================================
// CONTACT FORM — POST /contact
// ============================================================

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitText  = document.getElementById('submitText');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Client-side validation
        if (!name || !email || !message) {
            showToast('⚠️ Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('⚠️ Please enter a valid email address.', 'error');
            return;
        }

        // Set loading state
        setSubmitLoading(true);

        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // SUCCESS
                showToast('✅ Message sent successfully! I\'ll get back to you soon.', 'success', 4000);
                contactForm.reset();
            } else {
                // API returned an error
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Contact form error:', error.message);

            if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                showToast('❌ Cannot reach the server. Make sure the backend is running.', 'error', 5000);
            } else {
                showToast(`❌ ${error.message}`, 'error');
            }
        } finally {
            // Always restore button state
            setSubmitLoading(false);
        }
    });
}

/**
 * setSubmitLoading — Toggle submit button loading state.
 */
function setSubmitLoading(isLoading) {
    if (!submitBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        if (submitText) {
            submitText.textContent = 'Sending...';
        }
    } else {
        submitBtn.disabled = false;
        if (submitText) {
            submitText.textContent = 'Send Message';
        }
    }
}

// ============================================================
// UTILITY HELPERS
// ============================================================

/**
 * isValidEmail — Simple email format checker.
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * escapeHtml — Prevents XSS by escaping special HTML characters.
 * Always use this when inserting API data into innerHTML.
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================================
// INIT — LOAD ALL DYNAMIC CONTENT ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio loaded! Connecting to backend...');

    // Load all dynamic content from MongoDB via Express APIs
    // These run in parallel for best performance
    Promise.allSettled([
        loadProjects(),
        loadSkills(),
        loadExperience()
    ]).then(results => {
        const failed = results.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
            console.warn(`${failed.length} section(s) failed to load from API.`);
        } else {
            console.log('✅ All content loaded successfully from MongoDB!');
        }
    });

    // Setup static element animations
    setTimeout(observeElements, 100);
});
