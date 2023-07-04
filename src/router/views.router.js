import { Router } from 'express'

const router = Router()

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/failregister', (req, res) => {
  res.render('failRegister')
})

router.get('/faillogin', (req, res) => {
  res.render('failLogin')
})

export default router
