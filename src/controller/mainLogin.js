
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

  
/********************************************************Muestra Mensaje de Bienvenida  *************************************************************************/
const userProfile = (objectUser) => {//viewMessageWelcomeUser()  //viewModalWelcomeUser()    //viewProfileUser();
    if (objectUser.additionalUserInfo.isNewUser != false) {
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;
    } else {
        contenido.style.display = "none";
        console.log('usuario antiguo');
    }
}
const nuevaPagina = (url) => {
    window.location = (url);
}
//*************************************************Registro ordinario de un usuario************************************************/

const register = (email,password,name) => {  //registerUserUsual();registro común de usario
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword( email, password)
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
            errorCode = 'La dirección de correo electrónico ya está registrada';
            errorMessage = 'La contraseña debe tener una longitud de 6 caracteres o más .';
            document.getElementById("msjValidation1").style.display = "block"; document.getElementById("msjValidation1").innerHTML = errorMessage;
  
            document.getElementById("msjValidation2").style.display = "block"; document.getElementById("msjValidation2").innerHTML = errorCode;
        });
  }

const initFacebook = () => { //registerUserFacebook()
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
        // principal.style.display = "none";
        // userProfile(result);
        alert('TE LOGEASTE CON FACEBOOK MUY BIEN ,AHORA VERAS EL MURO HTML');
        nuevaPagina('../src/view/muro.html');
        createUser();
  
    }).catch(function (error) {
        console.log(error);
    })
  }

  