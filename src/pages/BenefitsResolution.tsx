import { useState } from 'react'
import './BenefitsResolution.css'

interface BenefitApplication {
  id: number
  applicantName: string
  benefitType: string
  status: 'pending' | 'approved' | 'needs-review' | 'resolved'
  dateSubmitted: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  description: string
}

interface BenefitResource {
  id: number
  title: string
  category: string
  description: string
  eligibilityCriteria: string[]
  howToApply: string
  estimatedTimeframe: string
}

function BenefitsResolution() {
  // Sample applications for development
  const [applications, setApplications] = useState<BenefitApplication[]>([
    {
      id: 1,
      applicantName: 'Anonymous User #1234',
      benefitType: 'Housing Assistance',
      status: 'pending',
      dateSubmitted: '2025-11-20',
      urgency: 'critical',
      description: 'Family of 4 facing eviction. Need emergency housing support.'
    },
    {
      id: 2,
      applicantName: 'Anonymous User #5678',
      benefitType: 'Food Assistance',
      status: 'needs-review',
      dateSubmitted: '2025-11-22',
      urgency: 'high',
      description: 'Single parent with 2 children. Lost job last month.'
    },
    {
      id: 3,
      applicantName: 'Anonymous User #9012',
      benefitType: 'Healthcare',
      status: 'approved',
      dateSubmitted: '2025-11-15',
      urgency: 'medium',
      description: 'Need assistance with prescription medication costs.'
    }
  ])

  const [resources] = useState<BenefitResource[]>([
    {
      id: 1,
      title: 'Emergency Housing Support',
      category: 'Housing',
      description: 'Immediate assistance for families facing homelessness or eviction',
      eligibilityCriteria: [
        'Income below 50% of area median',
        'Facing imminent eviction (within 30 days)',
        'Resident of jurisdiction for 6+ months'
      ],
      howToApply: 'Submit application online or visit local office with proof of income and eviction notice',
      estimatedTimeframe: '3-5 business days for emergency cases'
    },
    {
      id: 2,
      title: 'SNAP Benefits',
      category: 'Food',
      description: 'Monthly food assistance for eligible households',
      eligibilityCriteria: [
        'Income at or below 130% of poverty line',
        'U.S. citizen or eligible non-citizen',
        'Meet work requirements (if applicable)'
      ],
      howToApply: 'Apply online through state portal or at local Department of Social Services',
      estimatedTimeframe: '30 days from application date'
    },
    {
      id: 3,
      title: 'Medicaid Coverage',
      category: 'Healthcare',
      description: 'Comprehensive health coverage for eligible individuals and families',
      eligibilityCriteria: [
        'Income requirements vary by state',
        'U.S. citizen or eligible immigrant',
        'State residency'
      ],
      howToApply: 'Apply through Healthcare.gov or state Medicaid office',
      estimatedTimeframe: '45-90 days'
    }
  ])

  const [selectedApplication, setSelectedApplication] = useState<BenefitApplication | null>(null)
  const [activeTab, setActiveTab] = useState<'applications' | 'resources' | 'new-request'>('applications')

  // Form state for new requests
  const [newRequest, setNewRequest] = useState({
    benefitType: '',
    urgency: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    description: ''
  })

  const handleStatusChange = (applicationId: number, newStatus: BenefitApplication['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ))
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newApplication: BenefitApplication = {
      id: Date.now(),
      applicantName: `Anonymous User #${Math.floor(1000 + Math.random() * 9000)}`,
      benefitType: newRequest.benefitType,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      urgency: newRequest.urgency,
      description: newRequest.description
    }
    setApplications([newApplication, ...applications])
    setNewRequest({ benefitType: '', urgency: 'medium', description: '' })
    setActiveTab('applications')
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '#D32F2F'
      case 'high': return '#F57C00'
      case 'medium': return '#FBC02D'
      case 'low': return '#388E3C'
      default: return '#757575'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50'
      case 'pending': return '#FF9800'
      case 'needs-review': return '#2196F3'
      case 'resolved': return '#9E9E9E'
      default: return '#757575'
    }
  }

  return (
    <div className="benefits-resolution">
      <header className="benefits-header">
        <button 
          className="back-to-home-btn"
          onClick={() => window.location.reload()}
          title="Back to Home"
        >
          ← Home
        </button>
        <div className="header-content">
          <h1>🤝 Benefits Resolution System</h1>
          <p className="header-subtitle">
            Helping everyone access the support they deserve - regardless of socio-economic status
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Active Cases</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {applications.filter(app => app.status === 'resolved' || app.status === 'approved').length}
            </span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{resources.length}</span>
            <span className="stat-label">Resources</span>
          </div>
        </div>
      </header>

      <nav className="benefits-tabs">
        <button 
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          📋 Applications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          📚 Resources
        </button>
        <button 
          className={`tab-btn ${activeTab === 'new-request' ? 'active' : ''}`}
          onClick={() => setActiveTab('new-request')}
        >
          ➕ New Request
        </button>
      </nav>

      <main className="benefits-main">
        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-view">
            <div className="applications-grid">
              {applications.map(app => (
                <div 
                  key={app.id} 
                  className="application-card"
                  onClick={() => setSelectedApplication(app)}
                >
                  <div className="card-header">
                    <h3>{app.applicantName}</h3>
                    <span 
                      className="urgency-badge"
                      style={{ backgroundColor: getUrgencyColor(app.urgency) }}
                    >
                      {app.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="benefit-type">🎯 {app.benefitType}</p>
                    <p className="description">{app.description}</p>
                    <div className="card-meta">
                      <span className="date">📅 {app.dateSubmitted}</span>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(app.status) }}
                      >
                        {app.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as BenefitApplication['status'])}
                      onClick={(e) => e.stopPropagation()}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="needs-review">Needs Review</option>
                      <option value="approved">Approved</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {selectedApplication && (
              <div className="application-details">
                <div className="details-header">
                  <h2>Application Details</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedApplication(null)}
                  >
                    ✕
                  </button>
                </div>
                <div className="details-content">
                  <div className="detail-row">
                    <strong>Applicant:</strong>
                    <span>{selectedApplication.applicantName}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Benefit Type:</strong>
                    <span>{selectedApplication.benefitType}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Status:</strong>
                    <span style={{ color: getStatusColor(selectedApplication.status) }}>
                      {selectedApplication.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Urgency:</strong>
                    <span style={{ color: getUrgencyColor(selectedApplication.urgency) }}>
                      {selectedApplication.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Date Submitted:</strong>
                    <span>{selectedApplication.dateSubmitted}</span>
                  </div>
                  <div className="detail-row full-width">
                    <strong>Description:</strong>
                    <p>{selectedApplication.description}</p>
                  </div>
                  
                  {/* TODO: Add case notes, communication history, document uploads */}
                  <div className="dev-placeholder">
                    <h3>🚧 Development Area</h3>
                    <ul>
                      <li>Add case notes and timeline</li>
                      <li>Communication with applicant</li>
                      <li>Document upload/management</li>
                      <li>Eligibility checker integration</li>
                      <li>Automated status updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="resources-view">
            <div className="resources-grid">
              {resources.map(resource => (
                <div key={resource.id} className="resource-card">
                  <h3>{resource.title}</h3>
                  <span className="resource-category">{resource.category}</span>
                  <p className="resource-description">{resource.description}</p>
                  
                  <div className="resource-section">
                    <h4>✓ Eligibility Criteria:</h4>
                    <ul>
                      {resource.eligibilityCriteria.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="resource-section">
                    <h4>📝 How to Apply:</h4>
                    <p>{resource.howToApply}</p>
                  </div>

                  <div className="resource-section">
                    <h4>⏱️ Estimated Timeframe:</h4>
                    <p>{resource.estimatedTimeframe}</p>
                  </div>

                  <button className="resource-action-btn">
                    Share with Applicant
                  </button>
                </div>
              ))}
            </div>

            {/* TODO: Add more resource management features */}
            <div className="dev-placeholder">
              <h3>🚧 Development Area</h3>
              <ul>
                <li>Add resource search and filtering</li>
                <li>Create new resource entries</li>
                <li>Link resources to applications</li>
                <li>Track resource effectiveness</li>
                <li>Integration with external benefit databases</li>
              </ul>
            </div>
          </div>
        )}

        {/* New Request Tab */}
        {activeTab === 'new-request' && (
          <div className="new-request-view">
            <form onSubmit={handleSubmitRequest} className="request-form">
              <h2>Submit New Benefit Request</h2>
              <p className="form-intro">
                This information is kept confidential. You will be assigned an anonymous ID.
              </p>

              <div className="form-group">
                <label htmlFor="benefitType">Type of Benefit Needed *</label>
                <select
                  id="benefitType"
                  value={newRequest.benefitType}
                  onChange={(e) => setNewRequest({ ...newRequest, benefitType: e.target.value })}
                  required
                >
                  <option value="">Select benefit type...</option>
                  <option value="Housing Assistance">Housing Assistance</option>
                  <option value="Food Assistance">Food Assistance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Employment">Employment Support</option>
                  <option value="Childcare">Childcare</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Education">Education/Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="urgency">Urgency Level *</label>
                <select
                  id="urgency"
                  value={newRequest.urgency}
                  onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value as any })}
                  required
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Need within 30 days</option>
                  <option value="high">High - Need within 2 weeks</option>
                  <option value="critical">Critical - Immediate need</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description of Your Situation *</label>
                <textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Please describe your situation and what kind of help you need..."
                  rows={6}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setNewRequest({ benefitType: '', urgency: 'medium', description: '' })}
                >
                  Clear Form
                </button>
              </div>
            </form>

            {/* TODO: Add more intake form features */}
            <div className="dev-placeholder">
              <h3>🚧 Development Area</h3>
              <ul>
                <li>Add eligibility pre-screening</li>
                <li>Document upload capability</li>
                <li>Multi-step application wizard</li>
                <li>AI-powered benefit matching</li>
                <li>Real-time validation and help</li>
                <li>SMS/Email notification preferences</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="benefits-footer">
        <div className="footer-content">
          <p>💙 All applications are handled with dignity, respect, and confidentiality</p>
          <p className="dev-note">
            🚧 <strong>Development Mode:</strong> This is your workspace to build out the Benefits Resolution System
          </p>
        </div>
      </footer>
    </div>
  )
}

export default BenefitsResolution
