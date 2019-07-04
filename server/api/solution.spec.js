/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const path = require('path')

describe('Solution API', () => {
  describe('SRR', () => {
    it('returns a string', async () => {
      const url = `file:${path.join(__dirname, 'testingEnviroment.html')}`
      const ssr = ssr(url, 'nothing', '')
      expect(ssr).to.be.equal('')
    })
  })
}) // end describe('Solution API')
