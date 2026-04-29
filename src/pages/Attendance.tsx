// pages/Attendance.tsx
import { useState, useRef } from 'react';

type ShiftType = 'Morning' | 'Evening' | 'Night';
type EmployeeStatus = 'Present' | 'Late' | 'Absent' | 'On Leave';

interface DayData {
  checkIn: string;
  checkOut: string;
  workedHours: number;
  lateMinutes: number;
  status: 'present' | 'late' | 'absent' | 'off';
}

interface Employee {
  id: string;
  name: string;
  code: string;
  department: string;
  shift: ShiftType;
  checkIn: string;
  checkOut: string;
  status: EmployeeStatus;
  notes: string;
  latesCount: number;
  lateDates: number[];
  absentDates: number[];
  offDates: number[];
  dailyData: { [key: number]: DayData };
}

interface RosterStaff {
  name: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

// Convert 24hr to 12hr format
const to12Hour = (time: string): string => {
  if (time === '--') return '--';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
};

// Generate detailed daily data
const generateDailyData = (year: number, month: number, lateDates: number[], absentDates: number[] = [], offDates: number[] = [6, 13, 20, 27]) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: { [key: number]: DayData } = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isSaturday = date.getDay() === 6;
    
    if (offDates.includes(day) || isSaturday) {
      data[day] = { checkIn: '--', checkOut: '--', workedHours: 0, lateMinutes: 0, status: 'off' };
    } else if (absentDates.includes(day)) {
      data[day] = { checkIn: '--', checkOut: '--', workedHours: 0, lateMinutes: 0, status: 'absent' };
    } else if (lateDates.includes(day)) {
      const lateMinMap: { [key: number]: number } = { 8: 25, 9: 8, 14: 8, 15: 0, 21: 40, 22: 0, 28: 12 };
      const lateMin = lateMinMap[day] || [8, 12, 25, 40][Math.floor(Math.random() * 4)];
      data[day] = { 
        checkIn: `09:${String([2, 4, 5, 8, 25][Math.floor(Math.random() * 5)]).padStart(2, '0')}`, 
        checkOut: '06:05', 
        workedHours: 9,
        lateMinutes: lateMin,
        status: 'late'
      };
    } else {
      data[day] = { 
        checkIn: `08:${String(50 + Math.floor(Math.random() * 7)).padStart(2, '0')}`, 
        checkOut: `06:${String(0 + Math.floor(Math.random() * 8)).padStart(2, '0')}`, 
        workedHours: 9 + Math.floor(Math.random() * 2),
        lateMinutes: 0,
        status: 'present'
      };
    }
  }
  return data;
};

