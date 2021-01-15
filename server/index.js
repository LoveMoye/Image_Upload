const express = require("express");
const app = express();
const port = 3001;
const multer = require('multer'); // parsing form data
const storage = multer.diskStorage(
    {
        destination: 'C:/Users/chowonjae/Desktop/WEB STUDY/Web/JavaScript/ImageControl/server/uploads', 
        filename: function(req, file, cb) {
            let name = file.originalname.split('.');
            cb(null, name[0] + "_" + Date.now() + "." + name[1])
        }
    });
const upload = multer({storage:storage}); 
const cors = require('cors'); // cors 허용

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200  // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'jsexx1226',
    database:'catinfo'
})
connection.connect();

app.get('/api', (req, res) => {
    connection.query('SELECT * FROM cat', (err, results, field) => {
        if (err) throw err;

        var results = JSON.parse(JSON.stringify(results));
        console.log(results);
        res.send(results)
    })
})

app.post('/api', upload.array('image'), cors(corsOptions), (req, res) => {
    let data = req.files;
    // connection.query(`INSERT INTO cat (title desc image)
    //                 VALUES ('test', 'test...', ${data[0].buffer.toString('hex')})`, (err, results, field) => {
    //                     if (err) throw err;
    //                 });
    console.log(data[0]);
    res.send('Success')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})