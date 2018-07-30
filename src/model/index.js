// "no-unused-vars": "off",
//     "no-use-before-define": "off",
//         "no-undef": "off"
/* global firebase */
window.getDataUserSessionActiveLogin = () => { // observer()
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      window.directionalUrl('../src/view/wall.html');
    }
  });
};
/* *******************************************REGISTRO ORDINARIO DEL USUARIO****************************** */
window.registerUserFirebase = (email, password, name, errorName, errorEmail, errorPassword) => { // register()
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      window.sendEmailVerification();
      createUserInBd(result, name);
      errorName.innerHTML = '';
      errorEmail.innerHTML = '';
      errorPassword.innerHTML = '';
      document.getElementById('form-registro').reset();
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
      errorCode = 'La dirección de correo electrónico ya está registrada';
      errorMessage = 'La contraseña debe tener una longitud de 6 caracteres o más .';
    });
};
/* ***********************************************************Envia correo de confirmación****************************************************************************/
window.sendEmailVerification = () => {
  var actionCodeSettings = {
    url: 'http://127.0.0.1:8887/src/view/muro.html',
    handleCodeInApp: false
  };
  const user = firebase.auth().currentUser;
  user.sendEmailVerification(actionCodeSettings).then(() => {
  }).catch((error) => {
    alert('error', error);
  });
};

/* *******************************FUNCIÓN QUE INVOCA A TODAS LAS VALIDACIONES ANTERIORES******************* */

window.validatorFormRegister = (email, password, name) => {
  const msjErrorName = document.getElementById('msj-error-name');
  const msjErrorEmail = document.getElementById('msj-error-email');
  const msjErrorPassword = document.getElementById('msj-error-password');
  msjErrorName.innerHTML = '';
  msjErrorEmail.innerHTML = '';
  msjErrorPassword.innerHTML = '';
  const validatedPassword = window.validatorPassword(password);
  const validatedEmail = window.validatorEmail(email);
  const validateNameUser = window.validatorNameUser(name);
  if (validatedPassword && validatedEmail && validateNameUser) {
    window.registerUserFirebase(email, password, name, msjErrorName, msjErrorEmail, msjErrorPassword);
    return true;
  } else if (!validateNameUser) {
    msjErrorName.innerHTML = '<em>El nombre de usuario debería tener más de 8 dígitos y solo puede contener letras, números y espacios en blanco</em>';
    return false;
  } else if (!validatedEmail) {
    msjErrorEmail.innerHTML = '<em>Correo invalido</em>';
    return false;
  } else if (!validatedPassword) {
    msjErrorPassword.innerHTML = '<em>La contraseña debe tener más de 8 dígitos y solo puede contener letras y números</em></em>';
    return false;
  }
};
/* *************************************************Registro de datos en BD****************************************************************************/

const createUserInBd = (objectUser, name) => {
  if (!objectUser.user.displayName) {
    firebase.database().ref('users/' + objectUser.user.uid).set({
      userId: objectUser.user.uid,
      userName: name,
      userEmail: objectUser.user.email,
      isNewUser: objectUser.additionalUserInfo.isNewUser,
      providerId: objectUser.additionalUserInfo.providerId,
      emailVerified: objectUser.user.emailVerified
    });
  } else {
    firebase.database().ref('users/' + objectUser.user.uid).set({
      userId: objectUser.user.uid,
      userName: objectUser.user.displayName,
      userEmail: objectUser.user.email,
      isNewUser: objectUser.additionalUserInfo.isNewUser,
      userPhotoUrl: objectUser.user.photoURL,
      providerId: objectUser.additionalUserInfo.providerId
    }).then(() => {
      window.directionalUrl('../src/view/wall.html');
    });
  }
  return objectUser;
};
/* *********************************************Registro con Facebook******************************** */
window.registerUserFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    if (result.additionalUserInfo.isNewUser) {
      createUserInBd(result, name);
    } else {
      window.directionalUrl('../src/view/wall.html');
    }
  }).catch((error) => {
    alert(error);
  });
};
/* ****************************************Registro con Gmail******************************* */
window.registerUserGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    if (result.additionalUserInfo.isNewUser) {
      createUserInBd(result, name);
    } else {
      alert('condicional');
      window.directionalUrldirectionalUrl('../src/view/wall.html');
    }
  }).catch((error) => {
    alert('error', error);
  });
};
window.initSessionFirebase = (emailLogin, passwordLogin) => {
  firebase.auth().signInWithEmailAndPassword(emailLogin.value, passwordLogin.value).then(() => {
    document.getElementById('form-sesion').reset();
    document.getElementById('div-label-msj-error-password-login').innerHTML = '';
  }).catch((error) => {
    alert('error', error);
    document.getElementById('div-label-msj-error-password-login').innerHTML = '<em>Asegurate que el correo y contraseña sean correctos.</em>';
  });
};

window.recoverPassword = () => {
  const emailAddress = document.getElementById('correo-sesion').value;
  let modal = document.getElementById('mi-modal');
  let elmet = '';
  modal.classList.add('modalView');
  window.sendPasswordResetEmail(emailAddress)
    .then(() => {
      elmet = window.modalView('Recuperar Contraseña', 'Se ha enviado un correo a su cuenta. SIGA LOS PASOS', 'Aceptar', 'Cerrar');
      modal.innerHTML = elmet;
      let accept = document.getElementById('accept');
      accept.addEventListener('click', () => {
        window.location.href = 'https://outlook.live.com/owa/#';
      });
    }).catch((error) =>{
      alert('error', error);
      elmet = window.modalView('Recuperar Contraseña', 'No se encuentra en nuestros registros', 'Registrarse', 'Cerrar');
      modal.innerHTML = elmet;
      let register = document.getElementById('accept');
      register.style.display = 'none';
    });
};
