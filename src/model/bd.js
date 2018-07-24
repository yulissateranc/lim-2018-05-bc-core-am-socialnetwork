//Initialize Firebase
let config = {
  apiKey: "AIzaSyCGQvJrcWt8bQ7wB3A2AXqkHqld-NYAVJw",
  authDomain: "social-network-967b3.firebaseapp.com",
  databaseURL: "https://social-network-967b3.firebaseio.com",
  projectId: "social-network-967b3",
  storageBucket: "social-network-967b3.appspot.com",
  messagingSenderId: "25029310975"
};
firebase.initializeApp(config);
const dataBase = firebase.database();
/**************************************************************************************************************** */
const directionalUrl = (url) => {
  window.location = (url);
}
//********************datos del usuario con  sesion activa ************************************ */
const getDataUserSessionActive = () => { //observer()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert('existe un usuario');
      console.log(user.emailVerified);
      render(containerModalWelcome);
    } else {
      alert('no existente usuario activo');
    }
  });
};
const getDataUserSessionActiveLogin = () => { //observer()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert('Datos del usuario con sesión activa');
      if (user.emailVerified) {
        console.log(user.emailVerified);
        directionalUrl('../src/view/muro.html')
      } else {
        alert('por favor verifica tu correo para acceder');
      }
      console.log(user.emailVerified);
    } else {
      alert('no existente usuario activo');
    }
  });
};
const getDataUserRegisterFirebase = (user) => {
  let ObjUserCurrent = {};
  if (user != null) {
    const ObjUserCurrent = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid
    };
    return ObjUserCurrent;
  }
};
const getDataUserRegisterWithFacebookOrGmail = (user) => {
  let ObjUserCurrent = {};
  if (user != null) {
    user.providerData.forEach(function (user) {
      ObjUserCurrent = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid
      };
      return ObjUserCurrent;
    });
  }
};
const getDataCurrentUser = () => {
  let user = firebase.auth().currentUser;
  if (user) {
    alert('enviaremos datos el usuario actual activo');
    let objUserFire = getDataUserRegisterFirebase(user);
    let objUserFacGmail = getDataUserRegisterWithFacebookOrGmail(user);
    console.log(objUserFire, objUserFacGmail);
  } else {
    alert('usuario no logeado');
  }
}
//*****************************************Create / Edite/ Remove  de los Post*****************************************************************+/
const createPost = (descriptionPost, likesCount) => {

  if (!firebase.auth().currentUser.displayName) {
    const userId = firebase.auth().currentUser.uid;
    (firebase.database().ref('/users/' + userId).once('value',(snapshot) => {
     const displayName = snapshot.val().userName;
      alert('soy la funcion que creará el Post');
      let refPost = (firebase.database().ref().child('POST'));
         refPost.push({
         postId: firebase.auth().currentUser.uid,
         autor: displayName,
         description: descriptionPost.value,
         /*likesCount: likesCount.value*/
       }).then(()=>{
         descriptionPost.value = "";
       });
    }));
  } else {
    alert('soy la funcion que creará el Post');
    let refPost = (firebase.database().ref().child('POST'));
    refPost.push({
      postId: firebase.auth().currentUser.uid,
      autor: firebase.auth().currentUser.displayName,
      description: descriptionPost.value,
      /*likesCount: likesCount.value*/
    }).then(() => {
      descriptionPost.value = "";
    });
  }
}
/**************************************************Registro de datos en BD****************************************************************************/
const createUser = (objectUser, name) => {
  alert('se va a crear una referencia para el users');
  console.log('esto se resistrará', objectUser);
  if (!objectUser.user.displayName) {

    console.log(objectUser.user.displayName);
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
      directionalUrl('../src/view/muro.html')
    });
  }
  return objectUser
}

const mostrarPost = () => {
  let refPost = (firebase.database().ref().child('POST'));
  refPost.on("value", function (snap) {
    let datos = snap.val();
    // console.log(datos);
    const viewPost = document.getElementById('posts');
    let elementsView = "";
    for (let key in datos) {
      elementsView += `           
        <form class="comentary">
            <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" readonly class="mensaje">  ${datos[key].description}</textarea>
            <input type="number" class="textValuefixed" readonly /*value="${datos[key].likesCount}"*//>
            <button type="button" class="icon-ok"></button>
            <button type="button" id="btn-edit" class="editar" data-message-edit= ${key}>Editar</button>
            <button type="button" class="borrar" data-message-delete=${key}>Eliminar</button>
           </div>
        </form>`
    }
    viewPost.innerHTML = elementsView;
    if (elementsView != "") {
      const elementDelete = document.getElementsByClassName("borrar");
      const elementEdit = document.getElementsByClassName("editar");
      for (let i = 0; i < elementDelete.length; i++) {
        elementDelete[i].addEventListener('click', borrarDatosFirebase, false);
        elementEdit[i].addEventListener('click', editaDatosFirebase, false);
      }
    }
  });
}

