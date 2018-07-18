


// const createNewPostInView =(container)=>{
//   container.innerHTML += `
//   <form class="comentary heigth">
//         <button type="button" class="icon-ellipsis-vert"></button>
//         <textarea id="${pooooost}" name="textarea" rows="4" cols="50">${poooooooost.value}</textarea>
//         <button  class ="" type="button"</button> 
//         <button  class ="" type="button"</button> 
//         <input id="${pooooost} class="" type="number" id="textValuefixed" readonly/>
//         <button type="button" class="icon-ok"></button>     
//     </form>
//   `
// } 
// const containerPost=(idContainer)=>{
//     return document.getElementById(idContainer)
// };
const writeNewPost = (uid, body) => {
    let postData = {
        uid: uid,
        body: body,
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
    return newPostKey;
}


const addEventToBtnPost =(idBtnPost)=>{
    const  post =document.getElementById('post');
    const posts = document.getElementById('posts');
    document.getElementById(idBtnPost).addEventListener('click',()=>{
        // containerPost(idContainer)
        var userId = firebase.auth().currentUser.uid;
        const newPost = writeNewPost(userId, post.value);
        posts.innerHTML += `
    <form class="comentary heigth">
        <button  class="icon-ellipsis-vert"></button>
        <textarea id="${newPost}" name="textarea" rows="4" cols="50">${post.value}</textarea>
        <button id ="update" >Update</button>
        <button id="delete" >Delete</button> 
        <input  class="" type="number" id="textValuefixed" readonly/>
        <button  class="icon-ok"></button>     
   </form>
    
    `
        const btnUpdate = document.getElementById('update');
        const btnDelete = document.getElementById('delete');
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();
            firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
            firebase.database().ref().child('posts/' + newPost).remove();
            while (posts.firstChild) posts.removeChild(posts.firstChild);
            console.log('El usuario esta eliminando  successfully!');
            // reload_page();
        });
        btnUpdate.addEventListener('click', () => {
            const newUpdate = document.getElementById(newPost);
            const nuevoPost = {
                body: newUpdate.value,
            };
            var updatesUser = {};
            var updatesPost = {};
            updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
            updatesPost['/posts/' + newPost] = nuevoPost;
            firebase.database().ref().update(updatesUser);
            firebase.database().ref().update(updatesPost);
        });
    });

};

/******************************************************************************************************************************************** */


const wallCurrentUser =(elementHtml)=>{
elementHtml.innerHTML = '';
elementHtml.innerHTML = `
<section class="wall">
    <div class="header-wall">
        <div class="wrapperMenu">
        <div id="menu" class="icon-menu">
        </div>
        <h2 id="user-name"></h2>
           <img  class="imgUser" src="img/user.PNG" />
        </div>
    </div>
    <section class="wrapper top">
        <form class="comentary">
        <textarea id="post" class="textarea" rows="4" cols="50"  placeholder="Ingresa tu opinion"></textarea>
        <select>
        <option value="" >PUBLICO 🌎 </option>
        <option value="" >PRIVADO 🔒</option>
        </select>
        <button type="button" id="btn-public-post">PUBLICAR</button>
        </form>
    </section> 
    <section class="wrapper" id ="posts">
    </section>
 </section>`,
        addEventToBtnPost('btn-public-post');
}
const reloadPage = ()=> {
    window.location.reload();
  }
  
  const nuevaPagina = (url) => {
      window.location = (url);
  }
  
  /************************************************************Envia correo de confirmación****************************************************************************/
  const verificar = () => {
      var actionCodeSettings = {
          url: 'http://localhost:8887/src/VISTA',
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
                  wallCurrentUser(containerViews)
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
  
