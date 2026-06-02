import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockDoctors, mockPatients } from '../data/mockData';

const Login = () => {
  const [loginType, setLoginType] = useState('patient');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      setError('Please select a user');
      return;
    }

    const users = loginType === 'doctor' ? mockDoctors : mockPatients;
    const user = users.find(u => u.id === parseInt(selectedUser));

    if (user) {
      login({
        ...user,
        role: loginType,
        id: user.id
      });
      navigate(loginType === 'doctor' ? '/doctor' : '/patient');
    } else {
      setError('User not found');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea', marginBottom: '10px' }}>🏥 HealthConnect</h1>
          <p style={{ color: '#666' }}>Seamless Doctor-Patient Integration</p>
        </div>

        <div style={{ display: 'flex', marginBottom: '30px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
          <button
            type="button"
            onClick={() => { setLoginType('patient'); setError(''); }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: loginType === 'patient' ? '#667eea' : '#f5f5f5',
              color: loginType === 'patient' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            👤 Patient Login
          </button>
          <button
            type="button"
            onClick={() => { setLoginType('doctor'); setError(''); }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: loginType === 'doctor' ? '#667eea' : '#f5f5f5',
              color: loginType === 'doctor' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            🩺 Doctor Login
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              Select {loginType === 'doctor' ? 'Doctor' : 'Patient'} Account
            </label>
            <select
              className="input"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              <option value="">-- Choose an account --</option>
              {(loginType === 'doctor' ? mockDoctors : mockPatients).map(user => (
                <option key={user.id} value={user.id}>
                  {loginType === 'doctor' ? user.name + ' - ' + user.specialization : user.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#c00', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
            🔐 Login to Dashboard
          </button>
        </form>

        <div style={{ marginTop: '25px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', fontSize: '13px' }}>
          <strong>ℹ️ Demo Accounts:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px', color: '#666' }}>
            <li><strong>Patients:</strong> John Smith, Sarah Johnson, Michael Chen, Emily Davis</li>
            <li><strong>Doctors:</strong> Dr. Robert Wilson, Dr. Amanda Lee, Dr. James Martinez</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
