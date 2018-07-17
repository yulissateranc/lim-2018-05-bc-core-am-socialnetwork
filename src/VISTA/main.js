<<<<<<< HEAD
=======
const formContainer = document.getElementById('form-container');
const sectionRegister = document.getElementById('section-register');
const sectionLogin = document.getElementById('section-login');
const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');
const btnRegister = document.getElementById('button-register');
const btnLogin = document.getElementById('button-login');
const posts = document.getElementById('posts');
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById("google");
const btnLogout = document.getElementById('btn-logout')
const principal = document.getElementById('wrapper');
const welcome = document.getElementById('welcome');
const wallUser = document.getElementById('wall-user');
const btnPublish  = document.getElementById('btn-publish');
const btnReload = document.getElementById('btn-reload');
welcome.addEventListener('click',()=>{
    reloadPage();
});
 

window.onload = () => {
    observer();
}
btnRegister.addEventListener('click', (e) => {
    register();
});
btnFacebook.addEventListener("click", () =>{
    initFacebook()
    });
btnGoogle.addEventListener("click", () =>{
    initGoogle()
})   
btnLogout.addEventListener('click', () => {
    logOut();
});
sectionRegister.addEventListener('click', () => {
    formLogin.classList.add("hiden");
    formRegister.style.display = "block";
    sectionRegister.classList.remove("inactive");
    sectionRegister.classList.add("active");
    sectionLogin.classList.remove("active");
    sectionLogin.classList.add("inactive");
})
sectionLogin.addEventListener('click', () => {
    formSesion.style.display = "block";
    formRegister.classList.add("hiden");
    sectionRegister.classList.remove("active");
    sectionRegister.classList.add("inactive");
    sectionLogin.classList.remove("inactive");
    sectionLogin.classList.add("active");
})
btnLogin.addEventListener('click', () => {
    // nuevaPagina("interfaz.html");
})
btnLogout.addEventListener('click', () => {
    logOut();
})

btnPublish.addEventListener('click', () => {
   
})
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
    nuevaPagina("interfaz.html");
})
>>>>>>> Separacion del DOM en  main
