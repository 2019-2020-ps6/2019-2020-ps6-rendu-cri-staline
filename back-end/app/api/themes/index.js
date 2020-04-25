const { Router } = require('express')
const multer = require('multer')
// var bodyParser = require('body-parser');

const upload = multer({ dest: 'app/storage/themeFiles' })

const router = new Router()

// router.use(bodyParser.json({ limit: '50mb' }));
// router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

router.post('/createTheme', upload.single('themeFile'), (req, res, next) => {

})

module.exports = router
