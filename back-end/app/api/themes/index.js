const { Router } = require('express')
const {Theme} = require('../../models')
 const multer = require('multer')
 var bodyParser = require('body-parser');
const manageAllErrors = require('../../utils/routes/error-management')
const { buildTheme, buildThemes } = require('./manager')
const router = new Router()



 const upload = multer({ dest: 'app/storage/themeFiles' })
 router.use(bodyParser.json({ limit: '50mb' }));
 router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

 router.post('/createTheme', upload.single('themeFile'), (req, res, next) => {
    console.log('req body:', req.body);
    const themeObject = {...JSON.parse(req.body.themeObject), themeImage: req.file.path}
    console.log('req.file:', req.file);
    console.log('req.data:', req.data);

    const theme = Theme.create(themeObject)

    res.status(200).json(theme)
 }) 
router.get('/', (req, res) => {
    try {
      res.status(200).json(buildThemes())
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.get('/:themeId', (req, res) => {
    try {
      const theme = buildTheme(req.params.themeId)
      res.status(200).json(theme)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const theme = Theme.create({ ...req.body })
      res.status(201).json(theme)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.put('/:themeId', (req, res) => {
    try {
      res.status(200).json(Theme.update(req.params.themeId, req.body))
    } catch (err) {
      console.log(err)
      manageAllErrors(res, err)
    }
  })
  
  router.delete('/:themeId', (req, res) => {
    try {
      Theme.delete(req.params.themeId)
      res.status(204).end()
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
module.exports = router
