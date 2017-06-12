let fetch = require('node-fetch')
let db = require('./database')
let _ = require('lodash')

let nanopool = {
  fetch: () => {
    return fetch(process.env.NANO_POOL_API_URL + process.env.NANO_POOL_ACCOUNT)
      .then(res => {
        return res.json()
      })
      .then(res => {
        return nanopool
          .storeWorkers(res.data.workers, error => {
            if (error) {
              console.log('failed to store data', res)
            }
            console.log('data stored')
            return res
          })
      })
  },
  storeWorkers: (workers, callback) => {
    let multi = db.multi()
    _.forEach(workers, worker => {
      let workerData = _.pickBy(worker, (value, key) => {
        return key !== 'id'
      })
      let key = `worker:${worker.id}`
      let unixTime = Math.floor(new Date() / 1000)
      let storeData = {}
      storeData[unixTime] = workerData
      multi.sadd(key, JSON.stringify(storeData))
      multi.sadd('workers', worker.id)
    })
    return multi.exec(callback)
  },
}

module.exports = nanopool

