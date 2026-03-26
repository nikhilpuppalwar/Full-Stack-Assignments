"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return mounted ? progress : 0;
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { isVisible, mounted };
}

function Particles() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; size: number; delay: number; color: string }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const next = Array.from({ length: 18 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 4,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#7c3aed" : "#64748b",
    }));
    setParticles(next);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, background: p.color, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className="text-2xl"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </motion.button>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Client-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
            placeholder="Your name"
            disabled={status === 'loading'}
            suppressHydrationWarning
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
            placeholder="your.email@example.com"
            disabled={status === 'loading'}
            suppressHydrationWarning
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        viewport={{ once: true }}
      >
        <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
          placeholder="What&apos;s this about?"
          disabled={status === 'loading'}
          suppressHydrationWarning
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        viewport={{ once: true }}
      >
        <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project or idea..."
          disabled={status === 'loading'}
        ></textarea>
      </motion.div>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 flex items-center space-x-2"
        >
          <span>✅</span>
          <span>Message sent successfully! I&apos;ll get back to you soon.</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 flex items-center space-x-2"
        >
          <span>❌</span>
          <span>{errorMessage}</span>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        whileHover={status !== 'loading' ? { scale: 1.02, y: -2 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        viewport={{ once: true }}
      >
        <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
        {status === 'loading' ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            ⏳
          </motion.span>
        ) : (
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🚀
          </motion.span>
        )}
      </motion.button>
    </form>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "certificates", "education", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", icon: "👤" },
    { label: "Skills", href: "#skills", icon: "⚡" },
    { label: "Projects", href: "#projects", icon: "🚀" },
    { label: "Certificates", href: "#certificates", icon: "🏆" },
    { label: "Education", href: "#education", icon: "🎓" },
    { label: "Experience", href: "#experience", icon: "💼" },
  ];

  return (
    <header className={`fixed top-4 inset-x-0 z-[100] transition-all duration-500 px-4 sm:px-6 lg:px-8`}>
      <div className={`mx-auto max-w-7xl transition-all duration-500 ${scrolled
        ? 'backdrop-blur-2xl bg-black/30 border border-white/20 shadow-2xl shadow-black/50'
        : 'backdrop-blur-xl bg-black/20 border border-white/10 shadow-xl shadow-black/30'
        } rounded-full`}>
        <nav className="flex items-center justify-between h-16 px-4">
          {/* Enhanced Logo with Better Branding */}
          <motion.a
            href="#home"
            className="group flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection("home")}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-white font-bold text-sm">NP</span>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-white font-semibold text-sm leading-tight">Nikhil Puppalwar</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-gray-400">Developer</span>
                <span className="text-gray-600">•</span>
                <div className="flex items-center space-x-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-green-400">Available</span>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Centered Navigation Items */}
          <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.a
                      href={item.href}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${isActive
                        ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(item.href.substring(1))}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>

                      {/* Glossy overlay effect */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      )}
                    </motion.a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Right Side - Contact CTA */}
          <div className="hidden lg:flex items-center">
            <motion.a
              href="#contact"
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${activeSection === "contact"
                ? 'text-white bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 shadow-lg shadow-green-500/30'
                : 'text-white bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 hover:border-green-400/60 hover:bg-green-500/30'
                }`}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection("contact")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
            >
              <span className="text-base">📧</span>
              <span>Contact</span>

              {/* Glossy overlay effect */}
              {activeSection === "contact" && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              )}
            </motion.a>
          </div>



          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              aria-label="Toggle menu"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={open ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden px-1 pb-3"
        >
          <div className="mt-2 rounded-3xl border border-white/12 bg-black/90 shadow-2xl shadow-black/60 overflow-hidden">
            <div className="py-3 space-y-1">
              {[...navItems, { label: "Contact", href: "#contact", icon: "📧" }].map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                const isContact = item.label === "Contact";
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-5 py-3 rounded-full text-sm font-medium transition-all ${isActive
                      ? isContact
                        ? 'text-white bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 shadow-lg'
                        : 'text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    onClick={() => {
                      setOpen(false);
                      setActiveSection(item.href.substring(1));
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-current"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>


    </header>
  );
}

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>{children}</section>
  );
}

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
        >
          <span className="text-white font-bold text-2xl">NP</span>
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Nikhil Puppalwar
        </motion.h1>

        <motion.div
          className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const progress = useScrollProgress();
  const cloudinarySrc = "https://res.cloudinary.com/dkrkxulxx/image/upload/v1755696072/Nikhil_Profile_Image_cbuby7.jpg";
  const unsplashFallback = "https://images.unsplash.com/photo-1603415526960-f8f0a2f9cba6?w=800&q=75&auto=format";
  const [heroSrc, setHeroSrc] = useState<string>(cloudinarySrc);
  const handleHeroError = () => {
    setHeroSrc((prev) => (prev === cloudinarySrc ? "/me.jpg" : unsplashFallback));
  };


  // Skills functionality
  useEffect(() => {
    const skillsGrid = document.getElementById('skills-grid');
    const skillTabs = document.querySelectorAll('.skill-tab');

    // Skills data moved inside useEffect to avoid dependency issues
    const skillsData = [
      { name: "Python", category: "programming", icon: "/images/logo/python_logo.png" },
      { name: "Java", category: "programming", icon: "/images/logo/java_logo.png" },
      { name: "C++", category: "programming", icon: "/images/logo/cplus_logo.png" },
      { name: "Kotlin", category: ["programming", "mobile"], icon: "/images/logo/Kotlin.png" },
      { name: "SQL", category: ["programming", "data_ml"], icon: "/images/logo/MySql_logo.png" },
      { name: "DSA", category: "programming", icon: "/images/logo/DSA_logo.png" },
      { name: "Android Studio", category: "mobile", icon: "/images/logo/Android_Studio_logo.png" },
      { name: "Firebase", category: "mobile", icon: "/images/logo/Firebase_logo.png" },
      { name: "RESTful APIs", category: "programming", icon: "/images/logo/restfulApi_logo.png" },
      { name: "Git / GitHub", category: "programming", icon: "/images/logo/github_logo.svg" },
      { name: "TensorFlow", category: "data_ml", icon: "/images/logo/TensorFlow_logo.png" },
      { name: "Scikit-learn", category: "data_ml", icon: "/images/logo/scikit_learn_logo.svg" },
      { name: "Pandas", category: "data_ml", icon: "/images/logo/Pandas_logo.png" },
      { name: "Matplotlib", category: "data_ml", icon: "/images/logo/Matplotlib_logo.png" },
      { name: "Seaborn", category: "data_ml", icon: "/images/logo/seaborn_logo.png" },
      { name: "HTML", category: "programming", icon: "/images/logo/HTML5_logo.png" },
      { name: "CSS", category: "programming", icon: "/images/logo/CSS3_logo.png" },
      { name: "JavaScript", category: "programming", icon: "/images/logo/JavaScript.png" },
      { name: "MongoDB", category: "data_ml", icon: "/images/logo/Mongodb_logo.png" },
      { name: "Jetpack Compose", category: "mobile", icon: "/images/logo/jetpackcompose_logo.png" },
      { name: "XML", category: "mobile", icon: "/images/logo/xml_android_logo.png" },
      { name: "Bitbucket", category: "programming", icon: "/images/logo/Bitbucket_logo.svg" },
    ];

    function getSkillHtml(skill: { name: string; category: string | string[]; icon: string }) {
      return `
        <div class="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer text-center" data-categories="${Array.isArray(skill.category) ? skill.category.join(',') : skill.category}">
          <div class="h-16 mb-3 flex items-center justify-center">
            <img src="${skill.icon}" alt="${skill.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span class="text-white font-medium">${skill.name}</span>
        </div>
      `;
    }

    // Track expanded state for each category
    const expandedCategories: { [key: string]: boolean } = {};

    function renderSkills(category: string) {
      if (skillsGrid) {
        skillsGrid.innerHTML = '';
        const filteredSkills = skillsData.filter(skill =>
          category === 'all' ||
          (Array.isArray(skill.category) && skill.category.includes(category)) ||
          skill.category === category
        );

        // Check if this category is expanded
        const isExpanded = expandedCategories[category] || false;
        const skillsToShow = isExpanded ? filteredSkills : filteredSkills.slice(0, 14);
        const hasMore = filteredSkills.length > 14;

        skillsToShow.forEach(skill => {
          skillsGrid.innerHTML += getSkillHtml(skill);
        });

        // Add "See All" or "Show Less" button if there are more skills
        if (hasMore) {
          const buttonText = isExpanded ? 'Show Less' : `See All (${filteredSkills.length})`;
          const buttonIcon = isExpanded ? '−' : '+';

          skillsGrid.innerHTML += `
            <div id="see-all-btn" class="group rounded-xl border-2 border-dashed border-cyan-500/30 p-6 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer text-center flex items-center justify-center">
              <div class="text-center">
                <div class="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">${buttonIcon}</div>
                <span class="text-cyan-400 font-semibold">${buttonText}</span>
              </div>
            </div>
          `;

          // Add click handler to the See All button
          setTimeout(() => {
            const seeAllBtn = document.getElementById('see-all-btn');
            if (seeAllBtn) {
              seeAllBtn.addEventListener('click', () => {
                expandedCategories[category] = !expandedCategories[category];
                renderSkills(category);
              });
            }
          }, 0);
        }
      }
    }

    function setActiveTab(activeCategory: string) {
      skillTabs.forEach(tab => {
        const tabCategory = tab.getAttribute('data-category');
        if (tabCategory === activeCategory) {
          tab.classList.remove('bg-gray-800', 'text-gray-300', 'hover:text-cyan-400');
          tab.classList.add('bg-cyan-600', 'text-white');
        } else {
          tab.classList.remove('bg-cyan-600', 'text-white');
          tab.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-800', 'hover:text-cyan-400');
        }
      });
    }

    // Initialize skills
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        renderSkills(category || 'all');
        setActiveTab(category || 'all');
      });
    });

    // Initial render
    renderSkills('all');
    setActiveTab('all');

    // Projects carousel functionality
    const projectsData = [
      {
        title: "Laundry-Mart-App",
        type: "mobile",
        description: "An intuitive Android application for managing laundry services, built with Kotlin, Firebase, and XML layouts. The app provides users with a seamless experience to schedule laundry pickups, view services, track orders, and more.",
        features: [
          "🔹 Splash Screen with Lottie animation",
          "🔹 Onboarding screen with intro text and start button",
          "🔹 Login / Sign-Up UI (design only)",
          "🔹 Home/Main Screen with:",
          "  • Laundry service menu",
          "  • Schedule Pickup option",
          "  • Track Orders section",
          "  • Eco-friendly laundry tips",
          "  • Offers & Promotions section",
          "  • Customer Reviews",
          "  • User Profile access",
          "🔹 Modern UI Design using XML layouts",
          "🔹 Animations with Lottie for visual appeal"
        ],
        techStack: {
          "Language": "Kotlin",
          "UI Design": "XML Layouts",
          "Backend Services": "Firebase Realtime Database",
          "Animations": "Lottie",
          "IDE": "Android Studio"
        },
        images: [
          "/images/laundary_mart_photo/mart_home.jpg",
          "/images/laundary_mart_photo/mart_home_layout.jpg",
          "/images/laundary_mart_photo/mart_login.jpg",
          "/images/laundary_mart_photo/mart_signup.jpg",
          "/images/laundary_mart_photo/mart_pickup.jpg",
          "/images/laundary_mart_photo/mart_track.jpg",
          "/images/laundary_mart_photo/mart_profile.jpg",
          "/images/laundary_mart_photo/mart_service_detail.jpg",
        ],
        technologies: ["Android Studio", "Kotlin", "Firebase", "Lottie"]
      },
      {
        title: "Agri Mart",
        type: "mobile",
        description: "Agri Mart is a mobile app that helps farmers list and sell agricultural products directly to buyers. Users can explore products, add them to their cart, and place secure orders.",
        features: [
          "🌱 Product Listing: Farmers can upload product details with images and prices",
          "🛒 Add to Cart & Buy: Buyers can add products to the cart and purchase them",
          "🔐 Login & Signup: Secure authentication for both buyers and sellers",
          "📍 Marketplace Navigation:",
          "  • 🏠 Home: Browse featured products",
          "  • 🔍 Explore: Search and filter by category",
          "  • 🛒 Cart: Manage selected products before checkout",
          "  • 📦 Orders: Track past purchases",
          "  • 👤 Profile: User details and settings",
          "📝 Product Details Page: Displays product description, price, seller details",
          "💳 Secure Checkout: Supports multiple payment methods for smooth transactions"
        ],
        techStack: {
          "Language": "Kotlin",
          "UI Design": "XML Layouts",
          "Backend Services": "Firebase",
          "Database": "Firebase Realtime Database",
          "IDE": "Android Studio"
        },
        images: [
          "/images/agro_mart/welcome.jpg",
          "/images/agro_mart/listing.jpg",
          "/images/agro_mart/login main.jpg",
          "/images/agro_mart/login.jpg",
          "/images/agro_mart/home.jpg",
          "/images/agro_mart/cart.jpg",
          "/images/agro_mart/profile.jpg",
          "/images/agro_mart/detail.jpg",
        ],
        technologies: ["Android Studio", "Kotlin", "Firebase", "REST APIs"]
      },
      {
        title: "SmartQuizzer 🎯",
        type: "web",
        description: "An AI-powered web application that helps users generate quizzes automatically from PDFs, text, and URLs. It enables personalized learning by adapting quiz difficulty based on user performance.",
        features: [
          "🧠 AI Quiz Generation: Automatically creates intelligent quizzes using AI",
          "📄 Multiple Input Sources: Generate quizzes from PDFs, text, or website links",
          "👤 User Accounts: Secure login and personalized profiles",
          "📊 Performance Tracking: Track quiz history, scores, and progress",
          "🏆 Leaderboard: Compare performance with other users",
          "🛠 Admin Dashboard: Manage users, materials, and feedback",
          "🎨 Modern UI: Clean and intuitive interface",
          "📱 Responsive Design: Works seamlessly on all devices"
        ],
        techStack: {
          "Language": "Python",
          "Frontend": "HTML, CSS, JavaScript",
          "Backend Framework": "Flask",
          "AI Service": "Groq API (LLaMA models)",
          "Database": "SQLite (SQLAlchemy ORM)",
          "Other Tools": "PyMuPDF, BeautifulSoup, REST APIs",
          "IDE": "VS Code / PyCharm"
        },
        images: [
          "/images/SmartQuizzer/1.png",
          "/images/SmartQuizzer/2.png",
          "/images/SmartQuizzer/3.png",
          "/images/SmartQuizzer/4.png",
          "/images/SmartQuizzer/5.png",
          "/images/SmartQuizzer/66.png",
          "/images/SmartQuizzer/7.png",
          "/images/SmartQuizzer/8.png",
          "/images/SmartQuizzer/9.png",
          "/images/SmartQuizzer/10.png",
          "/images/SmartQuizzer/11.png",
          "/images/SmartQuizzer/12.png",
          "/images/SmartQuizzer/14.png",
        ],
        technologies: ["Python", "Flask", "Groq API", "SQLite", "AI/ML"]
      },
      {
        title: "Fake News Detection System 📰",
        type: "web",
        description: "A machine learning-based web application that helps users identify whether a news article is fake or real. It analyzes text using multiple ML models and provides accurate, confidence-based predictions through an easy-to-use web interface.",
        features: [
          "🧠 ML-Based Detection: Classifies news as Fake or Real using trained models",
          "📄 Text & CSV Input: Analyze single articles or bulk news data",
          "📈 Multiple Models: Logistic Regression, Decision Tree, Gradient Boost, Random Forest",
          "⚖ Ensemble Prediction: Majority voting for reliable results",
          "📊 Visual Insights: Confusion matrices, performance metrics, word clouds",
          "🌐 Web Interface: User-friendly Streamlit application",
          "📉 Model Comparison: Compare accuracy across different algorithms",
          "🎯 High Accuracy: Optimized models for reliable detection"
        ],
        techStack: {
          "Language": "Python",
          "Frontend": "Streamlit",
          "Machine Learning": "Scikit-learn, TF-IDF",
          "Data Processing": "Pandas, NumPy, NLTK",
          "Visualization": "Matplotlib, Seaborn, Plotly, WordCloud",
          "IDE": "VS Code / PyCharm"
        },
        images: [
          "/images/Fake_new_detection/1.png",
          "/images/Fake_new_detection/2.png",
          "/images/Fake_new_detection/3.png",
          "/images/Fake_new_detection/4.png",
          "/images/Fake_new_detection/5.png",
          "/images/Fake_new_detection/6.png",
          "/images/Fake_new_detection/7.png",
          "/images/Fake_new_detection/8.png",
          "/images/Fake_new_detection/9.png",
          "/images/Fake_new_detection/10.png",
          "/images/Fake_new_detection/11.png",
        ],
        technologies: ["Python", "Streamlit", "Scikit-learn", "TF-IDF", "ML"]
      },
      {
        title: "Modern Next.js Portfolio Website",
        type: "web",
        description: "A high-performance, SEO-optimized portfolio website built using Next.js to showcase projects, skills, and professional experience. The application focuses on clean UI, fast load times, and scalable architecture, making it suitable for real-world production deployment.",
        features: [
          "⚡ Fast Rendering: Using Server-Side Rendering (SSR) and Static Site Generation (SSG)",
          "📱 Responsive Design: Modern UI for all screen sizes",
          "🎨 Premium Aesthetics: Glassmorphism, gradients, and smooth animations",
          "🚀 Optimized Performance: Optimized fonts and assets for improved performance",
          "🧩 Component Architecture: Clean component-based architecture using React",
          "🌐 Production Ready: Deployed with Vercel for global CDN",
          "🎯 SEO Optimized: Meta tags, semantic HTML, and performance optimization",
          "✨ Interactive UI: Framer Motion animations and 3D Spline scenes"
        ],
        techStack: {
          "Framework": "Next.js",
          "Library": "React",
          "Language": "TypeScript / JavaScript",
          "Styling": "CSS / Tailwind CSS",
          "Deployment": "Vercel",
          "Animations": "Framer Motion",
          "3D Graphics": "Spline"
        },
        images: [
          "/images/Portfolio/1.png",
          "/images/Portfolio/2.png",
          "/images/Portfolio/3.png",
          "/images/Portfolio/4.png",
          "/images/Portfolio/5.png",
          "/images/Portfolio/6.png",
          "/images/Portfolio/7.png",
          "/images/Portfolio/8.png",
          "/images/Portfolio/9.png",
        ],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"]
      }
    ];

    let currentSlide = 0;
    const slidesContainer = document.getElementById('project-slides-container');
    const dotsContainer = document.getElementById('slide-dots');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    function createProjectSlide(project: {
      title: string;
      type: string;
      description: string;
      features: string[];
      techStack: Record<string, string | undefined>;
      images: string[];
      technologies: string[];
    }, index: number) {
      const isMobileApp = project.type === 'mobile';

      return `
        <div class="project-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- ${isMobileApp ? 'Phone Mockup' : 'Web Screenshot'} -->
            <div class="flex justify-center">
              ${isMobileApp ? `
                <div class="mobile-frame">
                  <div id="phone-screen-${index}" class="w-full h-full bg-black overflow-hidden">
                    <img id="phone-image-${index}" src="${project.images[0]}" alt="${project.title} screen" class="w-full h-full object-cover" />
                  </div>
                </div>
              ` : `
                <div class="web-screenshot-container w-full max-w-2xl">
                  <div class="bg-gray-800/50 rounded-t-xl p-2 flex items-center space-x-2 border border-white/10">
                    <div class="flex space-x-1.5">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div class="flex-1 bg-gray-700/50 rounded px-3 py-1 text-xs text-gray-400">
                      ${project.title}
                    </div>
                  </div>
                  <div id="web-screen-${index}" class="bg-white rounded-b-xl overflow-hidden border-x border-b border-white/10 shadow-2xl">
                    <img id="web-image-${index}" src="${project.images[0]}" alt="${project.title} screenshot" class="w-full h-auto object-contain" />
                  </div>
                </div>
              `}
            </div>
            
            <!-- Project Information -->
            <div class="space-y-6">
              <div class="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 class="text-3xl font-bold text-white mb-4">${project.title}</h3>
                <p class="text-gray-300 text-lg mb-6">${project.description}</p>
                
                <!-- Features Display -->
                <div class="mb-6">
                  <h4 class="text-xl font-semibold text-cyan-400 mb-3">${isMobileApp ? '📱' : '✨'} Features</h4>
                  <div class="text-gray-300 space-y-1 max-h-56 overflow-y-auto">
                    ${project.features.map((feature: string) => `
                      <div class="console-line">${feature}</div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Tech Stack -->
                <div class="mb-6">
                  <h4 class="text-xl font-semibold text-cyan-400 mb-3">🚧 Tech Stack</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    ${Object.entries(project.techStack).map(([key, value]) => `
                      <div class="flex justify-between">
                        <span class="text-gray-400">${key}:</span>
                        <span class="text-white">${value}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Technology Tags -->
                <div class="flex flex-wrap gap-2">
                  ${project.technologies.map((tech: string) =>
        `<span class="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">${tech}</span>`
      ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function createDots() {
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        projectsData.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = `w-4 h-4 rounded-full transition-all duration-300 ${index === 0
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-110'
            : 'bg-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:scale-110'
            }`;
          dot.setAttribute('data-slide', index.toString());
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
        });
      }
    }

    function goToSlide(slideIndex: number) {
      const slides = document.querySelectorAll('.project-slide');
      const dots = document.querySelectorAll('#slide-dots button');

      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
        (slide as HTMLElement).style.display = index === slideIndex ? 'block' : 'none';
        (slide as HTMLElement).style.opacity = index === slideIndex ? '1' : '0';
      });

      dots.forEach((dot, index) => {
        if (index === slideIndex) {
          dot.className = 'w-4 h-4 rounded-full transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-110';
        } else {
          dot.className = 'w-4 h-4 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:scale-110';
        }
      });

      currentSlide = slideIndex;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % projectsData.length;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentSlide - 1 + projectsData.length) % projectsData.length;
      goToSlide(prevIndex);
    }

    // Image rotation for both mobile and web projects
    function rotatePhoneImages() {
      projectsData.forEach((project: {
        title: string;
        type: string;
        images: string[];
      }, projectIndex: number) => {
        const isMobileApp = project.type === 'mobile';
        const imageElement = document.getElementById(
          isMobileApp ? `phone-image-${projectIndex}` : `web-image-${projectIndex}`
        );

        if (imageElement) {
          let imageIndex = 0;
          setInterval(() => {
            imageIndex = (imageIndex + 1) % project.images.length;
            (imageElement as HTMLImageElement).src = project.images[imageIndex];
            (imageElement as HTMLImageElement).alt = `${project.title} ${isMobileApp ? 'screen' : 'screenshot'} ${imageIndex + 1}`;
          }, 3000); // Change image every 3 seconds
        }
      });
    }

    function initCarousel() {
      if (slidesContainer) {
        slidesContainer.innerHTML = projectsData.map((project, index) =>
          createProjectSlide(project, index)
        ).join('');

        createDots();

        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Initialize phone image rotation
        rotatePhoneImages();

        // Auto-advance slides every 8 seconds
        setInterval(nextSlide, 8000);
      }
    }

    initCarousel();
  }, []);

  return (
    <div className="relative font-sans">
      <LoadingScreen />
      <div id="scroll-progress" style={{ width: `${progress}%` }} />
      <Header />
      {/* Hero */}
      <div id="home" className="relative pt-28 overflow-hidden gradient-bg min-h-screen flex items-center">
        <Particles />
        <Section id="hero" className="py-16 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Animated greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl"
                >
                  👋
                </motion.div>
                <span className="text-lg text-cyan-400 font-medium">Hello, I&apos;m</span>
              </motion.div>

              {/* Main heading with typewriter effect */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Nikhil
                </span>
                <br />
                <span className="text-white">
                  Dilip Puppalwar
                </span>
              </motion.h1>

              {/* Animated subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl text-gray-300">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                    Computer Engineering Student
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    Android Developer
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    AI/ML Enthusiast
                  </span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl text-gray-400 italic font-light"
                >
                  Transforming ideas into apps and intelligent solutions
                </motion.p>
              </motion.div>

              {/* Enhanced CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="#projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>View Projects</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get In Touch</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💬
                  </motion.span>
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex space-x-4"
              >
                {[
                  { href: "https://github.com/nikhilpuppalwar", icon: "/images/logo/github_logo.svg", label: "GitHub", isImage: true },
                  { href: "https://linkedin.com/in/nikhil-puppalwar", icon: "/images/logo/linkedin_logo.png", label: "LinkedIn", isImage: true },
                  { href: "mailto:nikhilpuppalwar16@gmail.com", icon: "/images/logo/email_logo.png", label: "Email", isImage: true }
                ].map((social, index) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {social.isImage ? (
                      <Image
                        src={social.icon}
                        alt={social.label}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Circular profile image with floating decorative icons */}
            <motion.div
              className="relative flex items-center justify-center h-[500px] md:h-[600px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Decorative floating icons */}
              <motion.div
                className="absolute top-20 right-8 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">🎯</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-4 w-14 h-14 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-2xl">📱</span>
              </motion.div>

              <motion.div
                className="absolute bottom-32 right-12 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>

              {/* Main circular profile image container */}
              <div className="relative w-[380px] h-[380px] md:w-[450px] md:h-[450px]">
                {/* Animated gradient ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-20 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Circular border with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black p-4">
                    {/* Profile image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                      <Image
                        src="/Nikhil_Profile_Image.jpg"
                        alt="Nikhil Puppalwar - Portrait"
                        fill
                        priority
                        className="object-cover"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-600/30 blur-xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Marquee */}
      <Section id="companies" className="py-10">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Places I have worked with in the past</p>
        <div className="relative overflow-hidden border border-white/10 rounded-lg">
          <div className="flex items-center gap-16 animate-[marquee_20s_linear_infinite] p-6 [--tw-translate-x:0]">
            {[
              { name: "SPACE For Early Childhood Education", color: "bg-blue-500" },
              { name: "Infosys Springboard", color: "bg-green-500" },
              { name: "PCCoE", color: "bg-purple-500" },
            ].map((company, i) => (
              <div key={i} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                <div className={`${company.color} text-white px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap`}>
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </Section>

      {/* About */}
      <Section id="about" className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

        <div className="relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span>👋</span>
              <span>Get to know me</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Hi, I&apos;m <span className="text-cyan-400 font-semibold">Nikhil Puppalwar</span>, a passionate and detail-oriented Computer Engineering student with a strong interest in mobile app development, data science, and machine learning. I enjoy transforming innovative ideas into real-world applications that create impact and solve meaningful problems.
                </motion.p>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  I have hands-on experience building Android apps using Kotlin, Firebase, and Cloud services, and I&apos;ve also worked on projects involving data analysis, predictive modeling, and AI-based solutions. I&apos;m always eager to explore new technologies, contribute to open-source projects, and continuously improve my technical and creative skills.
                </motion.p>
              </div>

              {/* Key highlights */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {[
                  { icon: "🎯", title: "Problem Solver", desc: "Love tackling complex challenges" },
                  { icon: "🚀", title: "Innovation Driven", desc: "Always exploring new technologies" },
                  { icon: "🤝", title: "Team Player", desc: "Collaborative and communicative" },
                  { icon: "📈", title: "Growth Mindset", desc: "Continuously learning and improving" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual elements */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Floating cards */}
              <div className="relative h-96">
                {[
                  {
                    title: "Android Development",
                    icon: "📱",
                    color: "from-green-500 to-emerald-600",
                    position: "top-0 left-0",
                    delay: 0.1
                  },
                  {
                    title: "Data Science",
                    icon: "📊",
                    color: "from-blue-500 to-cyan-600",
                    position: "top-20 right-0",
                    delay: 0.2
                  },
                  {
                    title: "Machine Learning",
                    icon: "🧠",
                    color: "from-purple-500 to-pink-600",
                    position: "bottom-20 left-8",
                    delay: 0.3
                  },
                  {
                    title: "Problem Solving",
                    icon: "💡",
                    color: "from-yellow-500 to-orange-600",
                    position: "bottom-0 right-8",
                    delay: 0.4
                  }
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    className={`absolute ${card.position} p-4 bg-gradient-to-r ${card.color} rounded-xl shadow-lg`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: card.delay,
                      type: "spring",
                      stiffness: 100,
                      y: { duration: 3, repeat: Infinity, delay: card.delay }
                    }}
                  >
                    <div className="flex items-center space-x-2 text-white">
                      <span className="text-xl">{card.icon}</span>
                      <span className="font-semibold text-sm">{card.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-cyan-500/5 rounded-3xl"></div>

        <div className="relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span>⚡</span>
              <span>Technical expertise</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {/* Enhanced Skill Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[
              { category: "all", label: "All Skills", icon: "🌟", color: "from-cyan-500 to-blue-600" },
              { category: "programming", label: "Programming", icon: "💻", color: "from-green-500 to-emerald-600" },
              { category: "mobile", label: "Mobile Dev", icon: "📱", color: "from-purple-500 to-pink-600" },
              { category: "data_ml", label: "Data & ML", icon: "🧠", color: "from-orange-500 to-red-600" }
            ].map((tab, index) => (
              <motion.button
                key={tab.category}
                className={`skill-tab group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${tab.category === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                data-category={tab.category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Skills Grid */}
          <motion.div
            id="skills-grid"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Skills display - showing first 14 */}
            {[
              { name: "Python", logo: "/images/logo/python_logo.png" },
              { name: "Java", logo: "/images/logo/java_logo.png" },
              { name: "C++", logo: "/images/logo/cplus_logo.png" },
              { name: "Kotlin", logo: "/images/logo/Kotlin_logo.svg" },
              { name: "MySQL", logo: "/images/logo/MySql_logo.png" },
              { name: "Android Studio", logo: "/images/logo/Android_Studio_logo.png" },
              { name: "Firebase", logo: "/images/logo/Firebase_logo.png" },
              { name: "RESTful APIs", logo: "/images/logo/restfulApi_logo.png" },
              { name: "Git / GitHub", logo: "/images/logo/github_logo.svg" },
              { name: "TensorFlow", logo: "/images/logo/TensorFlow_logo.png" },
              { name: "Scikit-learn", logo: "/images/logo/scikit_learn_logo.svg" },
              { name: "Pandas", logo: "/images/logo/Pandas_logo.png" },
              { name: "Matplotlib", logo: "/images/logo/Matplotlib_logo.png" },
              { name: "Seaborn", logo: "/images/logo/seaborn_logo.png" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="h-16 mb-3 flex items-center justify-center">
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={64}
                    height={64}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-white font-medium">{skill.name}</span>
              </motion.div>
            ))}

            {/* See All Button */}
            <motion.div
              className="group rounded-xl border-2 border-dashed border-cyan-500/30 p-6 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer text-center flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">+</div>
                <span className="text-cyan-400 font-semibold">See All</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-24 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
              <span>Featured Work</span>
              <motion.div
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 bg-clip-text text-transparent gradient-text">
                Featured Projects
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Explore my recent work and side projects that showcase my skills in mobile development,
              data science, and innovative problem-solving
            </motion.p>

            {/* Enhanced Project Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                {
                  number: "2+",
                  label: "Mobile Apps",
                  icon: "📱",
                  color: "from-green-500 to-emerald-600",
                  description: "Android applications built with Kotlin",
                  gradient: "from-green-500/20 to-emerald-600/20",
                  borderColor: "border-green-500/30"
                },
                {
                  number: "3+",
                  label: "Web Applications",
                  icon: "🌐",
                  color: "from-blue-500 to-cyan-600",
                  description: "Full-stack web apps with AI/ML integration",
                  gradient: "from-blue-500/20 to-cyan-600/20",
                  borderColor: "border-blue-500/30"
                },
                {
                  number: "10+",
                  label: "Certifications",
                  icon: "🏆",
                  color: "from-purple-500 to-pink-600",
                  description: "Professional certifications earned",
                  gradient: "from-purple-500/20 to-pink-600/20",
                  borderColor: "border-purple-500/30"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`group relative p-5 bg-gradient-to-br ${stat.gradient} rounded-2xl border ${stat.borderColor} hover:border-opacity-50 transition-all duration-500 backdrop-blur-sm overflow-hidden cursor-pointer`}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    rotateY: 3,
                    rotateX: 3
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Enhanced background decoration */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  ></motion.div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {stat.icon}
                    </motion.div>

                    <motion.div
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>

                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-opacity-90 transition-colors">
                      {stat.label}
                    </h3>

                    <p className="text-gray-300 text-xs leading-relaxed group-hover:text-white transition-colors">
                      {stat.description}
                    </p>

                    {/* Enhanced progress indicator */}
                    <motion.div
                      className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full shadow-lg`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced hover glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* 3D depth effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>


          </motion.div>

          {/* Enhanced Project Carousel */}
          <motion.div
            className="project-carousel-container relative rounded-[2rem] p-8 md:p-12 backdrop-blur-2xl border-2 border-white/10 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.5)] overflow-visible"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 25px 50px -12px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Animated mesh gradient background */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-20 rounded-[2rem]"
              style={{
                background: 'radial-gradient(circle at 15% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(236, 72, 153, 0.35) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                filter: 'blur(60px)'
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.35, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#f97316',
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}

            {/* Carousel background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/8 via-transparent to-blue-500/8 rounded-[2rem] pointer-events-none"></div>
            <motion.div
              className="absolute top-8 right-8 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{
                duration: 6,
                repeat: Infinity
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-8 left-8 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 1
              }}
            ></motion.div>
            <div id="project-slides-container" className="relative">
              {/* Fallback project display */}
              <div className="project-slide active" data-slide="0">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Phone Mockup */}
                  <div className="flex justify-center">
                    <div className="mobile-frame">
                      <div className="w-full h-full bg-black overflow-hidden">
                        <Image
                          src="/images/laundary_mart_photo/mart_home.jpg"
                          alt="Laundry-Mart-App screen"
                          width={360}
                          height={720}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-6">
                    <motion.div
                      className="animated-border rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden border border-white/15"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      style={{
                        background: 'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.18), transparent 55%), radial-gradient(circle at 100% 0%, rgba(45,212,191,0.12), transparent 55%), linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
                        boxShadow: '0 18px 45px -16px rgba(0,0,0,0.85)'
                      }}
                    >
                      {/* Subtle glow ring */}
                      <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] border border-white/5" />

                      {/* Category Badge */}
                      <motion.div
                        className="absolute top-6 right-6 px-4 py-2 bg-emerald-500/15 border border-emerald-400/40 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-lg">📱</span>
                        <span className="text-emerald-300 text-xs md:text-sm font-semibold tracking-wide uppercase">
                          Mobile Application
                        </span>
                      </motion.div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6 md:mb-8">
                        <motion.div
                          className="hidden md:flex w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 rounded-2xl items-center justify-center text-2xl shadow-xl shadow-emerald-500/40"
                          whileHover={{ rotate: 360, scale: 1.08 }}
                          transition={{ duration: 0.6 }}
                        >
                          📦
                        </motion.div>
                        <div className="space-y-2 flex-1">
                          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 text-xs font-medium text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>End-to-end service experience</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-semibold text-white">
                            Laundry-Mart-App
                          </h3>
                          <p className="text-sm md:text-base text-emerald-200/90">
                            Android app for managing laundry pick‑ups, tracking orders, and streamlining
                            local service businesses.
                          </p>
                        </div>
                      </div>

                      {/* Main content layout */}
                      <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] mb-8">
                        {/* Left: overview */}
                        <div className="space-y-5">
                          <p className="text-gray-200/90 text-sm md:text-base leading-relaxed">
                            Built with Kotlin and Firebase, Laundry‑Mart focuses on a clean, predictable flow:
                            from onboarding and authentication to booking, payment and live order tracking.
                            Thoughtful micro‑interactions and consistent visual language make the experience
                            feel premium while still being simple.
                          </p>

                          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                            {[
                              { label: "Platform", value: "Android (Kotlin)" },
                              { label: "Focus", value: "Service booking & tracking" },
                              { label: "Pattern", value: "MVVM + Firebase" },
                              { label: "Role", value: "End‑to‑end design & development" }
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                              >
                                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                  {item.label}
                                </p>
                                <p className="text-xs md:text-sm text-white font-medium">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: feature list */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm shadow-lg shadow-cyan-500/40"
                              whileHover={{ rotate: 180 }}
                              transition={{ duration: 0.4 }}
                            >
                              ⚡
                            </motion.div>
                            <div>
                              <h4 className="text-sm md:text-base font-semibold text-cyan-300">
                                Experience highlights
                              </h4>
                              <p className="text-xs text-gray-400">
                                A clear journey from first launch to repeat orders.
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                            {[
                              "Guided onboarding with branded splash & intro screens",
                              "Secure login & sign‑up with error states that feel friendly",
                              "Home screen designed around a simple \"book a pickup\" CTA",
                              "Pickup scheduling with time‑slot selection and summaries",
                              "Order tracking timeline with clear visual status",
                              "Offer cards and upsell sections that stay subtle, not noisy",
                              "Lightweight eco‑tips woven into the experience, not dumped",
                              "Responsive layouts that feel natural across phone sizes"
                            ].map((feature) => (
                              <div
                                key={feature}
                                className="group flex gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                              >
                                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:bg-cyan-300" />
                                <p className="text-gray-200 text-xs md:text-sm leading-snug">
                                  {feature}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tech stack + tags */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-sm">
                              🛠️
                            </div>
                            <h4 className="text-sm md:text-base font-semibold text-purple-300">
                              Tech & tooling
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Kotlin",
                              "Android Studio",
                              "XML layouts",
                              "Firebase Auth",
                              "Firebase Realtime DB",
                              "REST APIs",
                              "Lottie",
                              "Git & GitHub"
                            ].map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] md:text-xs text-gray-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button suppressHydrationWarning className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/15 px-4 py-2 text-xs md:text-sm font-medium text-emerald-100 hover:bg-emerald-500/25 transition-colors">
                            <span>View detailed case study</span>
                            <span>↗</span>
                          </button>
                          <button suppressHydrationWarning className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs md:text-sm font-medium text-gray-100 hover:bg-white/10 transition-colors">
                            <span>Explore code & architecture</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Second Project */}
              <div className="project-slide" data-slide="1" style={{ display: 'none', opacity: 0 }}>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Phone Mockup */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="mobile-frame">
                      <div className="w-full h-full bg-black overflow-hidden">
                        <Image
                          src="/images/agro_mart/welcome.jpg"
                          alt="Agri Mart screen"
                          width={360}
                          height={720}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                      <h3 className="text-3xl font-bold text-white mb-4">Agri Mart</h3>
                      <p className="text-gray-300 text-lg mb-6">Agri Mart is a mobile app that helps farmers list and sell agricultural products directly to buyers. Users can explore products, add them to their cart, and place secure orders.</p>

                      {/* Features Display */}
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-cyan-400 mb-3">📱 Features</h4>
                        <div className="text-gray-300 space-y-2">
                          <div>🌱 Product Listing: Farmers can upload product details with images and prices</div>
                          <div>🛒 Add to Cart & Buy: Buyers can add products to the cart and purchase them</div>
                          <div>🔐 Login & Signup: Secure authentication for both buyers and sellers</div>
                          <div>📍 Marketplace Navigation with Home, Explore, Cart, Orders, Profile</div>
                          <div>📝 Product Details Page with seller information</div>
                          <div>💳 Secure Checkout with multiple payment methods</div>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-sm">
                            🛠️
                          </div>
                          <h4 className="text-xl font-semibold text-purple-400">Tech Stack</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Language", value: "Kotlin", icon: "☕" },
                            { label: "UI Design", value: "XML Layouts", icon: "🎨" },
                            { label: "Backend", value: "Firebase", icon: "🔥" },
                            { label: "Database", value: "Firebase Realtime", icon: "🗄️" }
                          ].map((tech, index) => (
                            <motion.div
                              key={index}
                              className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-lg">{tech.icon}</span>
                                <div>
                                  <p className="text-gray-400 text-xs">{tech.label}</p>
                                  <p className="text-white font-medium">{tech.value}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">Android Studio</span>
                        <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">Kotlin</span>
                        <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">Firebase</span>
                        <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/30">REST APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Buttons */}
            <motion.button
              id="prev-slide"
              className="absolute left-3 md:left-6 lg:-left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white rounded-full shadow-2xl z-20 transition-all duration-300 group backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.15, x: -8 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              style={{
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)'
              }}
            >
              <motion.svg
                className="h-6 w-6 md:h-7 md:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                animate={{ x: [-2, 0, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </motion.svg>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              id="next-slide"
              className="absolute right-3 md:right-6 lg:-right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white rounded-full shadow-2xl z-20 transition-all duration-300 group backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.15, x: 8 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              style={{
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)'
              }}
            >
              <motion.svg
                className="h-6 w-6 md:h-7 md:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
            </motion.button>

            {/* Enhanced slide indicators at bottom */}
            <motion.div
              id="slide-dots"
              className="flex justify-center space-x-3 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Dots are dynamically created in useEffect with enhanced styling */}
            </motion.div>

          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-gray-300 text-lg mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
            >
              Interested in collaborating or want to see more of my work?
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let&apos;s Work Together</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🤝
                </motion.span>
              </motion.a>
              <motion.a
                href="https://github.com/nikhilpuppalwar"
                target="_blank"
                rel="noreferrer"
                className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View on GitHub</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🐙
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400 text-lg">My professional journey and internships</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="rounded-xl border border-white/10 p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onClick={() => {
              const certificateUrl = './SpaceECE_Internship.pdf';
              console.log('Opening certificate:', certificateUrl);
              const newWindow = window.open(certificateUrl, '_blank');
              if (!newWindow) {
                alert('Please allow pop-ups for this site to view certificates');
              }
            }}
          >
            <div className="text-xl font-semibold text-white mb-3">💻 Android App Development Intern</div>
            <div className="text-cyan-400 font-medium mb-2">SPACE For Early Childhood Education</div>
            <p className="text-gray-400">Built & enhanced Android apps with modern UI/UX design principles</p>
          </div>
          <div
            className="rounded-xl border border-white/10 p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onClick={() => {
              const certificateUrl = './Infosys_internship_cerificate.pdf';
              console.log('Opening certificate:', certificateUrl);
              const newWindow = window.open(certificateUrl, '_blank');
              if (!newWindow) {
                alert('Please allow pop-ups for this site to view certificates');
              }
            }}
          >
            <div className="text-xl font-semibold text-white mb-3">🎓 Infosys Springboard Internship 6.0</div>
            <div className="text-cyan-400 font-medium mb-2">AI/ML Specialization</div>
            <p className="text-gray-400">Learned AI/software practices and machine learning fundamentals</p>
          </div>
        </div>
      </Section>


      {/* Certificates */}
      <Section id="certificates" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Licenses & Certifications</h2>
          <p className="text-gray-400 text-lg">Professional certifications and achievements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Basics of Python", issuer: "Coding Ninjas", date: "03/14/2024", file: "certificate_coding_ninjas_basic_python.pdf" },
            { title: "Programming in Modern C++", issuer: "NPTEL", date: "Jan-Apr 2024", file: "Programming_in_Modern_C++_Nptel.pdf" },
            { title: "Introduction to SQL", issuer: "Simplilearn", date: "13/01/2025", file: "Introduction_to_SQL.pdf" },
            { title: "Introduction to Deep Learning", issuer: "Infosys Springboard", date: "06/06/2025", file: "Introduction_to_Deep_Learning.pdf" },
            { title: "Artificial Intelligence", issuer: "Infosys Springboard", date: "11/08/2024", file: "Artificial_Intelligence.pdf" },
            { title: "Computer Vision 101", issuer: "Infosys Springboard", date: "june 2025", file: "Computer_Vision_101.pdf" },
            { title: "Generative AI", issuer: "Infosys Springboard", date: "11/06/2025", file: "Generative_AI_Unleashing.pdf" },
            { title: "Android Development", issuer: "Udemy", date: "07/11/2024", file: "Android_p_-prog.pdf" },
            { title: "Data Science", issuer: "Infosys Springboard", date: "07/08/2024", file: "Introduction_to_Data_Science.pdf" },
          ].map((cert, i) => (
            <div key={i} className="group rounded-xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => {
              const certificateUrl = `./certificates/${cert.file}`;
              console.log('Opening certificate:', certificateUrl);
              const newWindow = window.open(certificateUrl, '_blank');
              if (!newWindow) {
                alert('Please allow pop-ups for this site to view certificates');
              }
            }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-18.016z" />
                  </svg>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
              <p className="text-gray-300 mb-1">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date} • No Expiration</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Hire Me */}
      <Section id="why-hire" className="py-20 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Hire Me?</h2>
          <p className="text-gray-400 text-lg">What makes me a valuable team member</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">DSA & Core Engineering</h3>
            <p className="text-gray-400">Strong foundation in Data Structures and Algorithms in C++/Java, ensuring optimal and scalable code for production systems.</p>
          </div>

          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Mobile Development Expertise</h3>
            <p className="text-gray-400">Developed real-time applications like Agri Mart App using Kotlin/Android Studio and Firebase for dynamic listing and secure services.</p>
          </div>

          <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 12h2m10 0h2M3 12l.463-.248A1.103 1.103 0 015.152 9.47L7.5 5.5m0 0h8.5M12 21v-2m0-4v-2m0-4V9m-3 5h6m-3 6h6m-3 0h-6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Practical Machine Learning</h3>
            <p className="text-gray-400">Hands-on experience with TensorFlow, Scikit-learn, Pandas, and Matplotlib for Data Analysis and feature engineering.</p>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Academic Journey</h2>
          <p className="text-gray-400 text-lg">My educational background and achievements</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-cyan-500">
              <h3 className="text-xl font-bold text-white mb-2">B.Tech Computer Engineering</h3>
              <p className="text-gray-300 mb-1">Pimpri Chinchwad College Of Engineering, Pune</p>
              <p className="text-sm text-gray-500 mb-2">2023 - 2027 (Expected Graduation)</p>
              <p className="text-gray-400">Current CGPA: 7.42</p>
            </div>

            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-indigo-500">
              <h3 className="text-xl font-bold text-white mb-2">Class XII (MAHARASHTRA BOARD)</h3>
              <p className="text-gray-300 mb-1">Vikas Hindi Vidyalaya, Pandharkawada</p>
              <p className="text-gray-400">Percentage: 71.33%</p>
            </div>

            <div className="rounded-xl border border-white/10 p-6 bg-white/5 border-l-4 border-l-purple-500">
              <h3 className="text-xl font-bold text-white mb-2">Class X (CBSE)</h3>
              <p className="text-gray-300 mb-1">Gurukul English Medium School, Pandharkawada</p>
              <p className="text-gray-400">Percentage: 85.50%</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="rounded-xl border border-white/10 p-8 bg-white/5 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Resume & Documents</h3>
              <p className="text-gray-400 mb-6">View my complete resume and professional documents</p>
              <div className="space-y-4">
                <button
                  onClick={() => window.open('./Nikhil_resume_5.1.pdf', '_blank')}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                  suppressHydrationWarning
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  View Resume (PDF)
                </button>
                <button
                  onClick={() => window.open('/Nikhil_Puppalwar_Intership.pdf', '_blank')}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                  suppressHydrationWarning
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-18.016z" />
                  </svg>
                  View Internship Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="py-24 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📧
              </motion.span>
              <span>Let&apos;s Connect</span>
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent gradient-text">
                Get In Touch
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Ready to collaborate on your next project? Let&apos;s discuss how we can work together
              to bring your ideas to life with innovative solutions.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Let&apos;s Connect &amp; Work Together</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I&apos;m always excited to discuss new opportunities, collaborate on interesting projects,
                  or simply chat about technology and innovation. Feel free to reach out!
                </p>
              </div>

              {/* Enhanced Contact Cards */}
              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  href="mailto:nikhilpuppalwar16@gmail.com"
                  className="group block p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img src="/images/logo/email_logo.png" alt="Email" className="w-full h-full object-contain" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                        Email
                      </h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        nikhilpuppalwar16@gmail.com
                      </p>
                      <p className="text-sm text-gray-400 mt-1">I&apos;ll respond within 24 hours</p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/nikhilpuppalwar"
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img src="/images/logo/github_logo.svg" alt="GitHub" className="w-full h-full object-contain" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                        GitHub
                      </h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        github.com/nikhilpuppalwar
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Check out my code and projects</p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/in/nikhil-puppalwar"
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img src="/images/logo/linkedin_logo.png" alt="LinkedIn" className="w-full h-full object-contain" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        LinkedIn
                      </h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        linkedin.com/in/nikhil-puppalwar
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Connect with me professionally</p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
              <ContactForm />
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🤝
              </motion.div>
              <div className="text-left">
                <p className="text-white font-semibold">Ready to collaborate?</p>
                <p className="text-gray-300 text-sm">Let&apos;s build something amazing together</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <footer className="py-10 text-center text-xs text-gray-500" suppressHydrationWarning>© {new Date().getFullYear()} Nikhil Dilip Puppalwar</footer>
    </div>
  );
}
