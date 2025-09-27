import request from 'supertest';
import {app} from '../src/app';

describe('Branch Routes Tests', () => {

  describe('Create Branch - POST /api/v1/branches', () => {
    it('should successfully create a new branch', async () => {
      const newBranch = {
        name: "Winnipeg Branch",
        address: "2020 Pembina Highway, Winnipeg, MB, R3T 2A8",
        phone: "431-900-0000"
      };

      const response = await request(app)
        .post('/api/v1/branches')
        .send(newBranch)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newBranch.name);
      expect(response.body.address).toBe(newBranch.address);
      expect(response.body.phone).toBe(newBranch.phone);
    });

    it('should return 400 when missing required parameters', async () => {
      const incompleteBranch = {
        name: "Montreal Branch"
        // Missing required fields: address, phone
      };

      const response = await request(app)
        .post('/api/v1/branches')
        .send(incompleteBranch)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('All fields are required');
    });
  });

  describe('Get All Branches - GET /api/v1/branches', () => {
    it('should successfully retrieve all branches', async () => {
      const response = await request(app)
        .get('/api/v1/branches')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(11);
      
      // Verify first branch structure
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('address');
      expect(response.body[0]).toHaveProperty('phone');

      // Verify branch data
      expect(response.body[0].name).toBe("Vancouver Branch");
      expect(response.body[1].name).toBe("Edmonton Branch");
      expect(response.body[2].name).toBe("Arborg Branch");
    });
  });

  describe('Get Branch by ID - GET /api/v1/branches/:id', () => {
    it('should successfully retrieve branch by ID', async () => {
      const response = await request(app)
        .get('/api/v1/branches/1')
        .expect(200);

      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe("Vancouver Branch");
      expect(response.body.address).toBe("1300 Burrard St, Vancouver, BC, V6Z 2C7");
      expect(response.body.phone).toBe("604-456-0022");
    });

    it('should return 400 when ID parameter is missing or invalid', async () => {
      const response = await request(app)
        .get('/api/v1/branches/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid branch ID');
    });
  });

  describe('Update Branch - PUT /api/v1/branches/:id', () => {
    it('should successfully update branch data', async () => {
      const updates = {
        address: "1301 Burrard St, Vancouver, BC, V6Z 2C8",
        phone: "604-456-0099"
      };

      const response = await request(app)
        .put('/api/v1/branches/1')
        .send(updates)
        .expect(200);

      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe("Vancouver Branch"); // Unchanged
      expect(response.body.address).toBe("1301 Burrard St, Vancouver, BC, V6Z 2C8"); // Updated
      expect(response.body.phone).toBe("604-456-0099"); // Updated
    });

    it('should return 400 when ID parameter is missing or invalid', async () => {
      const updates = {
        phone: "604-999-9999"
      };

      const response = await request(app)
        .put('/api/v1/branches/invalid')
        .send(updates)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid branch ID');
    });
  });

  describe('Delete Branch - DELETE /api/v1/branches/:id', () => {
    it('should successfully delete a branch', async () => {
      const response = await request(app)
        .delete('/api/v1/branches/10')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Branch successfully deleted');

      // Verify branch is actually deleted by trying to retrieve it
      await request(app)
        .get('/api/v1/branches/10')
        .expect(404);

      // Verify remaining branches count
      const remainingBranches = await request(app)
        .get('/api/v1/branches')
        .expect(200);
      
      expect(remainingBranches.body).toHaveLength(10);
    });

    it('should return 400 when ID parameter is missing or invalid', async () => {
      const response = await request(app)
        .delete('/api/v1/branches/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid branch ID');
    });
  });
});