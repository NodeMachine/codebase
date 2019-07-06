/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Solution API', () => {
  describe('SRR', function() {
    this.timeout(7000)

    it('returns a 200 status', function(done) {
      request(app)
        .post('/api/solution/42EBZfNiypSOdrV4tzbU')
        .send({
          code: 'function increment(num){return num + 1}'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).to.be.equal(200)
          return done()
        })
    })

    it('returns an array of objects', async () => {
      const res = await request(app)
        .post('/api/solution/42EBZfNiypSOdrV4tzbU')
        .send({
          code: 'function increment(num){return num + 1}'
        })

      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.be.an('object')
    })
  })

  it('returns a pass/fail parameter', function(done) {
    this.timeout(7000)

    request(app)
      .post('/api/solution/42EBZfNiypSOdrV4tzbU')
      .send({
        code: 'function increment(num){return num + 1}'
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.body).to.be.an('array')
        expect(res.body[0].pass).to.be.an('boolean')
        expect(res.body[1].pass).to.be.an('boolean')
        return done()
      })
  })

  it('returns "bad code" if nonsensical code was entered.', function(done) {
    this.timeout(7000)

    request(app)
      .post('/api/solution/42EBZfNiypSOdrV4tzbU')
      .send({
        code: 'function increment(num){return gdagsfhsfh}'
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.be.equal('Bad code')
        return done()
      })
  })

  it('handles timeout and throws an error.', function(done) {
    this.timeout(7000)

    request(app)
      .post('/api/solution/42EBZfNiypSOdrV4tzbU')
      .send({
        code: 'function increment(num){ while(true){num + 1}}'
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.be.equal('Your solution timed out')
        return done()
      })
  })
}) // end describe('Solution API')
