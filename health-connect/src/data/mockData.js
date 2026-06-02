// Mock data for the HealthConnect application

export const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "Jane Smith - +1 (555) 987-6543",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Diabetes Type 2", "Hypertension"],
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceId: "BCB123456789",
    registeredDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    phone: "+1 (555) 234-5678",
    email: "sarah.j@email.com",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    emergencyContact: "Mike Johnson - +1 (555) 876-5432",
    allergies: ["Shellfish"],
    chronicConditions: ["Asthma"],
    insuranceProvider: "Aetna",
    insuranceId: "AET987654321",
    registeredDate: "2023-03-22"
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 58,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+1 (555) 345-6789",
    email: "m.chen@email.com",
    address: "789 Pine Rd, Chicago, IL 60601",
    emergencyContact: "Lisa Chen - +1 (555) 765-4321",
    allergies: ["Latex", "Aspirin"],
    chronicConditions: ["Heart Disease", "High Cholesterol"],
    insuranceProvider: "UnitedHealthcare",
    insuranceId: "UHC456789123",
    registeredDate: "2022-11-08"
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+1 (555) 456-7890",
    email: "emily.d@email.com",
    address: "321 Elm St, Houston, TX 77001",
    emergencyContact: "Robert Davis - +1 (555) 654-3210",
    allergies: [],
    chronicConditions: [],
    insuranceProvider: "Cigna",
    insuranceId: "CIG789123456",
    registeredDate: "2024-01-10"
  }
];

export const mockPrescriptions = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    doctorName: "Dr. Robert Wilson",
    date: "2024-01-15",
    diagnosis: "Type 2 Diabetes - Regular Checkup",
    medicines: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" },
      { name: "Glipizide", dosage: "5mg", frequency: "Once daily", duration: "30 days" }
    ],
    notes: "Continue current medication. Monitor blood sugar levels daily.",
    followUpDate: "2024-02-15"
  },
  {
    id: 2,
    patientId: 1,
    doctorId: 2,
    doctorName: "Dr. Amanda Lee",
    date: "2024-01-10",
    diagnosis: "Hypertension Management",
    medicines: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "60 days" },
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "60 days" }
    ],
    notes: "Blood pressure improved. Continue medication and reduce salt intake.",
    followUpDate: "2024-03-10"
  },
  {
    id: 3,
    patientId: 2,
    doctorId: 1,
    doctorName: "Dr. Robert Wilson",
    date: "2024-01-20",
    diagnosis: "Asthma - Seasonal Allergy",
    medicines: [
      { name: "Albuterol Inhaler", dosage: "90mcg", frequency: "As needed", duration: "90 days" },
      { name: "Fluticasone", dosage: "50mcg", frequency: "Twice daily", duration: "60 days" }
    ],
    notes: "Avoid allergens. Use inhaler before exercise.",
    followUpDate: "2024-02-20"
  },
  {
    id: 4,
    patientId: 3,
    doctorId: 3,
    doctorName: "Dr. James Martinez",
    date: "2024-01-18",
    diagnosis: "Cardiac Follow-up",
    medicines: [
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", duration: "90 days" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "Indefinite" },
      { name: "Metoprolol", dosage: "25mg", frequency: "Twice daily", duration: "90 days" }
    ],
    notes: "ECG shows improvement. Continue cardiac rehabilitation exercises.",
    followUpDate: "2024-04-18"
  },
  {
    id: 5,
    patientId: 1,
    doctorId: 1,
    doctorName: "Dr. Robert Wilson",
    date: "2023-12-15",
    diagnosis: "Diabetes - Quarterly Checkup",
    medicines: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days" }
    ],
    notes: "HbA1c levels stable. Maintain diet and exercise routine.",
    followUpDate: "2024-01-15"
  }
];

export const mockTestReports = [
  {
    id: 1,
    patientId: 1,
    testName: "Complete Blood Count (CBC)",
    testDate: "2024-01-12",
    lab: "Quest Diagnostics",
    status: "Completed",
    results: {
      hemoglobin: "14.2 g/dL",
      rbc: "4.8 million/uL",
      wbc: "7,200/uL",
      platelets: "250,000/uL"
    },
    normalRange: true,
    fileUrl: "/reports/cbc_report_001.pdf"
  },
  {
    id: 2,
    patientId: 1,
    testName: "HbA1c Test",
    testDate: "2024-01-12",
    lab: "Quest Diagnostics",
    status: "Completed",
    results: {
      hba1c: "6.8%"
    },
    normalRange: false,
    notes: "Slightly elevated. Target is below 6.5%",
    fileUrl: "/reports/hba1c_report_001.pdf"
  },
  {
    id: 3,
    patientId: 1,
    testName: "Lipid Profile",
    testDate: "2024-01-10",
    lab: "LabCorp",
    status: "Completed",
    results: {
      totalCholesterol: "195 mg/dL",
      ldl: "110 mg/dL",
      hdl: "55 mg/dL",
      triglycerides: "150 mg/dL"
    },
    normalRange: true,
    fileUrl: "/reports/lipid_report_001.pdf"
  },
  {
    id: 4,
    patientId: 2,
    testName: "Spirometry Test",
    testDate: "2024-01-18",
    lab: "Pulmonary Care Center",
    status: "Completed",
    results: {
      fev1: "85% predicted",
      fvc: "90% predicted",
      fev1FvcRatio: "0.82"
    },
    normalRange: true,
    fileUrl: "/reports/spiro_report_002.pdf"
  },
  {
    id: 5,
    patientId: 3,
    testName: "ECG",
    testDate: "2024-01-15",
    lab: "Cardiac Care Institute",
    status: "Completed",
    results: {
      heartRate: "72 bpm",
      rhythm: "Normal Sinus",
      findings: "No significant abnormalities"
    },
    normalRange: true,
    fileUrl: "/reports/ecg_report_003.pdf"
  },
  {
    id: 6,
    patientId: 3,
    testName: "Echocardiogram",
    testDate: "2024-01-15",
    lab: "Cardiac Care Institute",
    status: "Completed",
    results: {
      ejectionFraction: "58%",
      wallMotion: "Normal",
      valves: "Normal function"
    },
    normalRange: true,
    fileUrl: "/reports/echo_report_003.pdf"
  }
];

