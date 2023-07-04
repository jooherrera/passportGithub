import mongoose from 'mongoose'

export const mongoConf = (uri) => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conectado a MongoDB')
    })
    .catch((error) => {
      console.error('Error al conectar', error)
    })
}
