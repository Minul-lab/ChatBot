import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { patients, prescriptions, testReports, appointments, medicalHistory } from '../data/mockData';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const patient = patients.find(p => p.id === parseInt(id));
  
  if (!patient) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card">
          <h2>Patient not found</h2>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const prescriptions = prescriptions.filter(p => p.patientId === patient.id);
  const reports = testReports.filter(r => r.patientId === patient.id);
  const appointments = appointments.filter(a => a.patientId === patient.id);
  const history = medicalHistory.filter(h => h.patientId === patient.id);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">🏥 HealthConnect</div>
        <ul className="navbar-nav">
          <li><button onClick={() => navigate(currentUser.role === 'doctor' ? '/doctor' : '/patient')} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Back to Dashboard</button></li>
          <li><button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      </nav>

      <div className="container" style={{ marginTop: '30px' }}>
        {/* Profile Header */}
        <div className="card">
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: 'white'
            }}>
              {patient.gender === 'Male' ? '👨' : '👩'}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '10px' }}>{patient.name}</h1>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
                <span className="badge badge-info">{patient.age} years</span>
                <span className="badge badge-info">{patient.gender}</span>
                <span className="badge badge-warning" style={{ background: '#f44336', color: 'white' }}>Blood Group: {patient.bloodGroup}</span>
              </div>
              <p style={{ color: '#666', marginBottom: '5px' }}>📧 {patient.email}</p>
              <p style={{ color: '#666', marginBottom: '5px' }}>📱 {patient.phone}</p>
              <p style={{ color: '#666' }}>📍 {patient.address}</p>
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid">
          {/* Personal Info */}
          <div className="card">
            <h3 className="section-title">📋 Personal Information</h3>
            <table className="table">
              <tbody>
                <tr><td><strong>Full Name</strong></td><td>{patient.name}</td></tr>
                <tr><td><strong>Age</strong></td><td>{patient.age} years</td></tr>
                <tr><td><strong>Gender</strong></td><td>{patient.gender}</td></tr>
                <tr><td><strong>Blood Group</strong></td><td style={{ color: '#f44336', fontWeight: 'bold' }}>{patient.bloodGroup}</td></tr>
                <tr><td><strong>Email</strong></td><td>{patient.email}</td></tr>
                <tr><td><strong>Phone</strong></td><td>{patient.phone}</td></tr>
                <tr><td><strong>Address</strong></td><td>{patient.address}</td></tr>
                <tr><td><strong>Registered Since</strong></td><td>{patient.registeredDate}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Emergency Contact & Insurance */}
          <div className="card">
            <h3 className="section-title">🚨 Emergency Contact</h3>
            <p style={{ fontSize: '16px' }}>{patient.emergencyContact}</p>
            
            <h3 className="section-title" style={{ marginTop: '30px' }}>💼 Insurance Information</h3>
            <table className="table">
              <tbody>
                <tr><td><strong>Provider</strong></td><td>{patient.insuranceProvider}</td></tr>
                <tr><td><strong>Policy ID</strong></td><td>{patient.insuranceId}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Medical Information */}
        <div className="card">
          <h3 className="section-title">⚠️ Allergies</h3>
          {patient.allergies.length > 0 ? (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {patient.allergies.map((allergy, idx) => (
                <span key={idx} className="badge badge-info" style={{ padding: '8px 15px', fontSize: '14px' }}>
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p>No known allergies</p>
          )}

          <h3 className="section-title" style={{ marginTop: '30px' }}>🏥 Chronic Conditions</h3>
          {patient.chronicConditions.length > 0 ? (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {patient.chronicConditions.map((condition, idx) => (
                <span key={idx} className="badge badge-warning" style={{ padding: '8px 15px', fontSize: '14px' }}>
                  🏥 {condition}
                </span>
              ))}
            </div>
          ) : (
            <p>No chronic conditions</p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid" style={{ marginTop: '20px' }}>
          <div className="stat-card">
            <div className="stat-number">{prescriptions.length}</div>
            <div className="stat-label">Total Prescriptions</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="stat-number">{reports.length}</div>
            <div className="stat-label">Test Reports</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="stat-number">{appointments.length}</div>
            <div className="stat-label">Appointments</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <div className="stat-number">{history.length}</div>
            <div className="stat-label">Medical History Records</div>
          </div>
        </div>

        {/* Medical History Timeline */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 className="section-title">📜 Complete Medical History</h3>
          {history.length > 0 ? (
            <div className="timeline">
              {history.map(record => (
                <div key={record.id} className="timeline-item">
                  <strong style={{ fontSize: '16px' }}>{record.condition}</strong>
                  <span style={{ color: '#667eea', marginLeft: '10px' }}>- {record.date}</span>
                  <p style={{ margin: '8px 0', color: '#555' }}>{record.description}</p>
                  <small style={{ color: '#999' }}>Treating Doctor: {record.treatingDoctor}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>No medical history records</p>
          )}
        </div>

        {/* Recent Prescriptions */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 className="section-title">💊 Recent Prescriptions</h3>
          {prescriptions.length > 0 ? (
            prescriptions.slice(0, 3).map(rx => (
              <div key={rx.id} style={{ 
                padding: '15px', 
                marginBottom: '15px', 
                background: '#f9f9f9', 
                borderRadius: '5px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>📅 {rx.date}</strong>
                  <span className="badge badge-info">Dr. {rx.doctorName}</span>
                </div>
                <p><strong>Diagnosis:</strong> {rx.diagnosis}</p>
                <p><strong>Medications:</strong></p>
                <ul style={{ marginLeft: '20px', fontSize: '14px' }}>
                  {rx.medicines.map((med, idx) => (
                    <li key={idx}>{med.name} - {med.dosage} ({med.frequency})</li>
                  ))}
                </ul>
                <p style={{ marginTop: '10px' }}><strong>Notes:</strong> {rx.notes}</p>
              </div>
            ))
          ) : (
            <p>No prescriptions found</p>
          )}
        </div>

        {/* Test Reports */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 className="section-title">📊 Recent Test Reports</h3>
          {reports.length > 0 ? (
            reports.map(report => (
              <div key={report.id} style={{ 
                padding: '15px', 
                marginBottom: '15px', 
                background: report.normalRange ? '#d4edda' : '#fff3cd',
                borderRadius: '5px',
                border: `1px solid ${report.normalRange ? '#c3e6cb' : '#ffeeba'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>{report.testName}</strong>
                  <span className={`badge ${report.normalRange ? 'badge-success' : 'badge-warning'}`}>
                    {report.normalRange ? '✓ Normal Range' : '⚠ Review Needed'}
                  </span>
                </div>
                <p><strong>Date:</strong> {report.testDate} | <strong>Lab:</strong> {report.lab}</p>
                <div style={{ marginTop: '10px' }}>
                  <strong>Key Results:</strong>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
                    {Object.entries(report.results).map(([key, value]) => (
                      <div key={key} style={{ background: 'white', padding: '8px', borderRadius: '5px' }}>
                        <span style={{ textTransform: 'capitalize', fontSize: '12px', color: '#666' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <br />
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                {report.notes && <p style={{ marginTop: '10px' }}><strong>Notes:</strong> {report.notes}</p>}
              </div>
            ))
          ) : (
            <p>No test reports found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
