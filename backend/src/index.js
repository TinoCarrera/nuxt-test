const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');

require('./database');

app.use(cors());

app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})