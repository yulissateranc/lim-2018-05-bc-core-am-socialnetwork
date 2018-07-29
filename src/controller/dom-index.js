

const buttonRegister = document.getElementById('button-register');
const email = document.getElementById('email');
const nameUser = document.getElementById('name');
const password = document.getElementById('password');
const btnFacebook = document.getElementById('facebook');
const btnGoogle = document.getElementById('google');
const registro = document.getElementById('registro');
const buttonSesion = document.getElementById('button-session');
const sesion = document.getElementById('sesion');
const formRegistro = document.getElementById('form-registro');
const formSesion = document.getElementById('form-sesion');
const formFooter = document.getElementById('form-footer');
registro.addEventListener('click', () => {
  formSesion.style.display = 'none';
  formRegistro.style.display = 'block';
  formFooter.style.display = 'none';
  registro.classList.remove('inactive');
  registro.classList.add('active');
  sesion.classList.remove('active');
  sesion.classList.add('inactive');
});

sesion.addEventListener('click', () => {
  formSesion.style.display = 'block';
  formRegistro.style.display = 'none';
  formFooter.style.display = 'block';
  sesion.classList.remove('inactive');
  sesion.classList.add('active');
  registro.classList.remove('active');
  registro.classList.add('inactive');
});
window.onload = () => {
  window.getDataUserSessionActiveLogin();
  let modal = document.getElementById('mi-modal');
  modal.classList.remove('modalView');
};

buttonRegister.addEventListener('click', (event) => {
  event.preventDefault();
  window.validatorFormRegister(email.value, password.value, nameUser.value);
});

btnFacebook.addEventListener('click', () => {
  window.registerUserFacebook();
});
btnGoogle.addEventListener('click', () => {
  window.registerUserGmail();
});
buttonSesion.addEventListener('click', () => {
  const emailLogin = document.getElementById('email-session');
  const passwordLogin = document.getElementById('password-session');
  window.initSessionFirebase(emailLogin, passwordLogin);
});

document.getElementById('forgot-passw').addEventListener('click', () => {
  window.recoverPassword();
});
