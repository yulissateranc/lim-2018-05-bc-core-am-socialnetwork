
//*************************************************funcion de registro de usuarios************************************************/
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

/***********************************************************Registrandose con Facebook*********************************/
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
/************************************************************Mostrando interfaz de Google a travez de Popup********************************/
/************************************************************Registrandose con Google********************************/
const initGoogle = () => {//registerUserGoole()
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
      userProfile(result);
      alert('TE LOGEASTE CON gmail MUY BIEN ,AHORA VERAS EL MURO HTML');
      nuevaPagina('../src/view/muro.html');
      createUser();
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



