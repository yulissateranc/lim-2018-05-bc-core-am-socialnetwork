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
const containerViews = document.getElementById('container-views');
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

sectionLogin.addEventListener('click', () => {
    formLogin.classList.remove("hiden");
    formRegister.classList.add("hiden");
    sectionRegister.classList.remove("active");
    sectionRegister.classList.add("inactive");
    sectionLogin.classList.remove("inactive");
    sectionLogin.classList.add("active");
})
sectionRegister.addEventListener('click', () => {
    formLogin.classList.add("hiden");
    formRegister.classList.remove("hiden");
    sectionRegister.classList.remove("inactive");
    sectionRegister.classList.add("active");
    sectionLogin.classList.remove("active");
    sectionLogin.classList.add("inactive");
})


btnLogin.addEventListener('click', () => {
    // nuevaPagina("interfaz.html");
})
// btnLogout.addEventListener('click', () => {
//     logOut();
// })

// btnPublish.addEventListener('click', () => {
   
// })
