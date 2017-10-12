const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios')
const config = require('./frontend/config')

app.use(express.static('frontend/dist'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/auth', (req, res) => {
  axios
    .post(`https://github.com/login/oauth/access_token`, {
      client_id: config.Client_ID,
      client_secret: config.Client_Secret,
      code: req.query.code
    })
    .then(r => {
      console.log('ACCESS TOKEN')
      console.log(r.data)
      res.end(r.data.split('=')[1].split('&')[0])
    })
    .catch(e => {
      console.log(e.message)
      res.end(e)
    })
})

app.listen(8080)
