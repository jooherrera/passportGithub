import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    //SI NO HAY ERROR DURANTE LA ELIMINACION DE LA SESSION
    if (err) {
      return res.send('Logout ERROR')
    }

    res.redirect('/login')
  })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
  //GUARDAMOS DATOS EN LA COOKIE DE LA SESSION
  req.session.user = {
    age: req.user.age,
    first_name: req.user.first_name,
  }

  //ESPERAMOS A QUE GUARDE LA SESSION Y REDIRIGIMOS A LA VISTA PRIVADA
  req.session.save(() => {
    console.log('Cookie guardada')
    res.redirect('/private')
  })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
  //SI FALLO AL CREAL EL USUARIO POR LAS DUDAS CHECKEAMOS DE NUEVO
  if (!req.user) return res.redirect('/failregister')
  //REDIRECT A LOGIN
  res.redirect('/login')
})

// ABRE EL LOGIN DE GITHUB
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {})

// RESULTADO... SI FALLA VA A /LOGIN  ... SI ESTA BIEN VA A /PRIVATE
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
  req.session.user = req.user
  req.session.save(() => {
    res.redirect('/private')
  })
})

export default router
