let dotenv = require('dotenv')

dotenv.config({path: './.env'})
process.env.NODE_ENV = 'test'

let tape = require('tape')
let fetchMock = require('fetch-mock')

let nanopool = require('../src/nanopool')
let npData = require('./nanopool-account-api-response.json')

tape('should fetch data', function (t) {
  fetchMock.get('*', npData)
  nanopool.fetch()
    .then(res => {
      t.equal(res, true, 'data stored')
      t.end()
    })
  fetchMock.restore()
})
