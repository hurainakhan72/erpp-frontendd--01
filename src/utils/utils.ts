import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVisibleEmployees(user: { role: string; departments?: string[] } | null, activeRole: string, employees: any[]) {
  if (!user || activeRole !== 'hr' || user.role !== 'hr') return employees;
  if (!user.departments || user.departments.length === 0 || user.departments.includes('All')) return employees;
  return employees.filter(emp => user.departments?.includes(emp.department));
}

/**
 * Filter any data array by HR's assigned departments
 * Used for attendance, leave requests, payroll, etc.
 */
export function filterByDepartment(
  user: { role: string; departments?: string[] } | null,
  activeRole: string,
  data: any[],
  deptField: string = 'dept' | 'department'
) {
  // Super admin or non-HR users see all data
  if (!user || activeRole !== 'hr' || user.role !== 'hr') return data;
  
  // If no departments or 'All' is included, show all data
  if (!user.departments || user.departments.length === 0 || user.departments.includes('All')) {
    return data;
  }
  
  // Filter data by department
  return data.filter(item => {
    const itemDept = item[deptField];
    return user.departments?.includes(itemDept);
  });
}

/**
 * Get user's department for dashboard and filters
 */
export function getUserDepartment(user: { departments?: string[] } | null): string[] {
  if (!user || !user.departments || user.departments.length === 0) {
    return [];
  }
  return user.departments;
}











