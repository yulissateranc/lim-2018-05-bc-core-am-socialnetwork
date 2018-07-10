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
//***************************************funcion de registro de usuarios************************************************/
 register = () => {
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;
    console.log(email,password);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        verificar();
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
    }).catch(function(error){
        console.log(error);
    })
  
});
//Mostrando interfaz de Google a travez de Popup
document.getElementById("google").addEventListener("click", () =>{
const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
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

/*const verificar = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
        console.log('enviando correo');
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
};

const register = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            verificar();
        })
        .catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}
const ingreso = () => {
    const emailLogin = document.getElementById('email-login').value;
    const passwordLogin = document.getElementById('password-login').value;
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });

};
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
const cerrar = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo');
        })
        .catch((error) => {
            console.log(error);
        });
};

const aparece = (user) => {

    if (user.emailVerified) {
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;

    }
}*/