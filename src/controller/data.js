
//*****************************************Create / Edite/ Remove  de los Post*****************************************************************+/
// createPost = () => {
//     alert('soy la funcion que creará el Post');
//     firebase.database().ref().child('postprueba');
// }

// editPost = () => { }
// deletePost = () => { }

// let btnPublicPost = document.getElementById('btn-public-post');
// btnPublicPost.addEventListener("click", () => {
//     alert('soy el boton que creara el post');
// });



/*********************************************Observar y detectar si hay un usuario registrado**********************************************/
const nuevaPagina = (url) => {
    window.location = (url);

}





const observer = () => { //sugerencia userStateExists();//estado de usuario si existe o  es nuevo
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('usuario existente');
            console.log(user.emailVerified);
            let displayName = user.displayName;
            let email = user.email;
            let emailVerified = user.emailVerified;
            let photoURL = user.photoURL;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let providerData = user.providerData;
            console.log(displayName);
        } else {
            console.log('no existente usuario activo');
        }
    });
};
//*************************************************funcion de registro de usuarios************************************************/
//*************************************************Registro ordinario de un usuario************************************************/

const register = () => {  //registerUserUsual();registro común de usario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            verificar();
            console.log(result);
            userProfile(result);
            alert('TE LOGEASTE  ,AHORA VERAS EL MURO HTML');
            nuevaPagina('../src/view/muro.html');

        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            errorCode = 'La dirección de correo electrónico está mal formada.';
            errorMessage = 'La contraseña debe tener una longitud de 6 caracteres o más .';
            document.getElementById("msjValidation1").style.display = "block"; document.getElementById("msjValidation1").innerHTML = errorMessage;

            document.getElementById("msjValidation2").style.display = "block"; document.getElementById("msjValidation2").innerHTML = errorCode;
        });
}

/***********************************************************Mostrando interfaz de Facebook a travez de Popup*********************************/
/***********************************************************Registrandose con Facebook*********************************/

const initFacebook = () => { //registerUserFacebook()
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
        // principal.style.display = "none";
        // userProfile(result);
        alert('TE LOGEASTE CON FACEBOOK MUY BIEN ,AHORA VERAS EL MURO HTML');
        nuevaPagina('../src/view/muro.html');
       

    }).catch(function (error) {
        console.log(error);
    })
}

/************************************************************Mostrando interfaz de Google a travez de Popup********************************/
/************************************************************Registrandose con Google********************************/

const initGoogle = () => {//registerUserGoole()
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
        userProfile(result);
        alert('TE LOGEASTE CON gmail MUY BIEN ,AHORA VERAS EL MURO HTML');
        nuevaPagina('../src/view/muro.html');

    }).catch(function (error) {
        console.log(error);
    })
}
/************************************************************Enviar correo de confirmación****************************************************************************/
const verificar = () => {//dispatchEmailVerify()
    var actionCodeSettings = {
        url: 'https://jossielinn.github.io/Red-Social/src/VISTA/interfaz.html',// + firebase.auth().currentUser.email
        handleCodeInApp: false
    };
    const user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification(actionCodeSettings).then(() => {
        console.log('enviando correo');
    }).catch(function (error) {
        console.log(error);
    });
};
/************************************************************Cierra sesión  de usuario****************************************************************************/
const cerrar = () => {// SignOffUser();
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo');
            contenido.style.display = "none";
            principal.style.display = "flex";
        })
        .catch((error) => {
            console.log(error);
        });
};
/********************************************************Muestra Mensaje de Bienvenida  *************************************************************************/

const userProfile = (objectUser) => {//viewMessageWelcomeUser()  //viewModalWelcomeUser()    //viewProfileUser();
    if (objectUser.additionalUserInfo.isNewUser != false) {
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;
    } else {
        contenido.style.display = "none";
        console.log('usuario antiguo');
    }

}

/********************************************************Recuperar o Cambiar Contraseña  mediante envio de Correo *************************************************************************/

const recoverPass = () => {//recoveryPassWithSendEmail()
    const auth = firebase.auth();
    const emailAddress = document.getElementById('correo-sesion').value;

    auth.sendPasswordResetEmail(emailAddress)
        .then((result) => {
            alert('SE HA ENVIADO UN CORREO A SU CUENTA. SIGA LOS PASOS');
        }).catch(function (error) {
            console.log(error);
        })
}

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

const ingreso = () => {
    const emailLogin = document.getElementById('correo-sesion').value;
    const passwordLogin = document.getElementById('password-sesion').value;
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).then(() => {
        nuevaPagina("interfaz.html");
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
};

// createNewPost = (userId, description) => {
//     let objPost = {
//         userId: userId,
//         description: description
//     }
//     let newPostKey = firebase.database().ref().child('posts').push().key;
//     let portable = {};
//     portable['/posts/' + newPostKey] = objPost;
//     portable['/user-posts/' + userId + '/' + newPostKey] = objPost;
//     firebase.database().ref().update(portable);
//     return newPostKey;
// };

// subtmiPostDateInput(){ }

