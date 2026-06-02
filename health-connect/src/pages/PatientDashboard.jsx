import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { prescriptions, testReports, appointments, medicalHistory } from '../data/mockData';

const PatientDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const patientPrescriptions = prescriptions.filter(p => p.patientId === currentUser.id);
  const patientReports = testReports.filter(r => r.patientId === currentUser.id);
  const patientAppointments = appointments.filter(a => a.patientId === currentUser.id);
  const patientHistory = medicalHistory.filter(h => h.patientId === currentUser.id);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">🏥 HealthConnect</div>
        <ul className="navbar-nav">
          <li><span className="nav-link">👤 {currentUser.name}</span></li>
          <li><button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      </nav>

      <div className="container" style={{ marginTop: '30px' }}>
        {/* Profile Summary Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                color: 'white'
              }}>
                👤
              </div>
              <div>
                <h2 style={{ marginBottom: '5px' }}>{currentUser.name}</h2>
                <p style={{ color: '#666' }}>
                  {currentUser.age} years • {currentUser.gender} • Blood Group: {currentUser.bloodGroup}
                </p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  📧 {currentUser.email} | 📱 {currentUser.phone}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/patient/profile/${currentUser.id}`)}
              className="btn btn-secondary"
            >
              View Full Profile
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid" style={{ marginBottom: '30px' }}>
          <div className="stat-card">
            <div className="stat-number">{patientPrescriptions.length}</div>
            <div className="stat-label">Total Prescriptions</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="stat-number">{patientReports.length}</div>
            <div className="stat-label">Test Reports</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="stat-number">{patientAppointments.filter(a => a.status === 'Scheduled').length}</div>
            <div className="stat-label">Upcoming Appointments</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <div className="stat-number">{patientHistory.length}</div>
            <div className="stat-label">Medical History Records</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            {['overview', 'prescriptions', 'reports', 'appointments', 'history'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: activeTab === tab ? '#667eea' : '#f5f5f5',
                  color: activeTab === tab ? 'white' : '#333',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="section-title">Recent Activity</h3>
              <div className="timeline">
                {patientPrescriptions.slice(0, 3).map(rx => (
                  <div key={rx.id} className="timeline-item">
                    <strong>Prescription</strong> - {rx.date}<br />
                    <span style={{ color: '#666' }}>Dr. {rx.doctorName}: {rx.diagnosis}</span>
                  </div>
                ))}
                {patientReports.slice(0, 2).map(report => (
                  <div key={report.id} className="timeline-item">
                    <strong>Test Report</strong> - {report.testDate}<br />
                    <span style={{ color: '#666' }}>{report.testName} at {report.lab}</span>
                  </div>
                ))}
              </div>

              <h3 className="section-title" style={{ marginTop: '30px' }}>Current Medications</h3>
              {patientPrescriptions.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientPrescriptions[0]?.medicines.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.name}</td>
                        <td>{med.dosage}</td>
                        <td>{med.frequency}</td>
                        <td>{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No current medications</p>
              )}

              <h3 className="section-title" style={{ marginTop: '30px' }}>Health Conditions</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {currentUser.chronicConditions.length > 0 ? (
                  currentUser.chronicConditions.map((condition, idx) => (
                    <span key={idx} className="badge badge-warning">{condition}</span>
                  ))
                ) : (
                  <span className="badge badge-success">No chronic conditions</span>
                )}
                {currentUser.allergies.length > 0 && (
                  <>
                    <span style={{ color: '#666' }}>|</span>
                    <span style={{ color: '#666', fontWeight: '500' }}>Allergies:</span>
                    {currentUser.allergies.map((allergy, idx) => (
                      <span key={idx} className="badge badge-info">{allergy}</span>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div>
              <h3 className="section-title">Prescription History</h3>
              {patientPrescriptions.map(rx => (
                <div key={rx.id} className="card" style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong>Date: {rx.date}</strong>
                    <span className="badge badge-info">Dr. {rx.doctorName}</span>
                  </div>
                  <p><strong>Diagnosis:</strong> {rx.diagnosis}</p>
                  <table className="table" style={{ marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rx.medicines.map((med, idx) => (
                        <tr key={idx}>
                          <td>{med.name}</td>
                          <td>{med.dosage}</td>
                          <td>{med.frequency}</td>
                          <td>{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ marginTop: '10px' }}><strong>Notes:</strong> {rx.notes}</p>
                  <p><strong>Follow-up:</strong> {rx.followUpDate}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h3 className="section-title">Test Reports</h3>
              {patientReports.map(report => (
                <div key={report.id} className="card" style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong>{report.testName}</strong>
                    <span className={`badge ${report.normalRange ? 'badge-success' : 'badge-warning'}`}>
                      {report.normalRange ? 'Normal' : 'Review Needed'}
                    </span>
                  </div>
                  <p><strong>Date:</strong> {report.testDate} | <strong>Lab:</strong> {report.lab}</p>
                  <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                    <strong>Results:</strong>
                    <table className="table" style={{ marginTop: '10px' }}>
                      <tbody>
                        {Object.entries(report.results).map(([key, value]) => (
                          <tr key={key}>
                            <td style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {report.notes && <p style={{ marginTop: '10px' }}><strong>Notes:</strong> {report.notes}</p>}
                  <button className="btn btn-secondary" style={{ marginTop: '10px' }}>
                    📄 Download Report
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h3 className="section-title">Appointments</h3>
              {patientAppointments.map(apt => (
                <div key={apt.id} className="card" style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong>{apt.type} with {apt.doctorName}</strong>
                    <span className={`badge ${apt.status === 'Scheduled' ? 'badge-info' : 'badge-success'}`}>
                      {apt.status}
                    </span>
                  </div>
                  <p>📅 {apt.date} at {apt.time}</p>
                  <p>📝 {apt.notes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="section-title">Medical History</h3>
              <div className="timeline">
                {patientHistory.map(record => (
                  <div key={record.id} className="timeline-item">
                    <strong>{record.condition}</strong> - {record.date}<br />
                    <span style={{ color: '#666' }}>{record.description}</span><br />
                    <small>Treating Doctor: {record.treatingDoctor}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
