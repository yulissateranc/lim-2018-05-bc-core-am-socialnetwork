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
    errorCode='La dirección de correo electrónico está mal formateada.';
    errorMessage='La contraseña debe tener una longitud de 6 caracteres o más.validaction1';
    document.getElementById("msjValidation1").innerHTML =errorMessage;
    document.getElementById("msjValidation2").innerHTML =erroCode;
     
    // ...
  });
    
}

//**************************************evento que desencadena funciones************************************************/
 initEvents = () => {
    const buttonLogin1 = document.getElementById('buttonLogin');
    buttonLogin1.addEventListener('click', (e) => {
        register();
    });
};
//*******************************************invocando****************************************************************** */
initEvents();
