const request = require('supertest');
const app = require('../app'); // Ensure the path is correct

describe('Waste Collection Scheduling', () => {
  let token;
  let scheduleId;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'secret123'
      });
    token = loginResponse.body.token;
  });

  it('should create a waste collection schedule', async () => {
    const res = await request(app)
      .post('/api/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-07-01',
        time: '14:00'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    scheduleId = res.body.id; // Save the schedule ID for other tests
  });

  it('should retrieve waste collection schedules', async () => {
    const res = await request(app)
      .get('/api/schedules')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a waste collection schedule', async () => {
    const res = await request(app)
      .put(`/api/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-07-02',
        time: '15:00'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated successfully');
  });

  it('should delete a waste collection schedule', async () => {
    const res = await request(app)
      .delete(`/api/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('cancelled successfully');
  });
});
