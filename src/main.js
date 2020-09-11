
const express = require('express')
const app = express()
const { log } = require('./modules/log/log');

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => log(`Example app listening on port ${port}!`))
