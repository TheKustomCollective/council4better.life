import { useState } from 'react'
import './App.css'
import BenefitsResolution from './pages/BenefitsResolution'

interface StreetWord {
  id: number
  author: string
  message: string
  emoji: string
  timestamp: string
}

function App() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'benefits'>('home')
  const [streetWords, setStreetWords] = useState<StreetWord[]>([
    { id: 1, author: 'Maria R.', message: 'The new bike lanes on Main Street are amazing! Feels so much safer now.', emoji: '🚴‍♀️', timestamp: '2 hours ago' },
    { id: 2, author: 'James K.', message: 'Can we get more lighting in Central Park? Gets dark really early this time of year.', emoji: '💡', timestamp: '5 hours ago' },
    { id: 3, author: 'Aisha P.', message: 'Thank you to the sanitation team! Our neighborhood has never looked cleaner.', emoji: '🙏', timestamp: '1 day ago' },
    { id: 4, author: 'Tom H.', message: 'The community garden initiative is thriving! Come join us on Saturdays!', emoji: '🌱', timestamp: '2 days ago' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('')

  const handleSubmitWord = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && userName.trim()) {
      const emojis = ['💬', '✨', '🎯', '🌟', '💡', '🎨', '🚀', '❤️']
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      
      const newWord: StreetWord = {
        id: Date.now(),
        author: userName,
        message: newMessage,
        emoji: randomEmoji,
        timestamp: 'Just now'
      }
      
      setStreetWords([newWord, ...streetWords])
      setNewMessage('')
      setUserName('')
    }
  }

  if (currentPage === 'benefits') {
    return <BenefitsResolution />
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <div className="logo">🏛️</div>
          <h1>Council for a Better Life</h1>
          <p className="tagline">Together, We Thrive</p>
        </div>
        <nav className="main-nav">
          <button 
            className="nav-button"
            onClick={() => setCurrentPage('benefits')}
          >
            🤝 Benefits Resolution
          </button>
          <div 
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="dropdown-toggle">
              Initiatives ▼
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="#living-legacy" className="dropdown-item">
                  🕊️ Living Legacy
                </a>
                <a href="https://commercecult.app" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  🚀 Fund My Startup
                </a>
                <a href="#launch-initiative" className="dropdown-item">
                  🌟 Launch Your Initiative
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main>
        {/* Top Banner Ad */}
        <div className="ad-banner ad-top">
          <div className="ad-placeholder">
            <span>Advertisement</span>
            <p>728 x 90</p>
          </div>
        </div>

        <section className="hero">
          <div className="diversity-icons">
            <span className="people-icon">👨‍💼</span>
            <span className="people-icon">👩‍⚕️</span>
            <span className="people-icon">👨‍🎨</span>
            <span className="people-icon">👩‍🏫</span>
            <span className="people-icon">👨‍🍳</span>
            <span className="people-icon">👩‍🔧</span>
            <span className="people-icon">🧑‍🌾</span>
            <span className="people-icon">👩‍💻</span>
          </div>
          <h2>Every Voice Matters. Every Role Counts.</h2>
          <p>We celebrate the beautiful diversity of our community - from dreamers to doers, from caregivers to creators. Together, we build a world where everyone belongs.</p>
          <div className="hero-badges">
            <span className="badge">🤝 Inclusive</span>
            <span className="badge">💖 Supportive</span>
            <span className="badge">🌍 United</span>
            <span className="badge">✨ Empowering</span>
          </div>
        </section>

        <section className="word-on-street">
          <div className="section-header">
            <h2>📢 Word on the Street</h2>
            <p>Real voices. Real community. What's on your mind?</p>
          </div>

          <form onSubmit={handleSubmitWord} className="word-form">
            <div className="form-inputs">
              <input
                type="text"
                placeholder="Your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="word-input name-input"
                maxLength={30}
              />
              <input
                type="text"
                placeholder="Share your thoughts with the community..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="word-input message-input"
                maxLength={200}
              />
              <button type="submit" className="submit-word-btn">
                Post 🎙️
              </button>
            </div>
          </form>

          <div className="street-words-grid">
            {streetWords.map((word) => (
              <div key={word.id} className="street-word-card">
                <div className="word-header">
                  <span className="word-emoji">{word.emoji}</span>
                  <div className="word-meta">
                    <strong>{word.author}</strong>
                    <span className="word-time">{word.timestamp}</span>
                  </div>
                </div>
                <p className="word-message">{word.message}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Side Ad - Desktop */}
        <aside className="ad-sidebar">
          <div className="ad-placeholder ad-vertical">
            <span>Advertisement</span>
            <p>300 x 600</p>
          </div>
        </aside>

        <section className="initiatives">
          <div id="living-legacy" className="initiative-card card-purple">
            <div className="initiative-icon">🕊️</div>
            <h3>Living Legacy</h3>
            <p className="subtitle">End of Life Concierge Service</p>
            <p>Compassionate support and guidance for end-of-life planning. We honor every life story with dignity, respect, and care.</p>
            <button className="cta-button">Learn More</button>
          </div>

          <div className="initiative-card card-orange">
            <div className="initiative-icon">🚀</div>
            <h3>Fund My Startup</h3>
            <p className="subtitle">Through CommerceCult.app</p>
            <p>Turn your dreams into reality! Connect with investors and resources to bring your innovative ideas to life.</p>
            <a href="https://commercecult.app" target="_blank" rel="noopener noreferrer">
              <button className="cta-button">Visit CommerceCult</button>
            </a>
          </div>

          <div id="launch-initiative" className="initiative-card card-blue">
            <div className="initiative-icon">🌟</div>
            <h3>Launch Your Initiative</h3>
            <p className="subtitle">AI-Assisted Setup & Compliance</p>
            <p>Your vision can change the world! Let our AI guide you through:</p>
            <ul className="feature-list">
              <li>✓ Simple form filing for your region</li>
              <li>✓ Tax account setup made easy</li>
              <li>✓ Federal compliance guidance</li>
              <li>✓ Friendly daily reminders</li>
              <li>✓ Your success, our mission</li>
            </ul>
            <button className="cta-button primary">Start Your Journey</button>
          </div>
        </section>

        {/* Mid-Content Ad */}
        <div className="ad-banner ad-mid">
          <div className="ad-placeholder">
            <span>Advertisement</span>
            <p>970 x 250</p>
          </div>
        </div>

        <section className="how-it-works">
          <h2>Your Journey to Making a Difference</h2>
          <p className="section-subtitle">We're with you every step of the way! 🎉</p>
          <div className="steps">
            <div className="step">
              <div className="step-number step-1">1</div>
              <h4>Share Your Dream</h4>
              <p>Tell us about your beautiful vision for change</p>
            </div>
            <div className="step">
              <div className="step-number step-2">2</div>
              <h4>Get Personal Guidance</h4>
              <p>Our AI learns your needs and creates your custom roadmap</p>
            </div>
            <div className="step">
              <div className="step-number step-3">3</div>
              <h4>Stay Motivated</h4>
              <p>Receive cheerful reminders and celebrate small wins</p>
            </div>
            <div className="step">
              <div className="step-number step-4">4</div>
              <h4>Launch & Inspire</h4>
              <p>Go live and start making the world better!</p>
            </div>
          </div>
        </section>

        {/* Bottom Banner Ad */}
        <div className="ad-banner ad-bottom">
          <div className="ad-placeholder">
            <span>Advertisement</span>
            <p>728 x 90</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
