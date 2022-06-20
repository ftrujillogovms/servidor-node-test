const express = require('express')
var fs = require('fs')
const multer = require('multer')
const router = express.Router()
const util = require('util')
const glob = require('glob')
var _ = require('underscore');
var path = require('path')
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb(null, file.originalname);
        }
    }
);

var upload = multer({ storage: storage });

router.route('/upload')
    .post(upload.single('file'), post);

function post(request, response) {

    response.json({ message: 'Files Uploaded!' });

}
const app = express()

app.use(express.json())


app.post('/file', upload.single('file') ,function (req, res) {


    const body = req.body
    const file = req.file
    const fl = req.fl
    const x = file['filename']
    console.log(file['filename'])

    res.send('file')


})






app.get('/' , function (req, res) {
    var filePath = "/uploads/DGA_2005_informe_gestion_2005.pdf";
    console.log(filePath)
    fs.readFile(__dirname + filePath, function (_err, data) {
        res.contentType("application/pdf");
        res.send(data);

    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log(PORT);
});

