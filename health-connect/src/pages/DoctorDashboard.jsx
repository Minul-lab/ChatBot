import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { patients, prescriptions, testReports, appointments, medicalHistory } from '../data/mockData';

const DoctorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => { logout(); navigate('/login'); };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientData = (patientId) => ({
    prescriptions: prescriptions.filter(p => p.patientId === patientId),
    reports: testReports.filter(r => r.patientId === patientId),
    appointments: appointments.filter(a => a.patientId === patientId),
    history: medicalHistory.filter(h => h.patientId === patientId)
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <nav className="navbar">
        <div className="navbar-brand">HealthConnect - Doctor Portal</div>
        <ul className="navbar-nav">
          <li><span className="nav-link">{currentUser.name}</span></li>
          <li><button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      </nav>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="grid" style={{ marginBottom: '30px' }}>
          <div className="stat-card"><div className="stat-number">{currentUser.patientsCount}</div><div className="stat-label">Total Patients</div></div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}><div className="stat-number">{appointments.filter(a => a.doctorId === currentUser.id).length}</div><div className="stat-label">Appointments</div></div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}><div className="stat-number">{prescriptions.filter(p => p.doctorId === currentUser.id).length}</div><div className="stat-label">Prescriptions</div></div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}><div className="stat-number">{currentUser.experience}</div><div className="stat-label">Experience</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px' }}>
          <div className="card" style={{ height: 'fit-content' }}>
            <h3 className="section-title">My Patients</h3>
            <input type="text" placeholder="Search patients..." className="input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {filteredPatients.map(patient => (
                <div key={patient.id} onClick={() => { setSelectedPatient(patient); setActiveTab('overview'); }} style={{ padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer', background: selectedPatient?.id === patient.id ? '#f0f4ff' : 'transparent', borderRadius: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{patient.name.split(' ').map(n => n[0]).join('')}</div>
                    <div><strong style={{ fontSize: '14px' }}>{patient.name}</strong><p style={{ fontSize: '12px', color: '#666', margin: '2px 0' }}>{patient.age} yrs - {patient.bloodGroup}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            {selectedPatient ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #667eea' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'white' }}>{selectedPatient.gender === 'Male' ? '👨' : '👩'}</div>
                    <div><h2 style={{ marginBottom: '5px' }}>{selectedPatient.name}</h2><p style={{ color: '#666' }}>{selectedPatient.age} years - {selectedPatient.gender} - Blood: <strong style={{ color: '#f44336' }}>{selectedPatient.bloodGroup}</strong></p></div>
                  </div>
                  <button onClick={() => { console.log('Navigating to:', `/patient/profile/${selectedPatient.id}`); navigate(`/patient/profile/${selectedPatient.id}`); }} className="btn btn-secondary">View Full Profile</button>
                </div>
                <div className="grid" style={{ marginBottom: '20px' }}>
                  <div className="card" style={{ background: '#fff3cd', border: '1px solid #ffc107' }}><strong>Allergies:</strong><p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{selectedPatient.allergies.length > 0 ? selectedPatient.allergies.join(', ') : 'None known'}</p></div>
                  <div className="card" style={{ background: '#f8d7da', border: '1px solid #f5c6cb' }}><strong>Chronic Conditions:</strong><p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{selectedPatient.chronicConditions.length > 0 ? selectedPatient.chronicConditions.join(', ') : 'None'}</p></div>
                  <div className="card" style={{ background: '#d1ecf1', border: '1px solid #bee5eb' }}><strong>Insurance:</strong><p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{selectedPatient.insuranceProvider}</p></div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px', flexWrap: 'wrap' }}>
                  {['overview', 'prescriptions', 'reports', 'history'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', border: 'none', background: activeTab === tab ? '#667eea' : '#f5f5f5', color: activeTab === tab ? 'white' : '#333', borderRadius: '5px', cursor: 'pointer', fontWeight: '500', textTransform: 'capitalize' }}>{tab}</button>
                  ))}
                </div>
                {(() => {
                  const patientData = getPatientData(selectedPatient.id);
                  if (activeTab === 'overview') {
                    return (<div><h3 className="section-title">Recent Prescriptions</h3>{patientData.prescriptions.slice(0, 2).map(rx => (<div key={rx.id} className="card" style={{ marginBottom: '15px', background: '#f9f9f9' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><strong>{rx.date}</strong><span className="badge badge-info">{rx.diagnosis}</span></div><p><strong>Medications:</strong></p><ul style={{ marginLeft: '20px', fontSize: '14px' }}>{rx.medicines.map((med, idx) => (<li key={idx}>{med.name} - {med.dosage} ({med.frequency})</li>))}</ul></div>))}<h3 className="section-title" style={{ marginTop: '30px' }}>Recent Test Results</h3>{patientData.reports.slice(0, 3).map(report => (<div key={report.id} style={{ padding: '10px', marginBottom: '10px', background: report.normalRange ? '#d4edda' : '#fff3cd', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><strong>{report.testName}</strong><p style={{ fontSize: '12px', margin: '3px 0 0 0' }}>{report.testDate} - {report.lab}</p></div><span className={`badge ${report.normalRange ? 'badge-success' : 'badge-warning'}`}>{report.normalRange ? 'Normal' : 'Review'}</span></div>))}</div>);
                  }
                  if (activeTab === 'prescriptions') {
                    return (<div><button className="btn btn-primary" style={{ marginBottom: '20px' }}>Write New Prescription</button>{patientData.prescriptions.map(rx => (<div key={rx.id} className="card" style={{ marginBottom: '15px' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><strong>Date: {rx.date}</strong><span className="badge badge-info">Dr. {rx.doctorName}</span></div><p><strong>Diagnosis:</strong> {rx.diagnosis}</p><table className="table" style={{ marginTop: '10px' }}><thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead><tbody>{rx.medicines.map((med, idx) => (<tr key={idx}><td>{med.name}</td><td>{med.dosage}</td><td>{med.frequency}</td><td>{med.duration}</td></tr>))}</tbody></table><p style={{ marginTop: '10px' }}><strong>Notes:</strong> {rx.notes}</p></div>))}</div>);
                  }
                  if (activeTab === 'reports') {
                    return (<div><button className="btn btn-secondary" style={{ marginBottom: '20px' }}>Upload Test Report</button>{patientData.reports.map(report => (<div key={report.id} className="card" style={{ marginBottom: '15px' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><strong>{report.testName}</strong><span className={`badge ${report.normalRange ? 'badge-success' : 'badge-warning'}`}>{report.normalRange ? 'Normal' : 'Review Needed'}</span></div><p><strong>Date:</strong> {report.testDate} | <strong>Lab:</strong> {report.lab}</p><div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginTop: '10px' }}><strong>Results:</strong><table className="table" style={{ marginTop: '10px' }}><tbody>{Object.entries(report.results).map(([key, value]) => (<tr key={key}><td style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</td><td><strong>{value}</strong></td></tr>))}</tbody></table></div></div>))}</div>);
                  }
                  if (activeTab === 'history') {
                    return (<div><h3 className="section-title">Medical History Timeline</h3><div className="timeline">{patientData.history.map(record => (<div key={record.id} className="timeline-item"><strong>{record.condition}</strong> - {record.date}<br /><span style={{ color: '#666' }}>{record.description}</span></div>))}</div></div>);
                  }
                })()}
              </>
            ) : (<div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}><div style={{ fontSize: '64px', marginBottom: '20px' }}>👨‍⚕️</div><h3>Select a Patient</h3><p>Choose a patient from the list to view their complete medical history.</p></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
