const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.send('Hello world!')
})

app.listen(3000, () => {
  console.log(`> I'm listening (:`)
  console.log('> http://localhost:3000')
})
