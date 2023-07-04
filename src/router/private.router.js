import { Router } from 'express'
import { Mid } from '../middleware/index.js'

const router = Router()

router.get('/', Mid.auth, (req, res) => {
  const data = {
    user: req.session.user.first_name,
    edad: req.session.user.age,
  }
  res.render('private', data)
})

export default router
