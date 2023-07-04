import { engine } from 'express-handlebars'

export const handlebars = (app) => {
  app.engine('handlebars', engine())
  app.set('view engine', 'handlebars')
  app.set('views', './src/views')
}
