const request = require('supertest');
const app = require('../app'); // Ensure the path is correct

describe('Recycling Activities', () => {
  let token;
  let recyclingId;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'secret123'
      });
    token = loginResponse.body.token;
  });

  it('should create a recycling activity', async () => {
    const res = await request(app)
      .post('/api/recycling')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-07-01',
        material: 'Plastic',
        amount: 5.5
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    recyclingId = res.body.id; // Save the recycling ID for other tests
  });

  it('should retrieve recycling activities', async () => {
    const res = await request(app)
      .get('/api/recycling')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a recycling activity', async () => {
    const res = await request(app)
      .put(`/api/recycling/${recyclingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        material: 'Glass',
        amount: 3.5
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully');
  });

  it('should delete a recycling activity', async () => {
    const res = await request(app)
      .delete(`/api/recycling/${recyclingId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully');
  });
});
