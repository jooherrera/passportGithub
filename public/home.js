const btnRegister = document.getElementById('register')
const btnLogin = document.getElementById('login')
const btnPerfil = document.getElementById('perfil')

btnRegister.addEventListener('click', (e) => {
  window.location.href = '/register'
})

btnLogin.addEventListener('click', (e) => {
  window.location.href = '/login'
})

btnPerfil.addEventListener('click', (e) => {
  window.location.href = '/private'
})
