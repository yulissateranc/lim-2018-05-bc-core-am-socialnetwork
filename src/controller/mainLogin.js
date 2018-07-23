const buttonRegister = document.getElementById('button-register');
const email = document.getElementById('email');
const nameUser = document.getElementById('nombre');
const password = document.getElementById('password');
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById('google');
const registro = document.getElementById('registro');


const buttonSesion = document.getElementById('button-sesion');
// const posts = document.getElementById('posts');
// const principal = document.getElementById('wrapper');
// const contenido = document.getElementById('contenido');

const sesion = document.getElementById('sesion');
const formRegistro = document.getElementById('form-registro');
const formSesion = document.getElementById('form-sesion');




window.onload = ()=>{
    getDataUserSessionActive();
};
buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    validatorEmailAndPassword(email.value, password.value, nameUser.value)
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


const recoverPass = () => {
    const auth = firebase.auth();
    const emailAddress = document.getElementById('correo-sesion').value;

    auth.sendPasswordResetEmail(emailAddress)
        .then((result) => {
            alert('SE HA ENVIADO UN CORREO A SU CUENTA. SIGA LOS PASOS');
        }).catch(function (error) {
            console.log(error);
        })
};

buttonSesion.addEventListener('click', () => {
    const emailLogin = document.getElementById('correo-sesion');
const passwordLogin = document.getElementById('password-sesion');
    initSessionFirebase(emailLogin,passwordLogin);
});

document.getElementById('forgot-passw').addEventListener('click', () => {
    recoverPass();
});


// document.getElementById('cerrar-sesion').addEventListener('click', () => {
//     cerrar();
// });