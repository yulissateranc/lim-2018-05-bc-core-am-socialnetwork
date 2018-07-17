const reloadPage = ()=> {
    window.location.reload();
  }
  
  const nuevaPagina = (url) => {
      window.location = (url);
  }
  
  /************************************************************Envia correo de confirmación****************************************************************************/
  const verificar = () => {
      var actionCodeSettings = {
          url: 'http://localhost:8887/src/VISTA/interfaz.html',
          handleCodeInApp: false
      };
      const user = firebase.auth().currentUser;
      console.log(user);
      user.sendEmailVerification(actionCodeSettings).then(() => {
          console.log('enviando correo');
      }).catch((error)=> {
          console.log(error);
      });
  };
  /***********************************************bienvenia a usuarixs nuevxs ***********************************************************************/
  
  
  const userWelcome = (objectUser) => {
      if (objectUser.additionalUserInfo.isNewUser) {
          console.log('welcome');
          formContainer.classList.add("hiden");
          if (!objectUser.displayName) {
              welcome.classList.remove("hiden");
              welcome.innerHTML = `
                  <p>Bienvenidx!</p><br/>
                  <p>Por favor confirma tu correo, luego</p>
                  <button type="button" id ="btn-reload" >Haz click aquí</button>`;
          } else {
              welcome.classList.remove("hiden");
              welcome.innerHTML = `<p>Bienvenidx!${objectUser.displayName}</p>`;
          }
      }
  }
  /**************************************************escribe los datos de usuarios con cuentas verificadas en la BD***********************************************************/
  const writeUserData = (objUser, name) => {
      // console.log('esto se resistrará', objUser);
     firebase.database().ref('users/' + objUser.user.uid).set({ 
              username: name,
              email: objUser.user.email,
               
      });
      email.value = '';
      password.value = '';
      name.value = '';
      return objUser
  }
  /*********************************************Observa y detecta si hay un usuario registrado**********************************************/
  
  const observer = () => {
      firebase.auth().onAuthStateChanged((objectUser) => {
          if (objectUser) {
              console.log('usuario existente');
              console.log(objectUser);
              if (objectUser.emailVerified) {
                  formContainer.classList.add("hiden");
                  // nuevaPagina("interfaz.html");
                  // wallUser.classList.remove("hiden");
              }
          } else {
              console.log(objectUser);
              console.log('no existe usuario activo');
              formContainer.classList.remove("hiden");
              // wallUser.classList.add("hiden");
          }
      });
  };
  
  
  //*************************************************funcion de registro de usuarios************************************************/
  const register = () => {
      let email = document.getElementById('email');
  let password = document.getElementById('password');
  let name = document.getElementById('name');
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
          .then((result) => {
              writeUserData(result, name.value);
              console.log('result', result);
              userWelcome(result);
              verificar();
          }).catch((error)=> {
              email.value = '';
              password.value = '';
              name.value = '';
              document.getElementById("warning").innerHTML = `
              El registro falló, asegurate de:
              .Escribir correctamente tu correo.
              .Usar un correo que aún no esté registrado.
              .Darnos una contraseña de mas de 6 caracteres
              `;
          });
  }
  
  /***********************************************************Mostrando interfaz de Facebook a travez de Popup*********************************/
  const initFacebook = () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
          console.log(result);
          principal.style.display = "none";
          writeUserData(result, name.value);
          userWelcome(result);
          observer();
      }).catch((error)=> {
          console.log(error);
      })
  }
  /************************************************************Mostrando interfaz de Google a travez de Popup********************************/
  
  const initGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
          console.log(result);
          userWelcome(result);
          observer();
      }).catch((error) =>{
          console.log(error);
      })
  }
  
  /************************************************************Cierra sesión****************************************************************************/
  const logOut = () => {
      firebase.auth().signOut()
          .then(() => {
              console.log('saliendo');
          })
          .catch((error) => {
              console.log(error);
          });
  };
  /************************************************************Bienvenida según condicionales *************************************************************************/
  
  
  
  
  
  
  /* Forgot Password
  document.getElementById("forgotPassw").addEventListener("click", () => {
      var auth = firebase.auth();
  var emailAddress = "user@example.com";
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
  })
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
  */
  