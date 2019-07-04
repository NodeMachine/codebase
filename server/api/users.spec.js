/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
//const db = require('../db');
const {db, auth} = require('../db/queryFunctions/index')
const {deleteUser} = require('../db/queryFunctions/userQueryFunctions')
const app = require('../index')
// const User = db.model('user');

describe('User routes', () => {
  // needs to be fixed to handle route protections
  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)
      // expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/users')

  it('POST /api/users/signup', async () => {
    const randomNum = Math.floor(Math.random() * 500)
    const userCredentials = {
      firstName: 'Blob',
      lastName: 'Bloberson',
      email: `email${randomNum}@email.com`,
      password: 'yY@74Cd5#PMQ',
      isCompany: false
    }

    const res = await request(app)
      .post('/api/users/signup')
      .send(userCredentials)
    expect(res.statusCode).to.equal(201)
    deleteUser(res.body.id)
  })

  it('PUT /api/users/login', async () => {
    const userCredentials = {
      email: 'email20@email.com',
      password: 'yY@74Cd5#PMQ'
    }

    //login the user before we run any tests
    const authenticatedUser = request.agent(app)

    const res = await authenticatedUser
      .put('/api/users/login')
      .send(userCredentials)
    expect(res.statusCode).to.equal(200)
  })

  it('DELETE /api/users/logout', async () => {
    const res = await request(app).delete('/api/users/logout')
    expect(res.statusCode).to.equal(204)
  })
}) // end describe('User routes')
