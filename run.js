let dotenv = require('dotenv')
let nanopool = require('./src/nanopool')

dotenv.config({ path: './.env' })

console.log('Fetching nano pool data...')
nanopool.fetch()
