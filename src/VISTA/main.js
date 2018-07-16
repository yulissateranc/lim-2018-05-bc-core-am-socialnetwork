const buttonRegister = document.getElementById('button-register');
const buttonSesion = document.getElementById('button-sesion');
const posts = document.getElementById('posts');
const principal = document.getElementById('wrapper');
const contenido = document.getElementById('contenido');
<<<<<<< HEAD
const verificar = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
        console.log('enviando correo');
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
};


const cerrar = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo');
            contenido.style.display="none";
            principal.style.display="flex";

        })
        .catch((error) => {
            console.log(error);
        });
};

const aparece =() => {
        contenido.innerHTML = `
 
        class="w3-button w3-large w3-display-topright">&times;</span>
         `;
}


const observer = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            aparece(user);
            console.log('usuario existente');
            console.log('********************');
            console.log(user.emailVerified);
            console.log('********************');
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;


        } else {
            console.log('no existente usuario activo');
            // User is signed out.
            // ...
        }
    });
};
observer();

//***************************************funcion de registro de usuarios************************************************/
 register = () => {
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    console.log(email,password);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        verificar();
        aparece();
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
    }).catch(function(error){
        console.log(error);
    })
  
=======
const btnFacebook = document.getElementById("facebook");
const btnGoogle = document.getElementById('google');
const registro = document.getElementById('registro');
const sesion = document.getElementById('sesion');
const formRegistro = document.getElementById('form-registro');
const formSesion = document.getElementById('form-sesion');

    observer();
buttonRegister.addEventListener('click', (e) => {
    register();
>>>>>>> 036bb6a2f4939d7b273025d3064b69a12c8b5e60
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
    nuevaPagina("interfaz.html");
})