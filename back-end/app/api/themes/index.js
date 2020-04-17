const { Router } = require('express')
const { Theme } = require('../../models')
var multer  = require('multer')
// var bodyParser = require('body-parser');

var upload = multer({ dest: 'app/storage/themeFiles' })

const router = new Router();

// router.use(bodyParser.json({ limit: '50mb' }));
// router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

router.post('/createTheme', upload.single('themeFile'), function (req, res, next) {
    console.log('uploaded a file')
    // req.file is the `themeImage` file
    const themeObject = req.body
    console.log('themeObject:', themeObject)
    // req.body will hold the text fields, if there were any

    console.log('req.file:    ', req.file)
    res.end()
  })

  module.exports = router