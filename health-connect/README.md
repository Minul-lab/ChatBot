# 🏥 HealthConnect - Doctor-Patient Integration App

A comprehensive frontend application for seamless integration between doctors and patients, enabling secure access to medical records, prescriptions, test reports, and more.

## Features

### For Patients
- **Personal Dashboard**: View your complete health profile at a glance
- **Prescription History**: Access all past and current prescriptions with detailed medication information
- **Test Reports**: View lab results and diagnostic reports with normal/abnormal indicators
- **Appointments**: Track upcoming and past appointments with doctors
- **Medical History**: Timeline view of all medical conditions and treatments
- **Quick Stats**: Instant overview of total prescriptions, tests, and health records

### For Doctors (Authorized Access Only)
- **Patient Search**: Find patients quickly with search functionality
- **Comprehensive Patient Profiles**: Access complete patient medical history
- **Prescription Management**: View patient prescription history and write new prescriptions
- **Test Report Analysis**: Review patient test results with visual indicators
- **Medical Timeline**: See chronological medical history for better diagnosis
- **Quick Info Cards**: Instant access to allergies, chronic conditions, and insurance info
- **Secure Access**: Only authorized doctors can view patient data

## Tech Stack
- **React 18** - UI library
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with gradients and modern design

## Project Structure
```
health-connect/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context (AuthContext)
│   ├── data/             # Mock data for demo
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   └── PatientProfile.jsx
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## Getting Started

### Installation
```bash
cd health-connect
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Demo Accounts

### Patients
- John Smith (Diabetes, Hypertension)
- Sarah Johnson (Asthma)
- Michael Chen (Heart Disease)
- Emily Davis (No chronic conditions)

### Doctors
- Dr. Robert Wilson (Endocrinologist)
- Dr. Amanda Lee (Cardiologist)
- Dr. James Martinez (Cardiothoracic Surgeon)
- Dr. Sarah Thompson (General Physician)

## Key Features Implemented

1. **Authentication System**: Role-based login for patients and doctors
2. **Protected Routes**: Secure access control based on user role
3. **Patient Dashboard**: Complete view of personal health data
4. **Doctor Dashboard**: Professional interface for patient management
5. **Medical Records**: Prescriptions, test reports, appointments, history
6. **Search Functionality**: Quick patient lookup for doctors
7. **Responsive Design**: Works on desktop and mobile devices
8. **Visual Indicators**: Color-coded badges for quick status recognition

## Security Notes
This is a frontend-only demo application. In production, you would need:
- Backend API for data persistence
- HIPAA-compliant data storage
- OAuth/JWT authentication
- End-to-end encryption
- Audit logging for access tracking
- Patient consent management

## License
MIT License