const employees: Employee[] = [
  { 
    id: '1', name: 'Ahmed Raza', code: 'E-101', department: 'Sales', shift: 'Morning', 
    checkIn: '09:04', checkOut: '06:02', status: 'Present', notes: '', 
    latesCount: 4, lateDates: [8, 14, 21, 28], absentDates: [11, 18, 25], offDates: [5, 12, 19, 26],
    dailyData: generateDailyData(2026, 3, [8, 14, 21, 28], [11, 18, 25], [5, 12, 19, 26]) 
  },
  { id: '2', name: 'Sana Iqbal', code: 'E-102', department: 'Accounts', shift: 'Morning', checkIn: '09:18', checkOut: '06:10', status: 'Late', notes: 'Traffic on Shahrah', latesCount: 3, lateDates: [2, 9, 16], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [2, 9, 16], [], [6, 13, 20, 27]) },
  { id: '3', name: 'Bilal Khan', code: 'E-103', department: 'IT', shift: 'Evening', checkIn: '02:00', checkOut: '10:05', status: 'Present', notes: 'Covering for Hamza', latesCount: 0, lateDates: [], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [], [], [6, 13, 20, 27]) },
  { id: '4', name: 'Hira Saleem', code: 'E-104', department: 'HR', shift: 'Morning', checkIn: '--', checkOut: '--', status: 'On Leave', notes: 'CL — approved', latesCount: 0, lateDates: [], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [], [], [6, 13, 20, 27]) },
  { id: '5', name: 'Usman Tariq', code: 'E-105', department: 'Warehouse', shift: 'Night', checkIn: '10:11', checkOut: '06:01', status: 'Present', notes: 'Shift swap w/ Asad', latesCount: 2, lateDates: [7, 21], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [7, 21], [], [6, 13, 20, 27]) },
  { id: '6', name: 'Mariam Yousuf', code: 'E-106', department: 'Marketing', shift: 'Morning', checkIn: '--', checkOut: '--', status: 'Absent', notes: 'No leave application', latesCount: 0, lateDates: [], absentDates: [1, 2, 3], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [], [1, 2, 3], [6, 13, 20, 27]) },
  { id: '7', name: 'Faraz Ali', code: 'E-107', department: 'Sales', shift: 'Morning', checkIn: '09:02', checkOut: '06:00', status: 'Present', notes: 'Service visit @ DHA', latesCount: 0, lateDates: [], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [], [], [6, 13, 20, 27]) },
  { id: '8', name: 'Zoya Hashmi', code: 'E-108', department: 'Accounts', shift: 'Evening', checkIn: '02:25', checkOut: '10:10', status: 'Late', notes: 'Bank work', latesCount: 4, lateDates: [1, 8, 15, 22], absentDates: [], offDates: [6, 13, 20, 27], dailyData: generateDailyData(2026, 3, [1, 8, 15, 22], [], [6, 13, 20, 27]) },
];

const initialRoster: RosterStaff[] = [
  { name: 'Ahmed', mon: 'M', tue: 'M', wed: 'M', thu: 'E', fri: 'M', sat: 'M' },
  { name: 'Sana', mon: 'M', tue: 'M', wed: 'E', thu: 'E', fri: 'M', sat: 'Off' },
  { name: 'Bilal', mon: 'E', tue: 'E', wed: 'N', thu: 'N', fri: 'E', sat: 'E' },
  { name: 'Usman', mon: 'N', tue: 'N', wed: 'N', thu: 'Off', fri: 'N', sat: 'N' },
  { name: 'Mariam', mon: 'M', tue: 'M', wed: 'M', thu: 'M', fri: 'M', sat: 'Off' },
];

