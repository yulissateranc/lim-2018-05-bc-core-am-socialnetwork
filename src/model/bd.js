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

