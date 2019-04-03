import _ from 'lodash'
import bodyParser from 'body-parser'
import compression from 'compression'
import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { log } from './utils/Log'
import { helpers } from './views/helpers/helpers'
import exphbs from 'express-handlebars'
import favicon from 'serve-favicon'
import path from 'path'

import User from './User/User'

// ROUTES

import GET_Banner from './Routes/GET_Banner'
import GET_Banners from './Routes/GET_Banners'
import POST_Banner from './Routes/POST_Banner'
import GET_Marsupial from './Routes/GET_Marsupial'
import GET_Editor from './Routes/GET_Editor'
import GET_Presets from './Routes/GET_Presets'
import POST_Preset from './Routes/POST_Preset'
import GET_Preset from './Routes/GET_Preset'
import DELETE_Preset from './Routes/DELETE_Preset'
import GET_Documentation from './Routes/GET_Documentation'
import { GET_Login, POST_Login } from './Routes/LOGIN'
import PURGE from './Routes/PURGE'

import API_GET_Banners from './Routes/api/GET_Banners'
import API_GET_Banner from './Routes/api/GET_Banner'
import API_GET_Presets from './Routes/api/GET_Presets'
import API_GET_Preset from './Routes/api/GET_Preset'
import API_GET_Components from './Routes/api/GET_Components'
import API_GET_Terms from './Routes/api/GET_Terms'

const app = express()

app.use(favicon(path.join(__dirname + '/../public/favicon.ico')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use(compression())
app.use(express.static('./'));

const hbs = exphbs.create({
  defaultLayout: process.cwd() + '/src/views/layouts/main',
  helpers: helpers,
  partialsDir: [
    'src/views/partials/'
  ]
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', process.cwd() + '/src/views')

app.use((req, res, next) => { // Execute on every route hit
  let u = new User()
  log('Router Exec: ' + req.originalUrl, Date.now())
  next()
}, (req, res, next) => {

  const loggedIn = true

  if(req.originalUrl == '/login' || req.originalUrl == '/favicon.ico'){

    next()
  }
  else if(loggedIn) {
    next()
  }
  else {
    res.redirect('/login')
  }

})

app.use((err, req, res, next) => {
  res.status(500).send('Something broke');
})


app.get('/login', (req, res) => { GET_Login(req, res) })
app.post('/login', (req, res) => { POST_Login(req, res) })

app.get('/marsupial', (req, res) => { GET_Marsupial(req, res) })

app.get('/', (req, res) => { res.redirect('/presets') })
app.get('/banner/:bid?', (req, res) => { GET_Banner(req, res) })
app.post('/banner/:bid?', (req, res) => { POST_Banner(req, res) })
app.get('/banners', (req, res) => { GET_Banners(req, res) })

app.get('/editor/:bid?', (req, res) => { GET_Editor(req, res) })
app.get('/presets', (req, res) => { GET_Presets(req, res) })
app.post('/preset', (req, res) => { POST_Preset(req, res) })
app.delete('/preset/:pid?', (req, res) => { DELETE_Preset(req, res) })
app.get('/preset/:pid?', (req, res) => { GET_Preset(req, res) })
app.get('/purge', (req, res) => { PURGE(req, res) })
app.get('/documentation', (req, res) => { GET_Documentation(req, res) })
//app.post('/banner/:bid?', (req, res) => { POST_Banner(req, res) })

// API

app.get('/api/v1/banners', (req, res) => { API_GET_Banners(req, res) })
app.get('/api/v1/banners/:bid', (req, res) => { API_GET_Banner(req, res) })
app.get('/api/v1/presets', (req, res) => { API_GET_Presets(req, res) })
app.get('/api/v1/presets/:pid', (req, res) => { API_GET_Preset(req, res) })
app.get('/api/v1/components', (req, res) => { API_GET_Components(req, res) })
app.get('/api/v1/terms', (req, res) => { API_GET_Terms(req, res) })

app.listen(process.env.PORT, () => {

  log('App listening on port ' + process.env.PORT)
  log('File Server running on port ' + process.env.FILESERVER_PORT)

})
