export interface DutyRoster {
  id: string;
  empId: string;
  empName: string;
  department: string;
  shift: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'On Leave';
  notes?: string;
  assignedBy: string;
  assignedAt: string;
}

export interface DutyRosterTemplate {
  id: string;
  name: string;
  department: string;
  shifts: {
    shiftName: string;
    startTime: string;
    endTime: string;
    requiredStaff: number;
    location: string;
  }[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export const employees: Employee[] = [
  // Engineering Department (15 employees)
  { id: 'EMP001', name: 'Ahmed Ali', fatherName: 'Ali Khan', dob: '1990-03-15', cnic: '42101-1234567-1', gender: 'Male', department: 'Engineering', designation: 'Senior Developer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Sara Khan', dateOfJoining: '2020-01-15', contact1: '0300-1234567', contact2: '0321-7654321', emergency1: '0321-9876543', emergency2: '0312-1111111', permanentAddress: 'House 45, Street 12, Gulberg III, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AA', commissionEligible: false, salary: { basic: 150000, houseRent: 30000, medical: 10000, conveyance: 5000, commission: 0 } },
  { id: 'EMP006', name: 'Kamran Sheikh', fatherName: 'Sheikh Kamran', dob: '1987-07-22', cnic: '42102-2345678-2', gender: 'Male', department: 'Engineering', designation: 'DevOps Engineer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Ali', dateOfJoining: '2021-11-01', contact1: '0300-2345678', emergency1: '0300-3456789', permanentAddress: 'Apartment 15, DHA Phase 6, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'KS', commissionEligible: false, salary: { basic: 140000, houseRent: 28000, medical: 9500, conveyance: 5000, commission: 0 } },
  { id: 'EMP011', name: 'Zainab Ali', fatherName: 'Ali Zainab', dob: '1994-01-10', cnic: '42103-3456789-3', gender: 'Female', department: 'Engineering', designation: 'UI/UX Designer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Ali', dateOfJoining: '2023-04-01', contact1: '0300-3456789', emergency1: '0300-4567890', permanentAddress: 'House 78, Canal View, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'ZA', commissionEligible: false, salary: { basic: 95000, houseRent: 19000, medical: 6500, conveyance: 3000, commission: 0 } },
  { id: 'EMP016', name: 'Hassan Raza', fatherName: 'Raza Hassan', dob: '1989-11-05', cnic: '42104-4567890-4', gender: 'Male', department: 'Engineering', designation: 'Software Architect', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Ali', dateOfJoining: '2018-09-15', contact1: '0300-4567890', emergency1: '0300-5678901', permanentAddress: 'Villa 12, Bahria Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HR', commissionEligible: false, salary: { basic: 200000, houseRent: 40000, medical: 15000, conveyance: 8000, commission: 0 } },
  { id: 'EMP021', name: 'Ayesha Malik', fatherName: 'Malik Ayesha', dob: '1991-08-18', cnic: '42105-5678901-5', gender: 'Female', department: 'Engineering', designation: 'Frontend Developer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Kamran Sheikh', dateOfJoining: '2022-02-10', contact1: '0300-5678901', emergency1: '0300-6789012', permanentAddress: 'Flat 5C, Gulberg Greens, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AM', commissionEligible: false, salary: { basic: 120000, houseRent: 24000, medical: 8500, conveyance: 4500, commission: 0 } },
  { id: 'EMP026', name: 'Tariq Javed', fatherName: 'Javed Tariq', dob: '1986-12-03', cnic: '42106-6789012-6', gender: 'Male', department: 'Engineering', designation: 'Backend Developer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Kamran Sheikh', dateOfJoining: '2020-08-20', contact1: '0300-6789012', emergency1: '0300-7890123', permanentAddress: 'House 23, Wapda Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '6789-0123-4567', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'TJ', commissionEligible: false, salary: { basic: 130000, houseRent: 26000, medical: 9000, conveyance: 5000, commission: 0 } },
  { id: 'EMP031', name: 'Sadia Khan', fatherName: 'Khan Sadia', dob: '1993-06-25', cnic: '42107-7890123-7', gender: 'Female', department: 'Engineering', designation: 'QA Engineer', employmentType: 'Contract', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Zainab Ali', dateOfJoining: '2023-01-15', contact1: '0300-7890123', emergency1: '0300-8901234', permanentAddress: 'Apartment 9B, Askari 10, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '7890-1234-5678', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SK', commissionEligible: false, salary: { basic: 85000, houseRent: 17000, medical: 6000, conveyance: 3500, commission: 0 } },
  { id: 'EMP036', name: 'Fahad Ahmed', fatherName: 'Ahmed Fahad', dob: '1988-09-12', cnic: '42108-8901234-8', gender: 'Male', department: 'Engineering', designation: 'Mobile Developer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Hassan Raza', dateOfJoining: '2021-05-10', contact1: '0300-8901234', emergency1: '0300-9012345', permanentAddress: 'House 45, Johar Town, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '8901-2345-6789', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'FA', commissionEligible: false, salary: { basic: 135000, houseRent: 27000, medical: 9500, conveyance: 5500, commission: 0 } },
  { id: 'EMP041', name: 'Nida Shah', fatherName: 'Shah Nida', dob: '1995-04-08', cnic: '42109-9012345-9', gender: 'Female', department: 'Engineering', designation: 'Data Analyst', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ayesha Malik', dateOfJoining: '2023-07-01', contact1: '0300-9012345', emergency1: '0300-0123456', permanentAddress: 'Flat 12A, Paragon City, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '9012-3456-7890', paymentMode: 'Online Transfer', bloodGroup: 'AB-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'NS', commissionEligible: false, salary: { basic: 110000, houseRent: 22000, medical: 8000, conveyance: 4500, commission: 0 } },
  { id: 'EMP046', name: 'Rashid Khan', fatherName: 'Khan Rashid', dob: '1985-02-14', cnic: '42110-0123456-0', gender: 'Male', department: 'Engineering', designation: 'System Administrator', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Night Shift', reportingManager: 'Tariq Javed', dateOfJoining: '2019-10-05', contact1: '0300-0123456', emergency1: '0300-1234567', permanentAddress: 'House 67, Model Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '0123-4567-8901', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'RK', commissionEligible: false, salary: { basic: 125000, houseRent: 25000, medical: 9000, conveyance: 5000, commission: 0 } },
  { id: 'EMP051', name: 'Hina Butt', fatherName: 'Butt Hina', dob: '1992-11-20', cnic: '42111-1234567-1', gender: 'Female', department: 'Engineering', designation: 'Technical Writer', employmentType: 'Part Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Sadia Khan', dateOfJoining: '2022-09-15', contact1: '0300-1234567', emergency1: '0300-2345678', permanentAddress: 'Apartment 3D, DHA Phase 8, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HB', commissionEligible: false, salary: { basic: 75000, houseRent: 15000, medical: 5500, conveyance: 3000, commission: 0 } },
  { id: 'EMP056', name: 'Imran Qureshi', fatherName: 'Qureshi Imran', dob: '1987-05-30', cnic: '42112-2345678-2', gender: 'Male', department: 'Engineering', designation: 'Security Engineer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Fahad Ahmed', dateOfJoining: '2020-12-01', contact1: '0300-2345678', emergency1: '0300-3456789', permanentAddress: 'House 89, Valencia Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'IQ', commissionEligible: false, salary: { basic: 145000, houseRent: 29000, medical: 10500, conveyance: 6000, commission: 0 } },
  { id: 'EMP061', name: 'Kiran Bibi', fatherName: 'Bibi Kiran', dob: '1994-03-12', cnic: '42113-3456789-3', gender: 'Female', department: 'Engineering', designation: 'Product Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Nida Shah', dateOfJoining: '2023-03-20', contact1: '0300-3456789', emergency1: '0300-4567890', permanentAddress: 'Villa 25, Lake City, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'KB', commissionEligible: false, salary: { basic: 180000, houseRent: 36000, medical: 13000, conveyance: 7000, commission: 0 } },
  { id: 'EMP066', name: 'Saad Malik', fatherName: 'Malik Saad', dob: '1989-07-07', cnic: '42114-4567890-4', gender: 'Male', department: 'Engineering', designation: 'Database Administrator', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Rashid Khan', dateOfJoining: '2021-08-15', contact1: '0300-4567890', emergency1: '0300-5678901', permanentAddress: 'Apartment 7F, Gulberg 5, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SM', commissionEligible: false, salary: { basic: 140000, houseRent: 28000, medical: 10000, conveyance: 5500, commission: 0 } },
  { id: 'EMP071', name: 'Amina Saeed', fatherName: 'Saeed Amina', dob: '1996-01-28', cnic: '42115-5678901-5', gender: 'Female', department: 'Engineering', designation: 'Junior Developer', employmentType: 'Intern', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Hina Butt', dateOfJoining: '2024-01-10', contact1: '0300-5678901', emergency1: '0300-6789012', permanentAddress: 'House 34, Township, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '5678-9012-3456', paymentMode: 'Cash', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AS', commissionEligible: false, salary: { basic: 45000, houseRent: 9000, medical: 3500, conveyance: 2000, commission: 0 } },

  // Marketing Department (12 employees)
  { id: 'EMP002', name: 'Sara Khan', fatherName: 'Khan Ahmed', dob: '1992-03-28', cnic: '42201-7654321-2', gender: 'Female', department: 'Marketing', designation: 'Marketing Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2019-06-01', contact1: '0302-2345678', emergency1: '0300-8765432', permanentAddress: 'Apartment 8, Block C, DHA Phase 5, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'Peanuts', chronicConditions: 'None', medications: 'None', avatar: 'SK', commissionEligible: true, salary: { basic: 130000, houseRent: 25000, medical: 8000, conveyance: 5000, commission: 5000 } },
  { id: 'EMP007', name: 'Mariam Yousuf', fatherName: 'Yousuf Mariam', dob: '1990-12-15', cnic: '42202-8765432-1', gender: 'Female', department: 'Marketing', designation: 'Content Writer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Sara Khan', dateOfJoining: '2021-06-01', contact1: '0302-3456789', emergency1: '0300-9876543', permanentAddress: 'House 23, Gulberg II, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'MY', commissionEligible: false, salary: { basic: 85000, houseRent: 17000, medical: 6000, conveyance: 3500, commission: 0 } },
  { id: 'EMP012', name: 'Omar Farooq', fatherName: 'Farooq Omar', dob: '1988-05-20', cnic: '42203-9876543-2', gender: 'Male', department: 'Marketing', designation: 'Digital Marketing Specialist', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Sara Khan', dateOfJoining: '2020-11-15', contact1: '0302-4567890', emergency1: '0300-0987654', permanentAddress: 'Apartment 12C, DHA Phase 4, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'OF', commissionEligible: true, salary: { basic: 95000, houseRent: 19000, medical: 7000, conveyance: 4000, commission: 3000 } },
  { id: 'EMP017', name: 'Zara Ahmed', fatherName: 'Ahmed Zara', dob: '1993-09-08', cnic: '42204-0987654-3', gender: 'Female', department: 'Marketing', designation: 'Social Media Manager', employmentType: 'Contract', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Mariam Yousuf', dateOfJoining: '2022-03-01', contact1: '0302-5678901', emergency1: '0300-1098765', permanentAddress: 'Flat 8B, Clifton Block 7, Karachi', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'ZA', commissionEligible: false, salary: { basic: 78000, houseRent: 15600, medical: 5500, conveyance: 3200, commission: 0 } },
  { id: 'EMP022', name: 'Bilal Hassan', fatherName: 'Hassan Bilal', dob: '1986-11-12', cnic: '42205-1098765-4', gender: 'Male', department: 'Marketing', designation: 'Brand Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Omar Farooq', dateOfJoining: '2019-08-20', contact1: '0302-6789012', emergency1: '0300-2109876', permanentAddress: 'House 45, Canal Bank Road, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '6789-0123-4567', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'BH', commissionEligible: true, salary: { basic: 140000, houseRent: 28000, medical: 10000, conveyance: 6000, commission: 8000 } },
  { id: 'EMP027', name: 'Aisha Noor', fatherName: 'Noor Aisha', dob: '1995-02-25', cnic: '42206-2109876-5', gender: 'Female', department: 'Marketing', designation: 'Graphic Designer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Zara Ahmed', dateOfJoining: '2023-05-10', contact1: '0302-7890123', emergency1: '0300-3210987', permanentAddress: 'Apartment 5E, Gulberg Greens, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '7890-1234-5678', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AN', commissionEligible: false, salary: { basic: 90000, houseRent: 18000, medical: 6500, conveyance: 3800, commission: 0 } },
  { id: 'EMP032', name: 'Ahmed Khan', fatherName: 'Khan Ahmed', dob: '1989-04-17', cnic: '42207-3210987-6', gender: 'Male', department: 'Marketing', designation: 'SEO Specialist', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Bilal Hassan', dateOfJoining: '2021-09-05', contact1: '0302-8901234', emergency1: '0300-4321098', permanentAddress: 'House 67, DHA Phase 6, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '8901-2345-6789', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AK', commissionEligible: false, salary: { basic: 105000, houseRent: 21000, medical: 7500, conveyance: 4500, commission: 0 } },
  { id: 'EMP037', name: 'Fatima Ali', fatherName: 'Ali Fatima', dob: '1992-07-03', cnic: '42208-4321098-7', gender: 'Female', department: 'Marketing', designation: 'Event Coordinator', employmentType: 'Part Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Aisha Noor', dateOfJoining: '2022-11-20', contact1: '0302-9012345', emergency1: '0300-5432109', permanentAddress: 'Flat 9D, Bahria Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '9012-3456-7890', paymentMode: 'Online Transfer', bloodGroup: 'AB-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'FA', commissionEligible: false, salary: { basic: 65000, houseRent: 13000, medical: 4500, conveyance: 2500, commission: 0 } },
  { id: 'EMP042', name: 'Saad Ahmed', fatherName: 'Ahmed Saad', dob: '1987-10-29', cnic: '42209-5432109-8', gender: 'Male', department: 'Marketing', designation: 'Market Research Analyst', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Khan', dateOfJoining: '2020-04-15', contact1: '0302-0123456', emergency1: '0300-6543210', permanentAddress: 'Apartment 11G, DHA Phase 5, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '0123-4567-8901', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SA', commissionEligible: false, salary: { basic: 115000, houseRent: 23000, medical: 8500, conveyance: 5000, commission: 0 } },
  { id: 'EMP047', name: 'Hira Malik', fatherName: 'Malik Hira', dob: '1994-12-06', cnic: '42210-6543210-9', gender: 'Female', department: 'Marketing', designation: 'Public Relations Officer', employmentType: 'Contract', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Fatima Ali', dateOfJoining: '2023-08-01', contact1: '0302-1234567', emergency1: '0300-7654321', permanentAddress: 'House 78, Model Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HM', commissionEligible: false, salary: { basic: 82000, houseRent: 16400, medical: 5800, conveyance: 3400, commission: 0 } },
  { id: 'EMP052', name: 'Raza Khan', fatherName: 'Khan Raza', dob: '1985-03-14', cnic: '42211-7654321-0', gender: 'Male', department: 'Marketing', designation: 'Advertising Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Saad Ahmed', dateOfJoining: '2018-12-10', contact1: '0302-2345678', emergency1: '0300-8765432', permanentAddress: 'Villa 34, Lake City, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'RK', commissionEligible: true, salary: { basic: 155000, houseRent: 31000, medical: 11500, conveyance: 7000, commission: 10000 } },
  { id: 'EMP057', name: 'Sana Butt', fatherName: 'Butt Sana', dob: '1996-08-22', cnic: '42212-8765432-1', gender: 'Female', department: 'Marketing', designation: 'Copywriter', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Hira Malik', dateOfJoining: '2023-10-15', contact1: '0302-3456789', emergency1: '0300-9876543', permanentAddress: 'Apartment 4F, Gulberg 5, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SB', commissionEligible: false, salary: { basic: 88000, houseRent: 17600, medical: 6200, conveyance: 3600, commission: 0 } },

  // HR Department (10 employees)
  { id: 'EMP003', name: 'Usman Malik', fatherName: 'Malik Usman', dob: '1988-04-03', cnic: '42301-1122334-3', gender: 'Male', department: 'HR', designation: 'HR Executive', employmentType: 'Contract', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2021-03-10', contact1: '0303-3456789', emergency1: '0300-7654321', permanentAddress: 'House 12, Johar Town, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'Asthma', medications: 'Inhaler', avatar: 'UM', commissionEligible: false, salary: { basic: 80000, houseRent: 15000, medical: 5000, conveyance: 3000, commission: 0 } },
  { id: 'EMP008', name: 'Rabia Noor', fatherName: 'Noor Rabia', dob: '1991-06-18', cnic: '42302-2233445-5', gender: 'Female', department: 'HR', designation: 'HR Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2019-02-14', contact1: '0303-4567890', emergency1: '0300-8765432', permanentAddress: 'Apartment 7A, DHA Phase 6, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'RN', commissionEligible: false, salary: { basic: 120000, houseRent: 24000, medical: 8500, conveyance: 5000, commission: 0 } },
  { id: 'EMP013', name: 'Faisal Ahmed', fatherName: 'Ahmed Faisal', dob: '1987-08-25', cnic: '42303-3344556-6', gender: 'Male', department: 'HR', designation: 'Recruitment Specialist', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Usman Malik', dateOfJoining: '2020-05-20', contact1: '0303-5678901', emergency1: '0300-9876543', permanentAddress: 'House 89, Gulberg III, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'FA', commissionEligible: false, salary: { basic: 95000, houseRent: 19000, medical: 7000, conveyance: 4000, commission: 0 } },
  { id: 'EMP018', name: 'Nadia Khan', fatherName: 'Khan Nadia', dob: '1994-01-30', cnic: '42304-4455667-7', gender: 'Female', department: 'HR', designation: 'Training Coordinator', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Rabia Noor', dateOfJoining: '2022-07-10', contact1: '0303-6789012', emergency1: '0300-0987654', permanentAddress: 'Flat 12B, Clifton, Karachi', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '6789-0123-4567', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'NK', commissionEligible: false, salary: { basic: 85000, houseRent: 17000, medical: 6000, conveyance: 3500, commission: 0 } },
  { id: 'EMP023', name: 'Ahmed Saeed', fatherName: 'Saeed Ahmed', dob: '1989-11-07', cnic: '42305-5566778-8', gender: 'Male', department: 'HR', designation: 'Employee Relations Officer', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Faisal Ahmed', dateOfJoining: '2021-01-25', contact1: '0303-7890123', emergency1: '0300-1098765', permanentAddress: 'Apartment 3C, Bahria Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '7890-1234-5678', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AS', commissionEligible: false, salary: { basic: 105000, houseRent: 21000, medical: 7500, conveyance: 4500, commission: 0 } },
  { id: 'EMP028', name: 'Saima Ali', fatherName: 'Ali Saima', dob: '1992-03-22', cnic: '42306-6677889-9', gender: 'Female', department: 'HR', designation: 'Payroll Administrator', employmentType: 'Contract', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Nadia Khan', dateOfJoining: '2022-09-05', contact1: '0303-8901234', emergency1: '0300-2109876', permanentAddress: 'House 45, Model Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '8901-2345-6789', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SA', commissionEligible: false, salary: { basic: 78000, houseRent: 15600, medical: 5500, conveyance: 3200, commission: 0 } },
  { id: 'EMP033', name: 'Tariq Malik', fatherName: 'Malik Tariq', dob: '1986-05-14', cnic: '42307-7788990-0', gender: 'Male', department: 'HR', designation: 'HR Business Partner', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Saeed', dateOfJoining: '2019-11-20', contact1: '0303-9012345', emergency1: '0300-3210987', permanentAddress: 'Villa 67, Lake City, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '9012-3456-7890', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'TM', commissionEligible: false, salary: { basic: 135000, houseRent: 27000, medical: 9500, conveyance: 6000, commission: 0 } },
  { id: 'EMP038', name: 'Ayesha Khan', fatherName: 'Khan Ayesha', dob: '1995-09-09', cnic: '42308-8899001-1', gender: 'Female', department: 'HR', designation: 'Talent Acquisition Lead', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Saima Ali', dateOfJoining: '2023-02-15', contact1: '0303-0123456', emergency1: '0300-4321098', permanentAddress: 'Apartment 8H, DHA Phase 5, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '0123-4567-8901', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AK', commissionEligible: false, salary: { basic: 115000, houseRent: 23000, medical: 8500, conveyance: 5000, commission: 0 } },
  { id: 'EMP043', name: 'Hassan Butt', fatherName: 'Butt Hassan', dob: '1988-12-01', cnic: '42309-9900112-2', gender: 'Male', department: 'HR', designation: 'Organizational Development Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Tariq Malik', dateOfJoining: '2020-08-30', contact1: '0303-1234567', emergency1: '0300-5432109', permanentAddress: 'House 23, Gulberg Greens, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'AB-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HB', commissionEligible: false, salary: { basic: 145000, houseRent: 29000, medical: 10500, conveyance: 6500, commission: 0 } },
  { id: 'EMP048', name: 'Zainab Saeed', fatherName: 'Saeed Zainab', dob: '1993-04-16', cnic: '42310-0011223-3', gender: 'Female', department: 'HR', designation: 'HR Analyst', employmentType: 'Part Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ayesha Khan', dateOfJoining: '2023-06-01', contact1: '0303-2345678', emergency1: '0300-6543210', permanentAddress: 'Flat 6E, Paragon City, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'ZS', commissionEligible: false, salary: { basic: 70000, houseRent: 14000, medical: 5000, conveyance: 2800, commission: 0 } },

  // Sales Department (12 employees)
  { id: 'EMP004', name: 'Fatima Raza', fatherName: 'Raza Ali', dob: '1995-04-19', cnic: '42401-9988776-4', gender: 'Female', department: 'Sales', designation: 'Sales Officer', employmentType: 'Full Time', jobStatus: 'Probation', workMode: 'On-Site', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Sara Khan', dateOfJoining: '2023-09-01', contact1: '0304-4567890', emergency1: '0300-6543210', permanentAddress: 'Flat 3B, Clifton, Karachi', postalAddress: 'Same as permanent', bankName: '', bankAccount: '', paymentMode: 'Cash', bloodGroup: 'AB-', allergies: 'Dust', chronicConditions: 'None', medications: 'None', avatar: 'FR', commissionEligible: true, salary: { basic: 70000, houseRent: 12000, medical: 5000, conveyance: 3000, commission: 2000 } },
  { id: 'EMP009', name: 'Hassan Malik', fatherName: 'Malik Hassan', dob: '1986-07-12', cnic: '42402-8877665-5', gender: 'Male', department: 'Sales', designation: 'Sales Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2018-08-12', contact1: '0304-5678901', emergency1: '0300-7654321', permanentAddress: 'House 78, Canal View, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HM', commissionEligible: true, salary: { basic: 150000, houseRent: 30000, medical: 11000, conveyance: 7000, commission: 15000 } },
  { id: 'EMP014', name: 'Amina Shah', fatherName: 'Shah Amina', dob: '1993-10-28', cnic: '42403-7766554-6', gender: 'Female', department: 'Sales', designation: 'Business Development Executive', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Fatima Raza', dateOfJoining: '2022-01-15', contact1: '0304-6789012', emergency1: '0300-8765432', permanentAddress: 'Apartment 9F, DHA Phase 4, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '6789-0123-4567', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AS', commissionEligible: true, salary: { basic: 95000, houseRent: 19000, medical: 7000, conveyance: 4000, commission: 5000 } },
  { id: 'EMP019', name: 'Kashif Ahmed', fatherName: 'Ahmed Kashif', dob: '1989-02-05', cnic: '42404-6655443-7', gender: 'Male', department: 'Sales', designation: 'Account Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Hassan Malik', dateOfJoining: '2020-06-20', contact1: '0304-7890123', emergency1: '0300-9876543', permanentAddress: 'Villa 45, Bahria Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '7890-1234-5678', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'KA', commissionEligible: true, salary: { basic: 125000, houseRent: 25000, medical: 9000, conveyance: 5500, commission: 8000 } },
  { id: 'EMP024', name: 'Sadia Khan', fatherName: 'Khan Sadia', dob: '1991-05-17', cnic: '42405-5544332-8', gender: 'Female', department: 'Sales', designation: 'Sales Representative', employmentType: 'Contract', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Amina Shah', dateOfJoining: '2022-08-10', contact1: '0304-8901234', emergency1: '0300-0987654', permanentAddress: 'Flat 7G, Gulberg 5, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '8901-2345-6789', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SK', commissionEligible: true, salary: { basic: 65000, houseRent: 13000, medical: 4500, conveyance: 2500, commission: 3000 } },
  { id: 'EMP029', name: 'Imran Qureshi', fatherName: 'Qureshi Imran', dob: '1987-12-09', cnic: '42406-4433221-9', gender: 'Male', department: 'Sales', designation: 'Regional Sales Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Kashif Ahmed', dateOfJoining: '2019-04-25', contact1: '0304-9012345', emergency1: '0300-1098765', permanentAddress: 'House 56, Johar Town, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '9012-3456-7890', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'IQ', commissionEligible: true, salary: { basic: 175000, houseRent: 35000, medical: 13000, conveyance: 8500, commission: 20000 } },
  { id: 'EMP034', name: 'Nida Butt', fatherName: 'Butt Nida', dob: '1994-08-31', cnic: '42407-3322110-0', gender: 'Female', department: 'Sales', designation: 'Customer Success Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Sadia Khan', dateOfJoining: '2023-01-20', contact1: '0304-0123456', emergency1: '0300-2109876', permanentAddress: 'Apartment 11J, DHA Phase 5, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '0123-4567-8901', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'NB', commissionEligible: true, salary: { basic: 115000, houseRent: 23000, medical: 8500, conveyance: 5000, commission: 7000 } },
  { id: 'EMP039', name: 'Ahmed Khan', fatherName: 'Khan Ahmed', dob: '1985-01-23', cnic: '42408-2211009-1', gender: 'Male', department: 'Sales', designation: 'Key Account Executive', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Imran Qureshi', dateOfJoining: '2018-11-05', contact1: '0304-1234567', emergency1: '0300-3210987', permanentAddress: 'Villa 78, Lake City, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AK', commissionEligible: true, salary: { basic: 140000, houseRent: 28000, medical: 10000, conveyance: 6500, commission: 12000 } },
  { id: 'EMP044', name: 'Hira Saeed', fatherName: 'Saeed Hira', dob: '1996-06-14', cnic: '42409-1100998-2', gender: 'Female', department: 'Sales', designation: 'Inside Sales Representative', employmentType: 'Part Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Branch B', shift: 'Evening Shift', reportingManager: 'Nida Butt', dateOfJoining: '2023-09-01', contact1: '0304-2345678', emergency1: '0300-4321098', permanentAddress: 'Flat 4K, Clifton Block 8, Karachi', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'AB-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HS', commissionEligible: true, salary: { basic: 55000, houseRent: 11000, medical: 4000, conveyance: 2200, commission: 2500 } },
  { id: 'EMP049', name: 'Saad Malik', fatherName: 'Malik Saad', dob: '1988-09-27', cnic: '42410-0099887-3', gender: 'Male', department: 'Sales', designation: 'Channel Sales Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ahmed Khan', dateOfJoining: '2020-03-15', contact1: '0304-3456789', emergency1: '0300-5432109', permanentAddress: 'House 89, Model Town, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SM', commissionEligible: true, salary: { basic: 135000, houseRent: 27000, medical: 9500, conveyance: 6000, commission: 10000 } },
  { id: 'EMP054', name: 'Aisha Noor', fatherName: 'Noor Aisha', dob: '1992-11-08', cnic: '42411-9988776-4', gender: 'Female', department: 'Sales', designation: 'Sales Coordinator', employmentType: 'Contract', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Hira Saeed', dateOfJoining: '2022-12-05', contact1: '0304-4567890', emergency1: '0300-6543210', permanentAddress: 'Apartment 6L, Gulberg Greens, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AN', commissionEligible: true, salary: { basic: 72000, houseRent: 14400, medical: 5200, conveyance: 3000, commission: 3500 } },
  { id: 'EMP059', name: 'Raza Khan', fatherName: 'Khan Raza', dob: '1986-03-19', cnic: '42412-8877665-5', gender: 'Male', department: 'Sales', designation: 'Territory Sales Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Saad Malik', dateOfJoining: '2019-07-30', contact1: '0304-5678901', emergency1: '0300-7654321', permanentAddress: 'Villa 23, Valencia Town, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'RK', commissionEligible: true, salary: { basic: 160000, houseRent: 32000, medical: 12000, conveyance: 8000, commission: 18000 } },

  // Finance Department (11 employees)
  { id: 'EMP005', name: 'Bilal Ahmed', fatherName: 'Ahmed Bilal', dob: '1993-05-07', cnic: '42501-5544332-5', gender: 'Male', department: 'Finance', designation: 'Accountant', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Branch B', shift: 'Night Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2022-01-20', contact1: '0305-5678901', emergency1: '0300-5432109', permanentAddress: 'House 67, Model Town, Lahore', postalAddress: 'Same as permanent', bankName: '', bankAccount: '', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'BA', commissionEligible: false, salary: { basic: 100000, houseRent: 18000, medical: 8000, conveyance: 5000, commission: 0 } },
  { id: 'EMP010', name: 'Ayesha Siddiq', fatherName: 'Siddiq Ayesha', dob: '1989-09-14', cnic: '42502-4433221-6', gender: 'Female', department: 'Finance', designation: 'Finance Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Ali Hassan', dateOfJoining: '2017-05-03', contact1: '0305-6789012', emergency1: '0300-6543210', permanentAddress: 'Villa 12, DHA Phase 5, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '6789-0123-4567', paymentMode: 'Online Transfer', bloodGroup: 'AB+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AS', commissionEligible: false, salary: { basic: 180000, houseRent: 36000, medical: 13000, conveyance: 9000, commission: 0 } },
  { id: 'EMP015', name: 'Faisal Khan', fatherName: 'Khan Faisal', dob: '1987-12-21', cnic: '42503-3322110-7', gender: 'Male', department: 'Finance', designation: 'Financial Analyst', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Bilal Ahmed', dateOfJoining: '2020-09-05', contact1: '0305-7890123', emergency1: '0300-7654321', permanentAddress: 'Apartment 8G, Gulberg III, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '7890-1234-5678', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'FK', commissionEligible: false, salary: { basic: 135000, houseRent: 27000, medical: 9500, conveyance: 6500, commission: 0 } },
  { id: 'EMP020', name: 'Sana Malik', fatherName: 'Malik Sana', dob: '1994-03-06', cnic: '42504-2211009-8', gender: 'Female', department: 'Finance', designation: 'Budget Analyst', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Branch B', shift: 'Evening Shift', reportingManager: 'Ayesha Siddiq', dateOfJoining: '2022-04-15', contact1: '0305-8901234', emergency1: '0300-8765432', permanentAddress: 'Flat 5H, Clifton, Karachi', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '8901-2345-6789', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SM', commissionEligible: false, salary: { basic: 110000, houseRent: 22000, medical: 8000, conveyance: 4800, commission: 0 } },
  { id: 'EMP025', name: 'Tariq Saeed', fatherName: 'Saeed Tariq', dob: '1985-06-29', cnic: '42505-1100998-9', gender: 'Male', department: 'Finance', designation: 'Tax Consultant', employmentType: 'Contract', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Faisal Khan', dateOfJoining: '2019-12-01', contact1: '0305-9012345', emergency1: '0300-9876543', permanentAddress: 'House 34, Bahria Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '9012-3456-7890', paymentMode: 'Online Transfer', bloodGroup: 'A+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'TS', commissionEligible: false, salary: { basic: 155000, houseRent: 31000, medical: 11500, conveyance: 7500, commission: 0 } },
  { id: 'EMP030', name: 'Nadia Butt', fatherName: 'Butt Nadia', dob: '1991-08-11', cnic: '42506-0099887-0', gender: 'Female', department: 'Finance', designation: 'Accounts Payable Clerk', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Sana Malik', dateOfJoining: '2021-11-10', contact1: '0305-0123456', emergency1: '0300-0987654', permanentAddress: 'Apartment 7I, DHA Phase 6, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '0123-4567-8901', paymentMode: 'Online Transfer', bloodGroup: 'B-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'NB', commissionEligible: false, salary: { basic: 75000, houseRent: 15000, medical: 5500, conveyance: 3200, commission: 0 } },
  { id: 'EMP035', name: 'Ahmed Qureshi', fatherName: 'Qureshi Ahmed', dob: '1988-01-17', cnic: '42507-9988776-1', gender: 'Male', department: 'Finance', designation: 'Internal Auditor', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Tariq Saeed', dateOfJoining: '2020-07-25', contact1: '0305-1234567', emergency1: '0300-1098765', permanentAddress: 'Villa 56, Lake City, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '1234-5678-9012', paymentMode: 'Online Transfer', bloodGroup: 'O+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AQ', commissionEligible: false, salary: { basic: 125000, houseRent: 25000, medical: 9000, conveyance: 5500, commission: 0 } },
  { id: 'EMP040', name: 'Hira Khan', fatherName: 'Khan Hira', dob: '1995-11-23', cnic: '42508-8877665-2', gender: 'Female', department: 'Finance', designation: 'Financial Planning Analyst', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Nadia Butt', dateOfJoining: '2023-03-01', contact1: '0305-2345678', emergency1: '0300-2109876', permanentAddress: 'Flat 9J, Gulberg Greens, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '2345-6789-0123', paymentMode: 'Online Transfer', bloodGroup: 'AB-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'HK', commissionEligible: false, salary: { basic: 120000, houseRent: 24000, medical: 8500, conveyance: 5200, commission: 0 } },
  { id: 'EMP045', name: 'Saad Ahmed', fatherName: 'Ahmed Saad', dob: '1986-04-05', cnic: '42509-7766554-3', gender: 'Male', department: 'Finance', designation: 'Treasury Manager', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Hybrid', workLocation: 'Head Office', shift: 'Evening Shift', reportingManager: 'Ahmed Qureshi', dateOfJoining: '2018-10-20', contact1: '0305-3456789', emergency1: '0300-3210987', permanentAddress: 'House 78, Canal Bank Road, Lahore', postalAddress: 'Same as permanent', bankName: 'MCB', bankAccount: '3456-7890-1234', paymentMode: 'Online Transfer', bloodGroup: 'A-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'SA', commissionEligible: false, salary: { basic: 195000, houseRent: 39000, medical: 14500, conveyance: 9500, commission: 0 } },
  { id: 'EMP050', name: 'Amina Saeed', fatherName: 'Saeed Amina', dob: '1993-07-18', cnic: '42510-6655443-4', gender: 'Female', department: 'Finance', designation: 'Cost Accountant', employmentType: 'Part Time', jobStatus: 'Active', workMode: 'On-Site', workLocation: 'Branch B', shift: 'Morning Shift', reportingManager: 'Hira Khan', dateOfJoining: '2022-06-15', contact1: '0305-4567890', emergency1: '0300-4321098', permanentAddress: 'Apartment 3K, Paragon City, Lahore', postalAddress: 'Same as permanent', bankName: 'UBL', bankAccount: '4567-8901-2345', paymentMode: 'Online Transfer', bloodGroup: 'B+', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'AS', commissionEligible: false, salary: { basic: 85000, houseRent: 17000, medical: 6000, conveyance: 3800, commission: 0 } },
  { id: 'EMP055', name: 'Imran Malik', fatherName: 'Malik Imran', dob: '1989-10-30', cnic: '42511-5544332-5', gender: 'Male', department: 'Finance', designation: 'Financial Controller', employmentType: 'Full Time', jobStatus: 'Active', workMode: 'Remote', workLocation: 'Head Office', shift: 'Morning Shift', reportingManager: 'Saad Ahmed', dateOfJoining: '2019-03-10', contact1: '0305-5678901', emergency1: '0300-5432109', permanentAddress: 'Villa 89, Valencia Town, Lahore', postalAddress: 'Same as permanent', bankName: 'HBL', bankAccount: '5678-9012-3456', paymentMode: 'Online Transfer', bloodGroup: 'O-', allergies: 'None', chronicConditions: 'None', medications: 'None', avatar: 'IM', commissionEligible: false, salary: { basic: 220000, houseRent: 44000, medical: 16500, conveyance: 11000, commission: 0 } },
];

export const reportingManagers = ['Ali Hassan', 'Sara Khan', 'Ahmed Ali'];
export const departments = ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance'];
export const designations = ['Senior Developer', 'Marketing Manager', 'HR Executive', 'Sales Officer', 'Accountant', 'Junior Developer', 'Lead Developer', 'Manager'];
export const workModes = ['On-Site', 'Remote', 'Hybrid', 'Office'];
export const workLocations = ['Head Office', 'Branch B', 'Remote'];
export const employmentTypes = ['Permanent', 'Contract', 'Probation', 'Intern'];
export const jobStatuses = ['Active', 'Probation', 'Notice Period', 'Terminated'];
export const shifts = [
  { name: 'Morning Shift', start: '09:00', end: '18:00', lateAfter: 15 },
  { name: 'Evening Shift', start: '14:00', end: '23:00', lateAfter: 15 },
  { name: 'Night Shift', start: '22:00', end: '06:00', lateAfter: 15 },
];

export const attendanceData = [
  { date: '2026-03-19', day: 'Wed', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:02', checkOut: '18:05', status: 'Present', lateBy: '', notes: '' },
  { date: '2026-03-18', day: 'Tue', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:18', checkOut: '18:10', status: 'Late', lateBy: '18 min', notes: 'Traffic' },
  { date: '2026-03-17', day: 'Mon', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '08:58', checkOut: '18:00', status: 'Present', lateBy: '', notes: '' },
  { date: '2026-03-14', day: 'Fri', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:05', checkOut: '17:58', status: 'Present', lateBy: '', notes: '' },
  { date: '2026-03-13', day: 'Thu', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '-', checkOut: '-', status: 'Absent', lateBy: '', notes: '' },
  { date: '2026-03-12', day: 'Wed', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:00', checkOut: '18:02', status: 'Present', lateBy: '', notes: '' },
  { date: '2026-03-11', day: 'Tue', empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:03', checkOut: '18:00', status: 'Present', lateBy: '', notes: '' },
];

export const allAttendanceToday = [
  { empId: 'EMP001', name: 'Ahmed Ali', dept: 'Engineering', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:02', checkOut: '18:05', status: 'Present', lateBy: '', notes: '' },
  { empId: 'EMP002', name: 'Sara Khan', dept: 'Marketing', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '08:55', checkOut: '18:00', status: 'Present', lateBy: '', notes: '' },
  { empId: 'EMP003', name: 'Usman Malik', dept: 'HR', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '09:22', checkOut: '18:10', status: 'Late', lateBy: '22 min', notes: '' },
  { empId: 'EMP004', name: 'Fatima Raza', dept: 'Sales', shift: 'Morning Shift', expectedIn: '09:00', checkIn: '-', checkOut: '-', status: 'On Leave', lateBy: '', notes: 'Annual Leave' },
  { empId: 'EMP005', name: 'Bilal Ahmed', dept: 'Finance', shift: 'Night Shift', expectedIn: '22:00', checkIn: '-', checkOut: '-', status: 'Absent', lateBy: '', notes: '' },
];

export const leaveRequests = [
  { id: 'LR001', empId: 'EMP001', empName: 'Ahmed Ali', leaveType: 'Annual', from: '2026-03-01', to: '2026-03-05', days: 5, reason: 'Family vacation', appliedOn: '2026-02-25', status: 'Approved' },
  { id: 'LR002', empId: 'EMP002', empName: 'Sara Khan', leaveType: 'Casual', from: '2026-03-10', to: '2026-03-11', days: 2, reason: 'Personal work', appliedOn: '2026-03-08', status: 'Approved' },
  { id: 'LR003', empId: 'EMP003', empName: 'Usman Malik', leaveType: 'Sick', from: '2026-03-17', to: '2026-03-17', days: 1, reason: 'Fever and cold', appliedOn: '2026-03-17', status: 'Pending' },
  { id: 'LR004', empId: 'EMP004', empName: 'Fatima Raza', leaveType: 'Casual', from: '2026-03-20', to: '2026-03-21', days: 2, reason: 'Family event', appliedOn: '2026-03-18', status: 'Pending' },
  { id: 'LR005', empId: 'EMP005', empName: 'Bilal Ahmed', leaveType: 'Annual', from: '2026-03-25', to: '2026-03-29', days: 5, reason: 'Travel plans', appliedOn: '2026-03-15', status: 'Pending' },
  { id: 'LR006', empId: 'EMP001', empName: 'Ahmed Ali', leaveType: 'Casual', from: '2026-02-15', to: '2026-02-15', days: 1, reason: 'Bank work', appliedOn: '2026-02-14', status: 'Approved' },
  { id: 'LR007', empId: 'EMP002', empName: 'Sara Khan', leaveType: 'Annual', from: '2026-02-01', to: '2026-02-03', days: 3, reason: 'Trip', appliedOn: '2026-01-28', status: 'Approved' },
  { id: 'LR008', empId: 'EMP003', empName: 'Usman Malik', leaveType: 'Annual', from: '2026-01-20', to: '2026-01-22', days: 3, reason: 'Wedding', appliedOn: '2026-01-15', status: 'Rejected' },
];

export const payrollData = [
  { empId: 'EMP001', name: 'Ahmed Ali', workingDays: 31, paidDays: 28, absents: 3, clUsed: 0, mlUsed: 0, alUsed: 0, basic: 150000, houseRent: 30000, medical: 10000, conveyance: 5000, commission: 0, absentDeduction: 14516.13, tax: 12000, loan: 0, advance: 0, latePenalty: 0, otherDeduction: 0, status: 'Draft', paymentMode: 'Online Transfer' },
  { empId: 'EMP002', name: 'Sara Khan', workingDays: 31, paidDays: 31, absents: 0, clUsed: 0, mlUsed: 0, alUsed: 0, basic: 130000, houseRent: 25000, medical: 8000, conveyance: 5000, commission: 5000, absentDeduction: 0, tax: 9000, loan: 5000, advance: 0, latePenalty: 0, otherDeduction: 2000, status: 'Draft', paymentMode: 'Online Transfer' },
  { empId: 'EMP003', name: 'Usman Malik', workingDays: 31, paidDays: 30, absents: 1, clUsed: 0, mlUsed: 0, alUsed: 0, basic: 80000, houseRent: 15000, medical: 5000, conveyance: 3000, commission: 0, absentDeduction: 2580.65, tax: 5000, loan: 0, advance: 0, latePenalty: 2000, otherDeduction: 1000, status: 'Finalized', paymentMode: 'Online Transfer' },
  { empId: 'EMP004', name: 'Fatima Raza', workingDays: 31, paidDays: 31, absents: 0, clUsed: 0, mlUsed: 0, alUsed: 0, basic: 70000, houseRent: 12000, medical: 5000, conveyance: 3000, commission: 2000, absentDeduction: 0, tax: 3000, loan: 0, advance: 0, latePenalty: 0, otherDeduction: 0, status: 'Draft', paymentMode: 'Cash' },
  { empId: 'EMP005', name: 'Bilal Ahmed', workingDays: 31, paidDays: 29, absents: 2, clUsed: 0, mlUsed: 0, alUsed: 0, basic: 100000, houseRent: 18000, medical: 8000, conveyance: 5000, commission: 0, absentDeduction: 6451.61, tax: 6000, loan: 10000, advance: 0, latePenalty: 0, otherDeduction: 2000, status: 'Draft', paymentMode: 'Online Transfer' },
];

export const dutyRosterData: DutyRoster[] = [
  // Engineering Department - Morning Shift
  { id: 'DR001', empId: 'EMP001', empName: 'Ahmed Ali', department: 'Engineering', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Regular shift', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR002', empId: 'EMP006', empName: 'Kamran Sheikh', department: 'Engineering', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'DevOps support', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR003', empId: 'EMP011', empName: 'Zainab Ali', department: 'Engineering', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'UI/UX tasks', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },

  // Marketing Department - Morning Shift
  { id: 'DR004', empId: 'EMP002', empName: 'Sara Khan', department: 'Marketing', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Team lead', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR005', empId: 'EMP007', empName: 'Mariam Yousuf', department: 'Marketing', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Content creation', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },

  // HR Department - Morning Shift
  { id: 'DR006', empId: 'EMP003', empName: 'Usman Malik', department: 'HR', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Recruitment activities', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR007', empId: 'EMP008', empName: 'Rabia Noor', department: 'HR', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'HR operations', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },

  // Sales Department - Morning Shift
  { id: 'DR008', empId: 'EMP004', empName: 'Fatima Raza', department: 'Sales', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Branch B', status: 'Scheduled', notes: 'Field sales', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR009', empId: 'EMP009', empName: 'Hassan Malik', department: 'Sales', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Client meetings', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },

  // Finance Department - Morning Shift
  { id: 'DR010', empId: 'EMP005', empName: 'Bilal Ahmed', department: 'Finance', shift: 'Night Shift', date: '2026-03-20', startTime: '22:00', endTime: '06:00', location: 'Branch B', status: 'Scheduled', notes: 'Night audit', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR011', empId: 'EMP010', empName: 'Ayesha Siddiq', department: 'Finance', shift: 'Morning Shift', date: '2026-03-20', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Financial planning', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },

  // Evening Shift - Mixed Departments
  { id: 'DR012', empId: 'EMP026', empName: 'Tariq Javed', department: 'Engineering', shift: 'Evening Shift', date: '2026-03-20', startTime: '14:00', endTime: '23:00', location: 'Head Office', status: 'Scheduled', notes: 'Backend support', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR013', empId: 'EMP017', empName: 'Zara Ahmed', department: 'Marketing', shift: 'Evening Shift', date: '2026-03-20', startTime: '14:00', endTime: '23:00', location: 'Head Office', status: 'Scheduled', notes: 'Social media monitoring', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR014', empId: 'EMP019', empName: 'Kashif Ahmed', department: 'Sales', shift: 'Evening Shift', date: '2026-03-20', startTime: '14:00', endTime: '23:00', location: 'Head Office', status: 'Scheduled', notes: 'Evening sales calls', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },

  // Weekend shifts
  { id: 'DR015', empId: 'EMP031', empName: 'Sadia Khan', department: 'Engineering', shift: 'Morning Shift', date: '2026-03-22', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Weekend QA support', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR016', empId: 'EMP037', empName: 'Fatima Ali', department: 'Marketing', shift: 'Morning Shift', date: '2026-03-22', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Weekend event coordination', assignedBy: 'Sara Khan', assignedAt: '2026-03-15T10:00:00Z' },
  { id: 'DR017', empId: 'EMP025', empName: 'Tariq Saeed', department: 'Finance', shift: 'Morning Shift', date: '2026-03-22', startTime: '09:00', endTime: '18:00', location: 'Head Office', status: 'Scheduled', notes: 'Weekend tax consultation', assignedBy: 'Ali Hassan', assignedAt: '2026-03-15T10:00:00Z' },
];

export const dutyRosterTemplates: DutyRosterTemplate[] = [
  {
    id: 'DRT001',
    name: 'Standard Office Hours',
    department: 'All',
    shifts: [
      { shiftName: 'Morning Shift', startTime: '09:00', endTime: '18:00', requiredStaff: 8, location: 'Head Office' },
      { shiftName: 'Evening Shift', startTime: '14:00', endTime: '23:00', requiredStaff: 3, location: 'Head Office' },
      { shiftName: 'Night Shift', startTime: '22:00', endTime: '06:00', requiredStaff: 2, location: 'Head Office' },
    ],
    isActive: true,
    createdBy: 'Ali Hassan',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DRT002',
    name: 'Engineering Development',
    department: 'Engineering',
    shifts: [
      { shiftName: 'Morning Shift', startTime: '09:00', endTime: '18:00', requiredStaff: 5, location: 'Head Office' },
      { shiftName: 'Evening Shift', startTime: '14:00', endTime: '23:00', requiredStaff: 2, location: 'Head Office' },
    ],
    isActive: true,
    createdBy: 'Sara Khan',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'DRT003',
    name: 'Sales Field Operations',
    department: 'Sales',
    shifts: [
      { shiftName: 'Morning Shift', startTime: '09:00', endTime: '18:00', requiredStaff: 4, location: 'Branch B' },
      { shiftName: 'Evening Shift', startTime: '14:00', endTime: '23:00', requiredStaff: 2, location: 'Head Office' },
    ],
    isActive: true,
    createdBy: 'Ali Hassan',
    createdAt: '2026-02-01T00:00:00Z'
  },
];

export const promotions = [
  { id: 'PR001', empId: 'EMP001', empName: 'Ahmed Ali', oldDesignation: 'Junior Developer', newDesignation: 'Senior Developer', oldSalary: 80000, newSalary: 120000, date: '2022-01-01', approvedBy: 'Super Admin' },
  { id: 'PR002', empId: 'EMP001', empName: 'Ahmed Ali', oldDesignation: 'Senior Developer', newDesignation: 'Lead Developer', oldSalary: 120000, newSalary: 150000, date: '2024-01-01', approvedBy: 'Super Admin' },
  { id: 'PR003', empId: 'EMP002', empName: 'Sara Khan', oldDesignation: 'Marketing Executive', newDesignation: 'Marketing Manager', oldSalary: 70000, newSalary: 120000, date: '2023-06-01', approvedBy: 'Super Admin' },
];

export const penalties = [
  { id: 'PN001', empId: 'EMP003', empName: 'Usman Malik', type: 'Late 3+ days', amount: 2000, date: '2026-02-28', appliedBy: 'HR1', status: 'Active' },
];

export const payrollMonthly = [
  { month: 'Oct', amount: 485000 },
  { month: 'Nov', amount: 492000 },
  { month: 'Dec', amount: 510000 },
  { month: 'Jan', amount: 498000 },
  { month: 'Feb', amount: 505000 },
  { month: 'Mar', amount: 520000 },
];

export const deptAttendance = [
  { dept: 'Engineering', rate: 95 },
  { dept: 'HR', rate: 91 },
  { dept: 'Finance', rate: 88 },
  { dept: 'Marketing', rate: 82 },
  { dept: 'Sales', rate: 74 },
];

export const auditLog = [
  { id: 'AL001', timestamp: '2026-03-19 09:15:22', user: 'Super Admin', role: 'super_admin', action: 'LOGIN', module: 'Auth', recordId: '-', summary: 'Super Admin logged in' },
  { id: 'AL002', timestamp: '2026-03-19 09:20:10', user: 'Super Admin', role: 'super_admin', action: 'UPDATE', module: 'Employee', recordId: 'EMP001', summary: 'Updated salary for Ahmed Ali', before: { salary: '120,000' }, after: { salary: '150,000' } },
  { id: 'AL003', timestamp: '2026-03-18 14:30:45', user: 'HR1', role: 'hr', action: 'CREATE', module: 'Employee', recordId: 'EMP005', summary: 'Added Bilal Ahmed as new employee' },
  { id: 'AL004', timestamp: '2026-03-17 11:05:33', user: 'Super Admin', role: 'super_admin', action: 'UPDATE', module: 'Leave', recordId: 'LR001', summary: 'Approved leave for Ahmed Ali' },
  { id: 'AL005', timestamp: '2026-03-16 16:22:18', user: 'HR1', role: 'hr', action: 'UPDATE', module: 'Leave', recordId: 'LR008', summary: 'Rejected leave for Usman Malik' },
  { id: 'AL006', timestamp: '2026-03-15 10:00:00', user: 'Super Admin', role: 'super_admin', action: 'CREATE', module: 'Payroll', recordId: 'PY-FEB-2026', summary: 'Generated February 2026 payroll' },
  { id: 'AL007', timestamp: '2026-03-14 09:00:00', user: 'HR1', role: 'hr', action: 'LOGIN', module: 'Auth', recordId: '-', summary: 'HR1 logged in' },
  { id: 'AL008', timestamp: '2026-03-13 17:45:00', user: 'Super Admin', role: 'super_admin', action: 'DELETE', module: 'Employee', recordId: 'EMP006', summary: 'Deleted inactive employee record' },
];

export const leaveTypes = [
  { name: 'Annual Leave', code: 'AL', active: true },
  { name: 'Casual Leave', code: 'CL', active: true },
  { name: 'Medical Leave', code: 'ML', active: true },
  { name: 'Sick Leave', code: 'SL', active: true },
  { name: 'Maternity Leave', code: 'MAT', active: true },
];

export const leavePolicies = [
  { leaveType: 'Annual Leave', days: 12, year: 2026, active: true },
  { leaveType: 'Casual Leave', days: 12, year: 2026, active: true },
  { leaveType: 'Medical Leave', days: 8, year: 2026, active: true },
];

export const payrollComponents = [
  { name: 'Basic Salary', type: 'Earning', taxable: true, order: 1, active: true },
  { name: 'House Rent Allowance', type: 'Earning', taxable: false, order: 2, active: true },
  { name: 'Medical Allowance', type: 'Earning', taxable: false, order: 3, active: true },
  { name: 'Conveyance Allowance', type: 'Earning', taxable: false, order: 4, active: true },
  { name: 'Commission', type: 'Earning', taxable: true, order: 5, active: true },
  { name: 'Absent Deduction', type: 'Deduction', taxable: false, order: 6, active: true },
  { name: 'Late Penalty', type: 'Deduction', taxable: false, order: 7, active: true },
  { name: 'Advance', type: 'Deduction', taxable: false, order: 8, active: true },
  { name: 'Loan Installment', type: 'Deduction', taxable: false, order: 9, active: true },
  { name: 'Tax', type: 'Deduction', taxable: false, order: 10, active: true },
  { name: 'Other Deductions', type: 'Deduction', taxable: false, order: 11, active: true },
];

export const penaltiesConfig = [
  { name: 'Late 3+ days in month', category: 'Attendance', defaultFine: 2000, active: true },
  { name: 'Eating at desk', category: 'Behaviour', defaultFine: 500, active: true },
  { name: 'Smoking in office', category: 'Behaviour', defaultFine: 1000, active: true },
  { name: 'Drinking at desk', category: 'Behaviour', defaultFine: 500, active: true },
];

export const hrAccounts = [
  { id: 'ACC001', username: 'superadmin', role: 'super_admin', password: 'admin123', linkedEmployee: '-', departments: ['All'], status: 'Active', created: '2020-01-01' },
  { id: 'ACC002', username: 'hr1', role: 'hr', password: 'hr123', linkedEmployee: 'EMP003 - Usman Malik', departments: ['HR'], status: 'Active', created: '2021-03-10' },
  { id: 'ACC003', username: 'hr2', role: 'hr', password: 'hr123', linkedEmployee: 'EMP002 - Sara Khan', departments: ['Marketing'], status: 'Active', created: '2021-03-15' },
  // Engineering Department HRs (15 accounts)
  { id: 'ACC004', username: 'eng_hr_lead', role: 'hr', password: 'hr123', linkedEmployee: 'EMP001 - Ahmed Ali', departments: ['Engineering'], status: 'Active', created: '2021-04-01' },
  { id: 'ACC005', username: 'eng_hr_senior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-04-05' },
  { id: 'ACC006', username: 'eng_hr_junior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-04-10' },
  { id: 'ACC007', username: 'eng_hr_manager', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-04-15' },
  { id: 'ACC008', username: 'eng_hr_coord', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-04-20' },
  { id: 'ACC009', username: 'eng_hr_specialist', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-04-25' },
  { id: 'ACC010', username: 'eng_hr_executive', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-01' },
  { id: 'ACC011', username: 'eng_hr_assistant', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-05' },
  { id: 'ACC012', username: 'eng_hr_officer', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-10' },
  { id: 'ACC013', username: 'eng_hr_supervisor', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-15' },
  { id: 'ACC014', username: 'eng_hr_director', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-20' },
  { id: 'ACC015', username: 'eng_hr_head', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-05-25' },
  { id: 'ACC016', username: 'eng_hr_vp', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-06-01' },
  { id: 'ACC017', username: 'eng_hr_ceo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-06-05' },
  { id: 'ACC018', username: 'eng_hr_cfo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Engineering'], status: 'Active', created: '2021-06-10' },

  // Marketing Department HRs (15 accounts)
  { id: 'ACC019', username: 'mkt_hr_lead', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-06-15' },
  { id: 'ACC020', username: 'mkt_hr_senior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-06-20' },
  { id: 'ACC021', username: 'mkt_hr_junior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-06-25' },
  { id: 'ACC022', username: 'mkt_hr_manager', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-01' },
  { id: 'ACC023', username: 'mkt_hr_coord', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-05' },
  { id: 'ACC024', username: 'mkt_hr_specialist', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-10' },
  { id: 'ACC025', username: 'mkt_hr_executive', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-15' },
  { id: 'ACC026', username: 'mkt_hr_assistant', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-20' },
  { id: 'ACC027', username: 'mkt_hr_officer', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-07-25' },
  { id: 'ACC028', username: 'mkt_hr_supervisor', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-01' },
  { id: 'ACC029', username: 'mkt_hr_director', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-05' },
  { id: 'ACC030', username: 'mkt_hr_head', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-10' },
  { id: 'ACC031', username: 'mkt_hr_vp', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-15' },
  { id: 'ACC032', username: 'mkt_hr_ceo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-20' },
  { id: 'ACC033', username: 'mkt_hr_cfo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Marketing'], status: 'Active', created: '2021-08-25' },

  // HR Department HRs (15 accounts)
  { id: 'ACC034', username: 'hr_hr_lead', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-01' },
  { id: 'ACC035', username: 'hr_hr_senior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-05' },
  { id: 'ACC036', username: 'hr_hr_junior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-10' },
  { id: 'ACC037', username: 'hr_hr_manager', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-15' },
  { id: 'ACC038', username: 'hr_hr_coord', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-20' },
  { id: 'ACC039', username: 'hr_hr_specialist', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-09-25' },
  { id: 'ACC040', username: 'hr_hr_executive', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-01' },
  { id: 'ACC041', username: 'hr_hr_assistant', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-05' },
  { id: 'ACC042', username: 'hr_hr_officer', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-10' },
  { id: 'ACC043', username: 'hr_hr_supervisor', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-15' },
  { id: 'ACC044', username: 'hr_hr_director', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-20' },
  { id: 'ACC045', username: 'hr_hr_head', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-10-25' },
  { id: 'ACC046', username: 'hr_hr_vp', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-11-01' },
  { id: 'ACC047', username: 'hr_hr_ceo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-11-05' },
  { id: 'ACC048', username: 'hr_hr_cfo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['HR'], status: 'Active', created: '2021-11-10' },

  // Sales Department HRs (15 accounts)
  { id: 'ACC049', username: 'sales_hr_lead', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-11-15' },
  { id: 'ACC050', username: 'sales_hr_senior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-11-20' },
  { id: 'ACC051', username: 'sales_hr_junior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-11-25' },
  { id: 'ACC052', username: 'sales_hr_manager', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-01' },
  { id: 'ACC053', username: 'sales_hr_coord', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-05' },
  { id: 'ACC054', username: 'sales_hr_specialist', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-10' },
  { id: 'ACC055', username: 'sales_hr_executive', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-15' },
  { id: 'ACC056', username: 'sales_hr_assistant', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-20' },
  { id: 'ACC057', username: 'sales_hr_officer', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2021-12-25' },
  { id: 'ACC058', username: 'sales_hr_supervisor', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-01' },
  { id: 'ACC059', username: 'sales_hr_director', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-05' },
  { id: 'ACC060', username: 'sales_hr_head', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-10' },
  { id: 'ACC061', username: 'sales_hr_vp', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-15' },
  { id: 'ACC062', username: 'sales_hr_ceo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-20' },
  { id: 'ACC063', username: 'sales_hr_cfo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Sales'], status: 'Active', created: '2022-01-25' },

  // Finance Department HRs (15 accounts)
  { id: 'ACC064', username: 'fin_hr_lead', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-01' },
  { id: 'ACC065', username: 'fin_hr_senior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-05' },
  { id: 'ACC066', username: 'fin_hr_junior', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-10' },
  { id: 'ACC067', username: 'fin_hr_manager', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-15' },
  { id: 'ACC068', username: 'fin_hr_coord', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-20' },
  { id: 'ACC069', username: 'fin_hr_specialist', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-02-25' },
  { id: 'ACC070', username: 'fin_hr_executive', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-01' },
  { id: 'ACC071', username: 'fin_hr_assistant', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-05' },
  { id: 'ACC072', username: 'fin_hr_officer', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-10' },
  { id: 'ACC073', username: 'fin_hr_supervisor', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-15' },
  { id: 'ACC074', username: 'fin_hr_director', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-20' },
  { id: 'ACC075', username: 'fin_hr_head', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-03-25' },
  { id: 'ACC076', username: 'fin_hr_vp', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-04-01' },
  { id: 'ACC077', username: 'fin_hr_ceo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-04-05' },
  { id: 'ACC078', username: 'fin_hr_cfo', role: 'hr', password: 'hr123', linkedEmployee: '-', departments: ['Finance'], status: 'Active', created: '2022-04-10' },
];

export const customFields = {
  employee: [
    { label: 'NTN Number', type: 'Text', required: false, section: 'Employee Info', active: true },
  ],
  job: [
    { label: 'Project Assignment', type: 'Text', required: false, section: 'Job Info', active: true },
  ],
  medical: [],
  extra: [],
};

export const taxConfig = [
  { id: 'TC001', salaryFrom: 0, salaryTo: 50000, taxRatePercent: 0, fixedAmount: 0, active: true },
  { id: 'TC002', salaryFrom: 50001, salaryTo: 100000, taxRatePercent: 5, fixedAmount: 0, active: true },
  { id: 'TC003', salaryFrom: 100001, salaryTo: null as number | null, taxRatePercent: 10, fixedAmount: 0, active: true },
];

export const globalDays: { id: string; title: string; date: string; type: string; affects_attendance: boolean; show_banner: boolean; banner_message: string; created_by: string; created_at: string; is_active: boolean }[] = [
  { id: 'GD001', title: 'Pakistan Day', date: '2026-03-23', type: 'holiday', affects_attendance: true, show_banner: false, banner_message: '', created_by: 'superadmin', created_at: '2026-01-01T00:00:00Z', is_active: true },
  { id: 'GD002', title: 'Eid ul Fitr', date: '2026-03-28', type: 'holiday', affects_attendance: true, show_banner: true, banner_message: 'Office closed for Eid ul Fitr celebrations', created_by: 'superadmin', created_at: '2026-03-01T00:00:00Z', is_active: true },
];

export function formatPKR(amount: number): string {
  return 'PKR ' + amount.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Keep old name as alias for backward compat during transition
export const formatRs = formatPKR;

export function numberToWords(n: number): string {
  if (n === 0) return 'Zero';
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const num = Math.floor(Math.abs(n));
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? ' ' + ones[num%10] : '');
  if (num < 1000) return ones[Math.floor(num/100)] + ' hundred' + (num%100 ? ' and ' + numberToWords(num%100) : '');
  if (num < 100000) return numberToWords(Math.floor(num/1000)) + ' thousand' + (num%1000 ? ' ' + numberToWords(num%1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num/100000)) + ' lakh' + (num%100000 ? ' ' + numberToWords(num%100000) : '');
  return numberToWords(Math.floor(num/10000000)) + ' crore' + (num%10000000 ? ' ' + numberToWords(num%10000000) : '');
}

export function getStatusColor(status: string): string {
  const s = status.toLowerCase();
  if (['present', 'active', 'approved', 'finalized'].includes(s)) return 'pill-green';
  if (['late', 'pending', 'probation', 'draft', 'notice period'].includes(s)) return 'pill-amber';
  if (['absent', 'rejected', 'terminated', 'inactive', 'fired'].includes(s)) return 'pill-red';
  if (['on leave', 'info'].includes(s)) return 'pill-blue';
  return 'pill-steel';
}











