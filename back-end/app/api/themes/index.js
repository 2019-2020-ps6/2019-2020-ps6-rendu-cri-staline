const { Router } = require('express')
const {Theme} = require('../../models')
const express = require('express')
 const multer = require('multer')
 var bodyParser = require('body-parser');
 var path = require('path')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildTheme, buildThemes } = require('./manager')
const {deleteQuizzesOfTheme}= require('../quizzes/manager')

const router = new Router()


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/storage/themeFiles')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
}) // how to get : e.g : http://localhost:9428/api/getThemeFile/abcd.png


 const upload = multer({ storage: storage })
 router.use(bodyParser.json({ limit: '50mb' }));
 router.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

 router.post('/createFile', upload.single('themeFile'), (req, res, next) => {
    console.log('req body:', req.body);
    let themeObject = {...JSON.parse(...req.body)}
    if(req.file!=undefined){
      themeObject = {...JSON.parse(...req.body), themeImage: req.file.filename}
    }
    console.log('req.file:', req.file);
    console.log('req.data:', req.data);

    const theme = Theme.create(themeObject)

    res.status(200).json(theme)
 }) 
 router.post('/', (req, res, next) => {
  let themeObject = {...req.body}
  if(req.file!=undefined){
    themeObject = {...req.body, themeImage: req.file.filename}
  }
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
  

  // edit route
  router.put('/updateFile/:themeId',upload.single('themeFile'), (req, res) => {
    try {
      let themeObject = {...JSON.parse(req.body.themeObject)}
      if(req.file.filename!=undefined){
        themeObject={...JSON.parse(req.body.themeObject), themeImage: req.file.filename}
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
      const themeObject={...req.body ,themeId:parseInt(req.body.themeId,10)}
      const theme = Theme.update(req.body.themeId,themeObject)
      res.status(200).json(theme)
    } catch (err) {
      console.log(err)
      manageAllErrors(res, err)
    }
  })

  router
  
  router.delete('/:themeId', (req, res) => {
    try {
      deleteQuizzesOfTheme(req.params.themeId);
      Theme.delete(req.params.themeId)
      res.status(204).end()
    } catch (err) {
      console.log(err);
      manageAllErrors(res, err)
    }
  })
  
  
module.exports = router
