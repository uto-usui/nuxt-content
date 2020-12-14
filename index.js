const express = require('express')
const app = express()
const basicAuth = require('basic-auth-connect')

app.set('port', process.env.PORT || 5000)
app.use(
  basicAuth(
    process.env.BASIC_ID || 'id',
    process.env.BASIC_PASSWORD || 'password',
  ),
)
app.use('/', express.static(__dirname + '/public'))
app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'))
})
