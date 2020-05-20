const { Router } = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const { Theme } = require('../../models')
const QuizzesRouter = require('./quizzes')
const manageAllErrors = require('../../utils/routes/error-management')
const { deleteQuizzesOfTheme } = require('./quizzes/manager')

const router = new Router()

router.use('/:themeId/quizzes', QuizzesRouter)


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'app/storage/themeFiles')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  },
}) // how to get : e.g : http://localhost:9428/api/getThemeFile/abcd.png


const upload = multer({ storage })
router.use(bodyParser.json({ limit: '50mb' }))
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


router.post('/', upload.single('themeFile'), (req, res) => {
  let { themeObject } = req.body
  if (req.file !== undefined) {
    themeObject = { themeName: req.body.themeName, themeImage: req.file.filename }
  } else {
    themeObject = { themeName: req.body.themeName, themeImage: '' }
  }
  const theme = Theme.create(themeObject)
  res.status(200).json(theme)
})


router.get('/', (req, res) => {
  try {
    res.status(200).json(Theme.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:themeId', (req, res) => {
  try {
    const theme = Theme.getById(req.params.themeId)
    res.status(200).json(theme)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


// edit route
router.put('/:themeId', upload.single('themeFile'), (req, res) => {
  try {
    let { themeObject } = req.body

    if (req.file !== undefined) {
      themeObject = { themeName: req.body.themeName, themeImage: req.file.filename }
    } else {
      themeObject = { themeName: req.body.themeName, themeImage: '' }
    }
    const theme = Theme.update(req.params.themeId, themeObject)
    res.status(200).json(theme)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:themeId', (req, res) => {
  try {
    const themeObject = { ...req.body }
    const theme = Theme.update(req.params.themeId, themeObject)
    res.status(200).json(theme)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.delete('/:themeId', (req, res) => {
  try {
    deleteQuizzesOfTheme(parseInt(req.params.themeId, 10))
    Theme.delete(req.params.themeId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
