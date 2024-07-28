const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

beforeEach(() => {
  items.length = 0;
  items.push({ name: 'popsicle', price: 1.45 });
});

afterEach(() => {
  items.length = 0;
});

describe('GET /items', () => {
  test('Get all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: 'popsicle', price: 1.45 }]);
  });
});

describe('POST /items', () => {
  test('Add new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'cheerios', price: 3.4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: 'cheerios', price: 3.4 } });
  });
});

describe('GET /items/:name', () => {
  test('Get item by name', async () => {
    const res = await request(app).get('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: 'popsicle', price: 1.45 });
  });

  test('Responds with 404 if item not found', async () => {
    const res = await request(app).get('/items/notfound');
    expect(res.statusCode).toBe(404);
  });
});

describe('PATCH /items/:name', () => {
  test('Update item', async () => {
    const res = await request(app)
      .patch('/items/popsicle')
      .send({ name: 'new popsicle', price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: 'new popsicle', price: 2.45 } });
  });

  test('Responds with 404 if item not found', async () => {
    const res = await request(app).patch('/items/notfound').send({ name: 'new popsicle', price: 2.45 });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /items/:name', () => {
  test('Delete item', async () => {
    const res = await request(app).delete('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });

  test('Responds with 404 if item not found', async () => {
    const res = await request(app).delete('/items/notfound');
    expect(res.statusCode).toBe(404);
  });
});
