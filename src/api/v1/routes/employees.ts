import { Router } from 'express';
import * as employeeController from '../controllers/employees';

const router = Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

router.get('/branches/:branchId', employeeController.getEmployeesByBranch);
router.get('/departments/:department', employeeController.getEmployeesByDepartment);


export default router;
