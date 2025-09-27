import { Request, Response } from 'express';
import * as employeeService from '../services/employees';

export const createEmployee = (req: Request, res: Response) => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;
    
    // Validate required fields
    if (!name || !position || !department || !email || !phone || !branchId) {
      return res.status(400).json({
        error: 'All fields are required: name, position, department, email, phone, branchId'
      });
    }

    const newEmployee = employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    if (error instanceof Error && error.message === 'Employee with this email already exists') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllEmployees = (_req: Request, res: Response) => {
  try {
    const employees = employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEmployeeById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const employee = employeeService.getEmployeeById(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateEmployee = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const updatedEmployee = employeeService.updateEmployee(id, req.body);
    
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error instanceof Error && error.message === 'Employee with this email already exists') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteEmployee = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const isDeleted = employeeService.deleteEmployee(id);
    
    if (!isDeleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};