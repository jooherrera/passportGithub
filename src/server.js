import express from 'express'

import authRouter from './router/auth.router.js'
import privateRouter from './router/private.router.js'
import viewsRouter from './router/views.router.js'

import { handlebars } from './conf/handlebars.conf.js'
import { sessionConf } from './conf/session.conf.js'
import { mongoConf } from './conf/mongodb.conf.js'
import { initializePassport } from './conf/passport.conf.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

handlebars(app) //CONF DE HANDLEBARS
sessionConf(app) //CONF DE SESSIONS
initializePassport(app) //VA DESPUES DE SESSION- CONF DE PASSPORT
//CONEXION A MONGODB PARA LOS PRODUCTOS, CARRITOS...
mongoConf('')

app.use('/', viewsRouter) //VISTAS
app.use('/api/auth', authRouter) // ROUTER PARA AUTH
app.use('/private', privateRouter) // ROUTER PARA LA PARTE PRIVADA

app.listen(8080, () => console.log('Server on port 8080'))
