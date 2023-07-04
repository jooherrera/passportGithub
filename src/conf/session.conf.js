import session from 'express-session'
import MongoStore from 'connect-mongo'

export const sessionConf = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: '',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,
      }),

      secret: 'secretCoder',
      resave: true,
      saveUninitialized: false,
    })
  )
}
