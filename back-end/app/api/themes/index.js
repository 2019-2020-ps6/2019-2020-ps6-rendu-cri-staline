const { Router } = require('express')
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const { Theme } = require('../../models')
const QuizzesRouter=require('./quizzes')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildTheme, buildThemes } = require('./manager')
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


router.post('/', upload.single('themeFile'), (req, res, next) => {
  console.log('req.body:', req.body)
  let themeObject =  req.body.themeObject;
  console.log(themeObject)
  if (req.file !== undefined) {
    themeObject = { ...JSON.parse(req.body.themeObject), themeImage: req.file.filename }
  }
  else{
    themeObject ={...req.body,themeImage:''};
  }
  console.log('req.file:', req.file)
  console.log('req.data:', req.data)
 
  console.log('themeObject',themeObject)
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


// edit route
router.put('/updateFile/:themeId', upload.single('themeFile'), (req, res) => {
  try {
    let themeObject = { ...JSON.parse(req.body.themeObject) }
    if (req.file.filename != undefined) {
      themeObject = { ...JSON.parse(req.body.themeObject), themeImage: req.file.filename }
    }
    const theme = Theme.update(req.body.themeId, themeObject)
    res.status(200).json(theme)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.put('/:themeId', (req, res) => {
  try {
    const themeObject = { ...req.body }
    const theme = Theme.update(req.params.themeId, themeObject)
    res.status(200).json(theme)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})



router.delete('/:themeId', (req, res) => {
  try {
    deleteQuizzesOfTheme(parseInt(req.params.themeId,10))
    Theme.delete(req.params.themeId)
    res.status(204).end()
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})


module.exports = router;
