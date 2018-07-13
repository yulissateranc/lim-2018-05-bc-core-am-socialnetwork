const buttonRegister = document.getElementById('buttonLogin');
const posts = document.getElementById('posts');
const principal = document.getElementById('wrapper');
const contenido = document.getElementById('contenido');
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById("google");
observer();
buttonRegister.addEventListener('click', (e) => {
    register();
});
btnFacebook.addEventListener("click", () =>{
    initFacebook()
    });
btnGoogle.addEventListener("click", () =>{
    initGoogle()
})   