const shiftOptions: ShiftType[] = ['Morning', 'Evening', 'Night'];
const rosterOptions = ['M', 'E', 'N', 'Off'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Attendance = () => {
  const [data, setData] = useState<Employee[]>(employees);
  const [roster, setRoster] = useState<RosterStaff[]>(initialRoster);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openShiftId, setOpenShiftId] = useState<string | null>(null);
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [editingCheckIn, setEditingCheckIn] = useState<string | null>(null);
  const [editingCheckOut, setEditingCheckOut] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = {
    present: data.filter(e => e.status === 'Present').length,
    late: data.filter(e => e.status === 'Late').length,
    absent: data.filter(e => e.status === 'Absent').length,
    onLeave: data.filter(e => e.status === 'On Leave').length,
  };

  const filteredData = data.filter(emp => {
    const matchesFilter = activeFilter === 'All' || emp.status === activeFilter;
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get weeks in month
  const getWeeksInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks = [];
    let current = new Date(firstDay);
    
    while (current.getDay() !== 0 && current > firstDay) {
      current.setDate(current.getDate() - 1);
    }
    
    while (current <= lastDay) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(current);
        if (day <= lastDay && day >= firstDay) {
          week.push(day.getDate());
        } else if (day < firstDay) {
          week.push(null);
        } else {
          week.push(null);
        }
        current.setDate(current.getDate() + 1);
      }
      if (week.some(d => d !== null)) {
        weeks.push(week);
      }
    }
    return weeks;
  };

  const openDetailedReport = (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  const closeReport = () => setSelectedEmployee(null);
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Calculate stats for selected employee
  const getEmployeeStats = (emp: Employee | null) => {
    if (!emp) return { lateDays: 0, absent: 0, totalLateMins: 0, workedHours: 0 };
    
    let lateDays = 0;
    let absent = 0;
    let totalLateMins = 0;
    let workedHours = 0;
    
    for (let day = 1; day <= 31; day++) {
      const dayData = emp.dailyData?.[day];
      if (dayData) {
        if (dayData.status === 'late') {
          lateDays++;
          totalLateMins += dayData.lateMinutes;
          workedHours += dayData.workedHours;
        } else if (dayData.status === 'present') {
          workedHours += dayData.workedHours;
        } else if (dayData.status === 'absent') {
          absent++;
        }
      }
    }
    
    return { lateDays, absent, totalLateMins, workedHours };
  };

  const empStats = getEmployeeStats(selectedEmployee);
  const weeks = getWeeksInMonth(currentYear, currentMonth);

  // Update functions
  const updateShift = (empId: string, newShift: ShiftType) => {
    setData(prev => prev.map(emp => emp.id === empId ? { ...emp, shift: newShift } : emp));
    setOpenShiftId(null);
  };

  const updateStatus = (empId: string, newStatus: EmployeeStatus) => {
    setData(prev => prev.map(emp => emp.id === empId ? { ...emp, status: newStatus } : emp));
    setOpenStatusId(null);
  };

  const updateNotes = (empId: string, newNotes: string) => {
    setData(prev => prev.map(emp => emp.id === empId ? { ...emp, notes: newNotes } : emp));
    setEditingNotes(null);
  };

  const updateCheckIn = (empId: string, newCheckIn: string) => {
    setData(prev => prev.map(emp => emp.id === empId ? { ...emp, checkIn: to12Hour(newCheckIn) } : emp));
    setEditingCheckIn(null);
  };

  const updateCheckOut = (empId: string, newCheckOut: string) => {
    setData(prev => prev.map(emp => emp.id === empId ? { ...emp, checkOut: to12Hour(newCheckOut) } : emp));
    setEditingCheckOut(null);
  };

  const updateRosterShift = (staffName: string, day: string, value: string) => {
    setRoster(prev => prev.map(staff =>
      staff.name === staffName ? { ...staff, [day]: value } : staff
    ));
  };

  const handleExport = () => {
    const exportData = data.map(emp => ({
      Name: emp.name, Code: emp.code, Department: emp.department,
      Shift: emp.shift, CheckIn: emp.checkIn, CheckOut: emp.checkOut,
      Status: emp.status, Notes: emp.notes, Lates: emp.latesCount
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedData)) {
          const mappedData = importedData.map((item: any, idx: number) => ({
            id: String(idx + 1),
            name: item.Name || item.name,
            code: item.Code || item.code,
            department: item.Department || item.department,
            shift: item.Shift || item.shift || 'Morning',
            checkIn: item.CheckIn || item.checkIn || '--',
            checkOut: item.CheckOut || item.checkOut || '--',
            status: item.Status || item.status || 'Present',
            notes: item.Notes || item.notes || '',
            latesCount: item.Lates || item.latesCount || 0,
            lateDates: item.LateDates || item.lateDates || [],
            absentDates: item.AbsentDates || [],
            offDates: [6, 13, 20, 27],
            dailyData: generateDailyData(2026, 3, item.LateDates || [], item.AbsentDates || [], [6, 13, 20, 27])
          }));
          setData(mappedData);
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Colorful Inline Styles
  const styles = {
    container: { padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', maxWidth: '1600px', margin: '0 auto' },
    leftColumn: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
    rightColumn: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
    card: { backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' },
    cardHeader: { padding: '20px 24px', borderBottom: '1px solid #e9ecef', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    cardTitle: { fontSize: '22px', fontWeight: '700', color: '#ffffff', margin: 0 },
    date: { fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '6px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '20px 24px', backgroundColor: '#fff' },
    statItem: (color: string, isActive: boolean) => ({ backgroundColor: color, padding: '16px', borderRadius: '16px', textAlign: 'center' as const, cursor: 'pointer', border: isActive ? '3px solid #1a1f36' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }),
    statLabel: { fontSize: '11px', fontWeight: '600', color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: '8px', opacity: 0.9 },
    statValue: { fontSize: '28px', fontWeight: '800', color: '#fff' },
    liveBar: { padding: '12px 20px', backgroundColor: '#fff7ed', borderBottom: '1px solid #ffedd5', fontSize: '12px', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const },
    penaltyTag: { backgroundColor: '#ffedd5', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: '#c2410c' },
    actionBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#fff', borderBottom: '1px solid #e9ecef', gap: '16px', flexWrap: 'wrap' as const },
    searchBox: { display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '40px', padding: '8px 16px', gap: '8px', flex: 1, maxWidth: '300px' },
    searchInput: { border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '13px', width: '100%', fontFamily: 'inherit' },
    buttonGroup: { display: 'flex', gap: '10px' },
    actionBtn: (bg: string, color: string) => ({ backgroundColor: bg, border: 'none', borderRadius: '30px', padding: '8px 18px', fontSize: '12px', fontWeight: '500', color: color, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit' }),
    tableWrapper: { overflowX: 'auto' as const, padding: '0 24px 24px 24px' },
    table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' },
    th: { textAlign: 'left' as const, padding: '14px 12px', backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontWeight: '600', color: '#1e293b', fontSize: '12px' },
    td: { padding: '14px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' as const },
    employeeName: { fontWeight: '600', color: '#0f172a', fontSize: '13px' },
    employeeCode: { fontSize: '10px', color: '#64748b', marginTop: '2px' },
    avatar: { width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '13px', color: '#fff' },
    shiftBtn: { backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '5px 12px', fontSize: '11px', fontWeight: '500', color: '#334155', cursor: 'pointer', fontFamily: 'inherit' },
    dropdown: { position: 'absolute' as const, top: '100%', left: 0, marginTop: '5px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '110px' },
    dropdownItem: { padding: '8px 14px', fontSize: '12px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' },
    statusBadge: (status: EmployeeStatus) => ({ display: 'inline-block', padding: '4px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', backgroundColor: status === 'Present' ? '#dcfce7' : status === 'Late' ? '#fed7aa' : status === 'Absent' ? '#fee2e2' : '#e0e7ff', color: status === 'Present' ? '#166534' : status === 'Late' ? '#9a3412' : status === 'Absent' ? '#991b1b' : '#3730a3' }),
    editableField: { cursor: 'pointer', padding: '4px 8px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'inline-block' },
    editableInput: { padding: '6px 10px', borderRadius: '10px', border: '2px solid #667eea', fontSize: '12px', width: '110px', fontFamily: 'inherit', outline: 'none' },
    notesText: { fontSize: '11px', color: '#64748b', cursor: 'pointer', padding: '4px 8px', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'inline-block', maxWidth: '140px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
    latesLink: { color: '#667eea', fontWeight: '700', cursor: 'pointer', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' },
    footerText: { padding: '14px 24px', borderTop: '1px solid #e9ecef', fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', backgroundColor: '#fafcfc' },
    
    // Colorful Report Modal Styles
    modalOverlay: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflow: 'auto', padding: '20px' },
    modalContent: { backgroundColor: '#fff', borderRadius: '28px', maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
    reportHeader: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px 28px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' },
    reportTitle: { fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0 },
    reportSubtitle: { fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '6px' },
    closeBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '40px', padding: '8px 20px', fontSize: '13px', cursor: 'pointer', color: '#fff' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '24px 28px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    reportStatCard: (color: string) => ({ backgroundColor: color, padding: '20px', borderRadius: '20px', textAlign: 'center' as const, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }),
    reportStatLabel: { fontSize: '12px', fontWeight: '600', color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.5px', opacity: 0.9 },
    reportStatValue: { fontSize: '36px', fontWeight: '800', color: '#fff', marginTop: '8px' },
    reportStatUnit: { fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' },
    
    weekGroup: { padding: '20px 28px', borderBottom: '1px solid #e2e8f0' },
    weekHeader: { fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase' as const },
    weekTable: { width: '100%', borderCollapse: 'collapse' as const },
    dayHeaderCell: { padding: '12px 8px', textAlign: 'center' as const, backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', fontWeight: '600', color: '#475569', fontSize: '12px' },
    dayCell: (status: string) => ({ 
      padding: '12px 8px', 
      textAlign: 'center' as const, 
      border: '1px solid #e2e8f0',
      backgroundColor: status === 'late' ? '#fef2f2' : status === 'absent' ? '#f8fafc' : status === 'off' ? '#faf5ff' : '#fff',
    }),
    dayNumber: (status: string) => ({ 
      fontWeight: '700', 
      fontSize: '14px', 
      marginBottom: '6px',
      color: status === 'late' ? '#dc2626' : status === 'absent' ? '#94a3b8' : status === 'off' ? '#9333ea' : '#1e293b'
    }),
    timeText: { fontSize: '10px', color: '#475569', marginBottom: '4px' },
    hoursText: (isLate: boolean) => ({ 
      fontSize: '12px', 
      fontWeight: isLate ? '700' : '500',
      color: isLate ? '#dc2626' : '#64748b',
      marginTop: '4px'
    }),
    
    penaltyHeader: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '16px 20px' },
    penaltyTitle: { fontSize: '16px', fontWeight: '600', color: '#fff', margin: 0 },
    penaltySub: { fontSize: '10px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' },
    penaltyGrid: { padding: '20px' },
    penaltyItem: { padding: '12px 0', borderBottom: '1px solid #f1f5f9' },
    penaltyItemTitle: { fontSize: '12px', fontWeight: '600', color: '#1e293b' },
    penaltyDesc: { fontSize: '10px', color: '#94a3b8', marginTop: '3px' },
    penaltyValue: { fontSize: '11px', fontWeight: '600', color: '#e11d48', marginTop: '5px' },
    rosterHeader: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '16px 20px' },
    rosterTable: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '11px' },
    rosterTh: { padding: '12px 6px', textAlign: 'center' as const, backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', fontWeight: '600', color: '#475569' },
    rosterTd: { padding: '10px 6px', textAlign: 'center' as const, borderBottom: '1px solid #f1f5f9', cursor: 'pointer', fontWeight: '500' },
    rosterLegend: { display: 'flex', gap: '16px', padding: '14px 20px', borderTop: '1px solid #e9ecef', fontSize: '10px', color: '#94a3b8', flexWrap: 'wrap' as const },
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainGrid}>
        {/* LEFT COLUMN */}
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>📋 Daily Attendance Grid</div>
              <div style={styles.date}>📅 {new Date().toLocaleDateString('en-US', { weekday: 'long' })}, {new Date().toLocaleDateString()}</div>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statItem('#10b981', activeFilter === 'All')} onClick={() => setActiveFilter('All')}><div style={styles.statLabel}>✅ PRESENT</div><div style={styles.statValue}>{stats.present}</div></div>
              <div style={styles.statItem('#f59e0b', activeFilter === 'Late')} onClick={() => setActiveFilter('Late')}><div style={styles.statLabel}>⚠️ LATE</div><div style={styles.statValue}>{stats.late}</div></div>
              <div style={styles.statItem('#ef4444', activeFilter === 'Absent')} onClick={() => setActiveFilter('Absent')}><div style={styles.statLabel}>❌ ABSENT</div><div style={styles.statValue}>{stats.absent}</div></div>
              <div style={styles.statItem('#8b5cf6', activeFilter === 'On Leave')} onClick={() => setActiveFilter('On Leave')}><div style={styles.statLabel}>🏖️ ON LEAVE</div><div style={styles.statValue}>{stats.onLeave}</div></div>
              <div style={styles.statItem('#ec4899', activeFilter === 'Penalties')} onClick={() => setActiveFilter('Penalties')}><div style={styles.statLabel}>⚡ AUTO PENALTIES</div><div style={styles.statValue}>2</div></div>
            </div>

            <div style={styles.liveBar}>
              <span style={styles.penaltyTag}>⚠️ 3 Lates = 1 Day Cut</span>
              <span>🔴 Live: 1 Absent today · 1 on Saturday cycle · 3 Late check-ins flagged</span>
            </div>

            <div style={styles.actionBar}>
              <div style={styles.searchBox}><span>🔍</span><input type="text" placeholder="Search by name, code or department..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />{searchTerm && <span onClick={() => setSearchTerm('')} style={{ cursor: 'pointer' }}>✕</span>}</div>
              <div style={styles.buttonGroup}>
                <button style={styles.actionBtn('#f3f4f6', '#374151')} onClick={handleExport}>📤 Export</button>
                <button style={styles.actionBtn('#667eea', '#fff')} onClick={() => fileInputRef.current?.click()}>📥 Import</button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".json" onChange={handleImport} />
              </div>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>👤 EMPLOYEE</th><th style={styles.th}>🔄 SHIFT</th><th style={styles.th}>⏰ CHECK IN</th><th style={styles.th}>⏰ CHECK OUT</th><th style={styles.th}>📌 STATUS</th><th style={styles.th}>📝 NOTES</th><th style={styles.th}>⚠️ LATES</th></tr></thead>
                <tbody>
                  {filteredData.map(emp => (
                    <tr key={emp.id}>
                      <td style={styles.td}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={styles.avatar}>{emp.name.split(' ').map(n => n[0]).join('')}</div><div><div style={styles.employeeName}>{emp.name}</div><div style={styles.employeeCode}>{emp.code} · {emp.department}</div></div></div></td>
                      <td style={styles.td}><div style={{ position: 'relative' }}><button style={styles.shiftBtn} onClick={() => setOpenShiftId(openShiftId === emp.id ? null : emp.id)}>{emp.shift} ▼</button>{openShiftId === emp.id && (<div style={styles.dropdown}>{shiftOptions.map(shift => (<div key={shift} style={styles.dropdownItem} onClick={() => updateShift(emp.id, shift)}>{shift}</div>))}</div>)}</div></td>
                      <td style={styles.td}>{editingCheckIn === emp.id ? (<input type="time" defaultValue={emp.checkIn !== '--' ? emp.checkIn : '09:00'} style={styles.editableInput} onBlur={(e) => updateCheckIn(emp.id, e.target.value)} autoFocus />) : (<span style={styles.editableField} onClick={() => setEditingCheckIn(emp.id)}>🕐 {to12Hour(emp.checkIn)}</span>)}</td>
                      <td style={styles.td}>{editingCheckOut === emp.id ? (<input type="time" defaultValue={emp.checkOut !== '--' ? emp.checkOut : '18:00'} style={styles.editableInput} onBlur={(e) => updateCheckOut(emp.id, e.target.value)} autoFocus />) : (<span style={styles.editableField} onClick={() => setEditingCheckOut(emp.id)}>🕔 {to12Hour(emp.checkOut)}</span>)}</td>
                      <td style={styles.td}><div style={{ position: 'relative' }}><span style={styles.statusBadge(emp.status)} onClick={() => setOpenStatusId(openStatusId === emp.id ? null : emp.id)}>{emp.status} ▼</span>{openStatusId === emp.id && (<div style={styles.dropdown}>{['Present', 'Late', 'Absent', 'On Leave'].map(status => (<div key={status} style={styles.dropdownItem} onClick={() => updateStatus(emp.id, status as EmployeeStatus)}>{status}</div>))}</div>)}</div><tr>
                      <td style={styles.td}>{editingNotes === emp.id ? (<input type="text" defaultValue={emp.notes} style={{ ...styles.editableInput, width: '140px' }} onBlur={(e) => updateNotes(emp.id, e.target.value)} autoFocus placeholder="Add note..." />) : (<span style={styles.notesText} onClick={() => setEditingNotes(emp.id)}>📝 {emp.notes || 'Click to edit'}</span>)}</td>
                      <td style={styles.td}><button style={styles.latesLink} onClick={() => openDetailedReport(emp)}>{emp.latesCount}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && (<div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No matching records found</div>)}
            </div>

            <div style={styles.footerText}><span>📊 Showing {filteredData.length} of {data.length} staff · Click shift/status to override</span><span>🔄 Auto-sync · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <div style={styles.penaltyHeader}><div style={styles.penaltyTitle}>⚙️ Penalty Engine</div><div style={styles.penaltySub}>Backend rule book · runs nightly</div></div>
            <div style={styles.penaltyGrid}>
              <div style={{ backgroundColor: '#fef3c7', padding: '10px', borderRadius: '12px', marginBottom: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#92400e' }}>🔥 3 Lates = 1 Day Cut</div>
              <div style={styles.penaltyItem}><div style={styles.penaltyItemTitle}>⏰ Late Arrival</div><div style={styles.penaltyDesc}>CheckIn &gt; ShiftStart + 10m</div><div style={styles.penaltyValue}>−3 Days Salary</div></div>
              <div style={styles.penaltyItem}><div style={styles.penaltyItemTitle}>📅 Saturday Absent</div><div style={styles.penaltyDesc}>Day=Sat &amp; Status=Absent &amp; !Leave</div><div style={styles.penaltyValue}>−2 Days + 1 CL Cut</div></div>
              <div style={styles.penaltyItem}><div style={styles.penaltyItemTitle}>📝 Uninformed Leave</div><div style={styles.penaltyDesc}>Status=Absent &amp; No Application</div><div style={styles.penaltyValue}>Paid · No Deduction</div></div>
              <div style={styles.penaltyItem}><div style={styles.penaltyItemTitle}>✅ CEO Approved</div><div style={styles.penaltyDesc}>Leave.Approver = CEO</div><div style={styles.penaltyValue}>Waived</div></div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.rosterHeader}><div style={styles.penaltyTitle}>📅 Duty Roster · Is Hafte</div><div style={styles.penaltySub}>Click on any cell to change shift cycle</div></div>
            <div style={{ padding: '0 16px', overflowX: 'auto' }}>
              <table style={styles.rosterTable}>
                <thead><tr><th style={styles.rosterTh}>Staff</th><th style={styles.rosterTh}>Mon</th><th style={styles.rosterTh}>Tue</th><th style={styles.rosterTh}>Wed</th><th style={styles.rosterTh}>Thu</th><th style={styles.rosterTh}>Fri</th><th style={styles.rosterTh}>Sat</th></tr></thead>
                <tbody>
                  {roster.map((staff, idx) => (
                    <tr key={idx}>
                      <td style={{ ...styles.rosterTd, fontWeight: '600' }}>{staff.name}</td>
                      {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => {
                        const currentVal = staff[day as keyof RosterStaff] as string;
                        const getColor = () => { if (currentVal === 'M') return '#dcfce7'; if (currentVal === 'E') return '#fed7aa'; if (currentVal === 'N') return '#e0e7ff'; return '#fee2e2'; };
                        return (<td key={day} style={{ ...styles.rosterTd, backgroundColor: getColor(), fontWeight: '600' }} onClick={() => { const currentIndex = rosterOptions.indexOf(currentVal); const nextIndex = (currentIndex + 1) % rosterOptions.length; updateRosterShift(staff.name, day, rosterOptions[nextIndex]); }}>{currentVal}</td>);
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={styles.rosterLegend}><span>🟢 M = Morning</span><span>🟠 E = Evening</span><span>🔵 N = Night</span><span>🔴 Off = Off</span><span style={{ marginLeft: 'auto' }}>🔄 Click to cycle: M→E→N→Off→M</span></div>
          </div>
        </div>
      </div>

      {/* COLORFUL REPORT MODAL - Like time-tales-tracker */}
      {selectedEmployee && (
        <div style={styles.modalOverlay} onClick={closeReport}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Colorful Header */}
            <div style={styles.reportHeader}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={styles.reportTitle}>📅 {selectedEmployee.name} · Late Report</h2>
                  <p style={styles.reportSubtitle}>{selectedEmployee.department} · {monthNames[currentMonth]} {currentYear}</p>
                </div>
                <button onClick={closeReport} style={styles.closeBtn}>✕ Close</button>
              </div>
            </div>

            {/* Colorful Stats Cards */}
            <div style={styles.statsRow}>
              <div style={styles.reportStatCard('#f59e0b')}><div style={styles.reportStatLabel}>📅 Late Days</div><div style={styles.reportStatValue}>{empStats.lateDays}</div></div>
              <div style={styles.reportStatCard('#ef4444')}><div style={styles.reportStatLabel}>❌ Absent</div><div style={styles.reportStatValue}>{empStats.absent}</div></div>
              <div style={styles.reportStatCard('#8b5cf6')}><div style={styles.reportStatLabel}>⏱️ Total Late</div><div style={styles.reportStatValue}>{empStats.totalLateMins}<span style={styles.reportStatUnit}>m</span></div></div>
              <div style={styles.reportStatCard('#10b981')}><div style={styles.reportStatLabel}>💼 Worked Hours</div><div style={styles.reportStatValue}>{empStats.workedHours}<span style={styles.reportStatUnit}>h</span></div></div>
            </div>

            {/* Month Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '0 28px', marginBottom: '10px' }}>
              <button onClick={prevMonth} style={styles.shiftBtn}>← Previous Month</button>
              <span style={{ fontWeight: '600' }}>{monthNames[currentMonth]} {currentYear}</span>
              <button onClick={nextMonth} style={styles.shiftBtn}>Next Month →</button>
            </div>

            {/* Weekly Calendar View */}
            {weeks.map((week, weekIdx) => {
              const weekStart = week.find(d => d !== null);
              if (!weekStart) return null;
              
              return (
                <div key={weekIdx} style={styles.weekGroup}>
                  <div style={styles.weekHeader}>Week {weekIdx + 1}</div>
                  <table style={styles.weekTable}>
                    <thead>
                      <tr>
                        {weekdays.map(day => <th key={day} style={styles.dayHeaderCell}>{day}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {week.map((day, dayIdx) => {
                          if (!day) return <td key={dayIdx} style={styles.dayCell('empty')}>—</td>;
                          
                          const dayData = selectedEmployee.dailyData?.[day];
                          const status = dayData?.status || 'absent';
                          const isLate = status === 'late';
                          const isOff = status === 'off';
                          const isAbsent = status === 'absent';
                          
                          return (
                            <td key={dayIdx} style={styles.dayCell(status)}>
                              <div style={styles.dayNumber(status)}>{day}</div>
                              {isOff ? (
                                <div style={{ fontSize: '11px', color: '#9333ea', fontWeight: '500' }}>Day Off</div>
                              ) : isAbsent ? (
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Absent</div>
                              ) : (
                                <>
                                  <div style={styles.timeText}>
                                    {to12Hour(dayData?.checkIn || '--')} – {to12Hour(dayData?.checkOut || '--')}
                                  </div>
                                  <div style={styles.hoursText(isLate)}>
                                    {dayData?.workedHours || 0}h {isLate ? `+${dayData?.lateMinutes || 0}m` : ''}
                                  </div>
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;