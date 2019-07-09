/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
//const db = require('../db');
const {db, auth} = require('../db/queryFunctions/index')
const {deleteUser} = require('../db/queryFunctions/userQueryFunctions')
const app = require('../index')
// const User = db.model('user');

describe('Problem routes', () => {
  // needs to be fixed to handle route protections
  describe('/api/problems/', () => {
    it('GET /api/problems', async () => {
      const res = await request(app)
        .get('/api/problems')
        .expect(200)
      // expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/users')

  it('GET /api/problems/:problemId', async () => {
    const res = await request(app)
      .get('/api/problems/42EBZfNiypSOdrV4tzbU')
      .expect(200)
    // expect(res.body).to.be.an('array')
  })
}) // end describe('/api/users')
