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
/**************************************************************************************************************** */
const directionalUrl = (url) => {
  window.location = (url);
}

// const writeUserData = (userId, name, email, imageUrl) => {
//   firebase.database().ref('USERSITOS/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture: imageUrl
//   });
// }
//********************datos del usuario con  sesion activa ************************************ */
const getDataUserSessionActive = () => { //observer()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert('Datos del usuario con sesión activa');
      console.log(user.emailVerified);
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
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

createUser=()=> {
  alert('se va a crear una referencia para el users');
  let refUser = (firebase.database().ref().child('USERSITOS'));
  refUser.push({
    userId: firebase.auth().currentUser.uid,
    userName: firebase.auth().currentUser.displayName,
    userEmail: firebase.auth().currentUser.email,
    userPhotoUrl: firebase.auth().currentUser.photoURL
  });
}

//*****************************************Create / Edite/ Remove  de los Post*****************************************************************+/
const refPost = (firebase.database().ref().child('POST'));


createPost = (descriptionPost, likesCount) => {
  alert('soy la funcion que creará el Post');
  let refPost = (firebase.database().ref().child('POST'));
  refPost.push({
    postId: firebase.auth().currentUser.uid,
    autor: firebase.auth().currentUser.displayName,
    description: descriptionPost.value,
    /*likesCount: likesCount.value*/
  });
}

mostrarPost = () => {
   let refPost = (firebase.database().ref().child('POST'));
    refPost.on("value", function(snap) {
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

        </form>
            `
        }
        viewPost.innerHTML = elementsView;
        if (elementsView!= "") {
            const elementDelete = document.getElementsByClassName("borrar");
            const elementEdit = document.getElementsByClassName("editar");
            for (let i = 0; i < elementDelete.length; i++) {
                elementDelete[i].addEventListener('click', borrarDatosFirebase, false);
                elementEdit[i].addEventListener('click', editaDatosFirebase, false);

            }
        }
        
    });
}

