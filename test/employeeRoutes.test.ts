import request from 'supertest';
import { app } from '../src/app';

describe('Employee Routes Tests', () => {
    describe('Create Employee - POST /api/employees', () => {
        it('should successfully create a new employee', async () => {
            const newEmployee = {
                name: "Cordelia Usiokhale",
                position: "Developer",
                department: "IT",
                email: "c.usiokhale@pixell-river.com",
                phone: "204-555-1234",
                branchId: 1
            };

            const response = await request(app)
                .post('/api/v1/employees')
                .send(newEmployee)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newEmployee.name);
            expect(response.body.position).toBe(newEmployee.position);
            expect(response.body.department).toBe(newEmployee.department);
            expect(response.body.email).toBe(newEmployee.email);
            expect(response.body.phone).toBe(newEmployee.phone);
            expect(response.body.branchId).toBe(newEmployee.branchId);
        });

        it('should return 400 when missing required parameters', async () => {
            const incompleteEmployee = {
                name: "Cordelia Usiokhale",
                position: "Developer"
                // Missing required fields: department, email, phone, branchId
            };

            const response = await request(app)
                .post('/api/v1/employees')
                .send(incompleteEmployee)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('All fields are required');
        });
    });

    describe('Get All Employees - GET /api/v1/employees', () => {
        it('should successfully retrieve all employees', async () => {
            const response = await request(app)
                .get('/api/v1/employees')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(36);

            // Verify first employee structure
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('position');
            expect(response.body[0]).toHaveProperty('department');
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('phone');
            expect(response.body[0]).toHaveProperty('branchId');

            // Verify employee data
            expect(response.body[0].name).toBe("Alice Johnson");
            expect(response.body[1].name).toBe("Amandeep Singh");
        });
    });

    describe('Get Employee by ID - GET /api/v1/employees/:id', () => {
        it('should successfully retrieve employee by ID', async () => {
            const response = await request(app)
                .get('/api/v1/employees/1')
                .expect(200);

            expect(response.body.id).toBe(1);
            expect(response.body.name).toBe("Alice Johnson");
            expect(response.body.position).toBe("Branch Manager");
            expect(response.body.department).toBe("Management");
            expect(response.body.email).toBe("alice.johnson@pixell-river.com");
            expect(response.body.phone).toBe("604-555-0148");
            expect(response.body.branchId).toBe(12);
        });

        it('should return 400 when ID parameter is missing or invalid', async () => {
            const response = await request(app)
                .get('/api/v1/employees/invalid')
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Invalid employee ID');
        });
    });

    describe('Update Employee - PUT /api/v1/employees/:id', () => {
        it('should successfully update employee data', async () => {
            const updates = {
                position: "Senior Branch Manager",
                phone: "604-555-9999"
            };

            const response = await request(app)
                .put('/api/v1/employees/1')
                .send(updates)
                .expect(200);

            expect(response.body.id).toBe(1);
            expect(response.body.name).toBe("Alice Johnson");
            expect(response.body.position).toBe("Senior Branch Manager");
            expect(response.body.phone).toBe("604-555-0148");
            expect(response.body.email).toBe("alice.johnson@pixell-river.com");
            expect(response.body.department).toBe("Management");
            expect(response.body.branchId).toBe(12);
        });

        it('should return 400 when ID parameter is missing or invalid', async () => {
            const updates = {
                position: "Manager"
            };

            const response = await request(app)
                .put('/api/v1/employees/invalid')
                .send(updates)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Invalid employee ID');
        });
    });

    describe('Delete Employee - DELETE /api/v1/employees/:id', () => {
        it('should successfully delete an employee', async () => {
            const response = await request(app)
                .delete('/api/v1/employees/2')
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Employee successfully deleted');

            await request(app)
                .get('/api/v1/employees/2')
                .expect(404);
        });

        it('should return 400 when ID parameter is missing or invalid', async () => {
            const response = await request(app)
                .delete('/api/v1/employees/invalid')
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Invalid employee ID');
        });
    });
});