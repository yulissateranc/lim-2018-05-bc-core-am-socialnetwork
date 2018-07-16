const buttonRegister = document.getElementById('button-register');
const buttonSesion = document.getElementById('button-sesion');
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

//***************************************funcion de registro de usuarios************************************************/
 register = () => {
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    console.log(email,password);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        //verificar();
        aparece();
        principal.style.display="none";
        contenido.style.display="block";
    }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let  errorMessage = error.message;
    console.log(errorCode,errorMessage);
    errorCode='La dirección de correo electrónico está mal formada.';
    errorMessage='La contraseña debe tener una longitud de 6 caracteres o más .';
    document.getElementById("msjValidation1").innerHTML =errorMessage;
    document.getElementById("msjValidation2").innerHTML =errorCode;
     
    // ...
  });
}
//******evento que desencadena funciones************************************************/
 initEvents = () => {
    const buttonLogin1 = document.getElementById('buttonLogin');
    buttonLogin1.addEventListener('click', (e) => {
        register();
    });
};
//*******************************************invocando****************************************************************** */
initEvents();

//Mostrando interfaz de Facebook a travez de Popup
document.getElementById("facebook").addEventListener("click", () =>{
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
        console.log(result);
        aparece();
        principal.style.display="none";
        contenido.style.display="block";
    }).catch(function(error){
        console.log(error);
    })
  
});
//Mostrando interfaz de Google a travez de Popup
document.getElementById("google").addEventListener("click", () =>{
const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        aparece();
        principal.style.display="none";
        contenido.style.display="block";
    }).catch(function(error){
        console.log(error);
    })
})
/* Forgot Password
document.getElementById("forgotPassw").addEventListener("click", () => {
    var auth = firebase.auth();
var emailAddress = "user@example.com";
auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
btnFacebook.addEventListener('click', () => {
    initFacebook()
});
btnGoogle.addEventListener('click', () => {
    initGoogle()
<<<<<<< HEAD
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
=======
})   


*/

>>>>>>> ca807d1fcbf43381fe3b5c57fbc22fc10158641c
