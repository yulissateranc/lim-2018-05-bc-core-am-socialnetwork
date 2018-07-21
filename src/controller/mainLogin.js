const buttonRegister = document.getElementById('button-register');
const email = document.getElementById('email');
const nameUser = document.getElementById('nombre');
const password = document.getElementById('password');
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById('google');
const registro = document.getElementById('registro');

// const buttonRegister = document.getElementById('button-register');
// const buttonSesion = document.getElementById('button-sesion');
// const posts = document.getElementById('posts');
// const principal = document.getElementById('wrapper');
// const contenido = document.getElementById('contenido');
// const btnFacebook = document.getElementById("facebook");
// const btnGoogle = document.getElementById('google');
// const registro = document.getElementById('registro');
// const sesion = document.getElementById('sesion');
 const formRegistro = document.getElementById('form-registro');
 const formSesion = document.getElementById('form-sesion');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const nameUser = document.getElementById('nombre');

buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    validatorEmailAndPassword(email.value, password.value, name.value)
});
btnFacebook.addEventListener('click', () => {
    registerUserFacebook();
    
});
btnGoogle.addEventListener('click', () => {
    registerUserGmail();
});

registro.addEventListener('click', () => {
    formSesion.style.display = "none";
    formRegistro.style.display = "block";
    registro.classList.remove("inactive");
    registro.classList.add("active");
    sesion.classList.remove("active");
    sesion.classList.add("inactive");
});
sesion.addEventListener('click', () => {
    formSesion.style.display = "block";
    formRegistro.style.display = "none";
    sesion.classList.remove("inactive");
    sesion.classList.add("active");
    registro.classList.remove("active");
    registro.classList.add("inactive");
});

