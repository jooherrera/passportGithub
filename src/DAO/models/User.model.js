import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  first_name: {
    type: String,
    default: '',
  },
  last_name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    default: '',
  },
})

//ANTES DE GUARDAR ENCRIPTA EL PASSWORD
userSchema.pre('save', async function (next) {
  try {
    if (this.password === '') return next()
    const hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

//METODO PARA COMPARAR LAS CONTRASEÑAS
userSchema.methods.comparePassword = function (hashedPassword) {
  return bcrypt.compareSync(hashedPassword, this.password)
}

export default model('User', userSchema)
