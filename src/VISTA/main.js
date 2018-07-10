//***************************************funcion de registro de usuarios************************************************/
 register = () => {
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    console.log(email,password);
    
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    }).catch(function(error){
        console.log(error);
    })
  
});
//Mostrando interfaz de Google a travez de Popup
document.getElementById("google").addEventListener("click", () =>{
const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
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
})*/