export const mockDoctors = [
  {
    id: 1,
    name: "Dr. Robert Wilson",
    specialization: "Endocrinologist",
    licenseNumber: "MD123456",
    email: "r.wilson@hospital.com",
    phone: "+1 (555) 111-2222",
    hospital: "New York General Hospital",
    experience: "15 years",
    patientsCount: 245,
    avatar: "👨‍⚕️"
  },
  {
    id: 2,
    name: "Dr. Amanda Lee",
    specialization: "Cardiologist",
    licenseNumber: "MD234567",
    email: "a.lee@hospital.com",
    phone: "+1 (555) 222-3333",
    hospital: "Los Angeles Medical Center",
    experience: "12 years",
    patientsCount: 189,
    avatar: "👩‍⚕️"
  },
  {
    id: 3,
    name: "Dr. James Martinez",
    specialization: "Cardiothoracic Surgeon",
    licenseNumber: "MD345678",
    email: "j.martinez@hospital.com",
    phone: "+1 (555) 333-4444",
    hospital: "Chicago Heart Institute",
    experience: "20 years",
    patientsCount: 312,
    avatar: "👨‍⚕️"
  },
  {
    id: 4,
    name: "Dr. Sarah Thompson",
    specialization: "General Physician",
    licenseNumber: "MD456789",
    email: "s.thompson@clinic.com",
    phone: "+1 (555) 444-5555",
    hospital: "Houston Family Clinic",
    experience: "8 years",
    patientsCount: 428,
    avatar: "👩‍⚕️"
  }
];

export const mockAppointments = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    doctorId: 1,
    doctorName: "Dr. Robert Wilson",
    date: "2024-02-15",
    time: "10:00 AM",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Diabetes quarterly checkup"
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Sarah Johnson",
    doctorId: 1,
    doctorName: "Dr. Robert Wilson",
    date: "2024-02-20",
    time: "02:30 PM",
    type: "Consultation",
    status: "Scheduled",
    notes: "Asthma management review"
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Michael Chen",
    doctorId: 3,
    doctorName: "Dr. James Martinez",
    date: "2024-04-18",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Cardiac follow-up after treatment"
  },
  {
    id: 4,
    patientId: 1,
    patientName: "John Smith",
    doctorId: 2,
    doctorName: "Dr. Amanda Lee",
    date: "2024-01-10",
    time: "11:00 AM",
    type: "Consultation",
    status: "Completed",
    notes: "Hypertension management"
  }
];

export const mockMedicalHistory = [
  {
    id: 1,
    patientId: 1,
    date: "2020-05-15",
    condition: "Type 2 Diabetes Diagnosed",
    description: "Patient diagnosed with Type 2 Diabetes after routine blood work showed elevated glucose levels.",
    treatingDoctor: "Dr. Emily Brown"
  },
  {
    id: 2,
    patientId: 1,
    date: "2021-08-22",
    condition: "Hypertension Diagnosed",
    description: "Consistently high blood pressure readings led to hypertension diagnosis.",
    treatingDoctor: "Dr. Amanda Lee"
  },
  {
    id: 3,
    patientId: 2,
    date: "2019-03-10",
    condition: "Asthma Diagnosed",
    description: "Patient presented with recurring breathing difficulties and wheezing.",
    treatingDoctor: "Dr. Robert Wilson"
  },
  {
    id: 4,
    patientId: 3,
    date: "2022-06-18",
    condition: "Coronary Artery Disease",
    description: "Angiogram revealed blockages in coronary arteries.",
    treatingDoctor: "Dr. James Martinez"
  },
  {
    id: 5,
    patientId: 3,
    date: "2022-07-25",
    condition: "Angioplasty Procedure",
    description: "Successful angioplasty with stent placement in LAD artery.",
    treatingDoctor: "Dr. James Martinez"
  }
];
