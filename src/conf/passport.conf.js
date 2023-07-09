import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import UserModel from '../DAO/models/User.model.js' // DEBERIA SER UN SERVICIO

const LocalStrategy = local.Strategy

export const initializePassport = (app) => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, email, password, done) => {
        try {
          let user = await UserModel.findOne({ email })
          if (user) {
            console.log('User already exists')
            return done(null, false)
          }
          //SI NECESITAMOS ALGO EXTRA QUE NO VIENE POR BODY LO AGREGAMOS ACA
          // const newUser = {
          //   username: uname,
          //   password: pass,
          //   edad,
          //   email,
          // }
          const result = await UserModel.create(req.body)
          return done(null, result)
        } catch (error) {
          return done('Error al obtener el usuario: ' + error)
        }
      }
    )
  )
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
        if (!user) {
          console.log('Usuario no existe')
          return done(null, false)
        }
        //COMPARAMOS LAS CONTRASEÑAS
        const isMatch = user.comparePassword(password)
        if (!isMatch) return done(null, false)
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    })
  )

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('👨‍💻 %c ~ file: passport.conf.js:64 ~ profile:', 'font-weight: bold;\n', profile)
          if (!profile._json.email) throw 'El usuario no tiene un email asociado en github'

          let user = await UserModel.findOne({ email: profile._json.email })
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              email: profile._json.email,
            }
            let result = await UserModel.create(newUser)
            done(null, result)
          } else {
            done(null, user)
          }
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id)
    done(null, user)
  })

  app.use(passport.initialize())
  app.use(passport.session())
}
