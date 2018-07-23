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

//********************datos del usuario con  sesion activa ************************************ */
const getDataUserSessionActive = () => { //observer()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert('Datos del usuario con sesión activa');
      if (user.emailVerified){
        console.log(user.emailVerified);
        directionalUrl('../src/view/muro.html')
      }else{
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
createPost = (descriptionPost, likesCount) => {
  alert('soy la funcion que creará el Post');
  let refPost = (firebase.database().ref().child('POST'));
  refPost.push({
    postId: firebase.auth().currentUser.uid,
    autor: firebase.auth().currentUser.displayName,
    description: descriptionPost.value,
    likesCount: likesCount.value
  });
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
