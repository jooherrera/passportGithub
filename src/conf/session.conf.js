import session from 'express-session'
import MongoStore from 'connect-mongo'

export const sessionConf = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,
      }),

      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
    })
  )
}
