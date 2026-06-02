import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loginType, setLoginType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!email || !password) {
      setLocalError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = await login(email, password, loginType);
      console.log('Login successful:', user);
      navigate(loginType === 'doctor' ? '/doctor' : '/patient', { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setLocalError(error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (type) => {
    if (type === 'patient') {
      setEmail('john.smith@email.com');
      setPassword('patient123');
    } else {
      setEmail('dr.wilson@hospital.com');
      setPassword('doctor123');
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
            onClick={() => { setLoginType('patient'); fillDemoCredentials('patient'); }}
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
            onClick={() => { setLoginType('doctor'); fillDemoCredentials('doctor'); }}
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
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input"
              placeholder={`Enter ${loginType} email`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '15px' }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '15px' }}
              required
            />
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

          {localError && (
            <div style={{ 
              background: '#fee', 
              color: '#c00', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              ⚠️ {localError}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '16px' }}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Logging in...' : '🔐 Login to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '25px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', fontSize: '13px' }}>
          <strong>ℹ️ Demo Accounts:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px', color: '#666' }}>
            <li><strong>Patient:</strong> john.smith@email.com / patient123</li>
            <li><strong>Doctor:</strong> dr.wilson@hospital.com / doctor123</li>
          </ul>
          <p style={{ marginTop: '8px', color: '#999', fontSize: '12px' }}>
            💡 Click the Patient/Doctor tabs above to auto-fill credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
