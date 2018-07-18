<<<<<<< HEAD
<<<<<<< HEAD
=======
const formContainer = document.getElementById('form-container');
const sectionRegister = document.getElementById('section-register');
const sectionLogin = document.getElementById('section-login');
const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');
const btnRegister = document.getElementById('button-register');
const btnLogin = document.getElementById('button-login');
=======
const buttonRegister = document.getElementById('button-register');
const buttonSesion = document.getElementById('button-sesion');
>>>>>>> Actualizando main, data, index e interfaz, añadiendo funcion resetPass
const posts = document.getElementById('posts');
const principal = document.getElementById('wrapper');
const contenido = document.getElementById('contenido');
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById('google');
const registro = document.getElementById('registro');
const sesion = document.getElementById('sesion');
const formRegistro = document.getElementById('form-registro');
const formSesion = document.getElementById('form-sesion');

observer();

buttonRegister.addEventListener('click', (e) => {
    register();
});
btnFacebook.addEventListener('click', () => {
    initFacebook()
});
btnGoogle.addEventListener('click', () => {
    initGoogle()
})
registro.addEventListener('click', () => {
    formSesion.style.display = "none";
    formRegistro.style.display = "block";
    registro.classList.remove("inactive");
    registro.classList.add("active");
    sesion.classList.remove("active");
    sesion.classList.add("inactive");
})
sesion.addEventListener('click', () => {
    formSesion.style.display = "block";
    formRegistro.style.display = "none";
    sesion.classList.remove("inactive");
    sesion.classList.add("active");
    registro.classList.remove("active");
    registro.classList.add("inactive");
})
buttonSesion.addEventListener('click', () => {
    ingreso();
})

document.getElementById('forgot-passw').addEventListener('click', () => {
    recoverPass();
})


document.getElementById('cerrar-sesion').addEventListener('click', () => {
    cerrar();
})
<<<<<<< HEAD
>>>>>>> Separacion del DOM en  main
=======

let contador = 1;
document.getElementById('menu').addEventListener('click', () => {

    if (contador == 1) {
        document.getElementById('contenido').style.display = "block";
        contador = 0;
    } else {
        contador = 1;
        document.getElementById('contenido').style.display = "none";
    }
})


>>>>>>> Actualizando main, data, index e interfaz, añadiendo funcion resetPass
