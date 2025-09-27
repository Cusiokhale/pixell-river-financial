 import { employees, Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../../../data/employees';

const getNextId = () => {
    return employees.length + 1;
}

export const createEmployee = (employeeData: CreateEmployeeRequest): Employee => {
  // Check if email already exists
  const existingEmployee = employees.find(emp => emp.email === employeeData.email);
  if (existingEmployee) {
    throw new Error('Employee with this email already exists');
  }

  const newEmployee: Employee = {
    id: getNextId(),
    ...employeeData
  };

  employees.push(newEmployee);
  return newEmployee;
};

export const getAllEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (id: number): Employee | null => {
  return employees.find(emp => emp.id === id) || null;
};

export const updateEmployee = (id: number, updateData: UpdateEmployeeRequest) => {
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  
  if (employeeIndex === -1) {
    return null;
  }

  // Check if email is being updated and already exists for another employee
  if (updateData.email) {
    const existingEmployee = employees.find(emp => emp.email === updateData.email && emp.id !== id);
    if (existingEmployee) {
      throw new Error('Employee with this email already exists');
    }
  }

const updatedEmployee: Employee = { ...employees[employeeIndex] };

for (const key in updateData) {
  if (updateData[key as keyof UpdateEmployeeRequest] !== undefined) {
    updatedEmployee[key as keyof Employee] = updateData[key as keyof UpdateEmployeeRequest]!;
}

  employees[employeeIndex] = updatedEmployee;

  return updatedEmployee;
}};

export const deleteEmployee = (id: number): boolean => {
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  
  if (employeeIndex === -1) {
    return false;
  }

  employees.splice(employeeIndex, 1);
  return true;
};

export const getEmployeesByBranch = (branchId: number): Employee[] => {
  return employees.filter(emp => emp.branchId === branchId);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
};