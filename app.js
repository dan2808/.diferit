const express = require('express')
const app = express()
const path = require('path')

var dateTime = new Date();

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.get('/', function(req, res) {
    // res.render('home');
});

app.listen(3000, () => console.log('Visit http://127.0.0.1:3000 Start time : '+ dateTime));
