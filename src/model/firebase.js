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
  const nuevaPagina = (url) => {
    window.location = (url);
}
/*********************************************Observar y detectar si hay un usuario registrado**********************************************/
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
  
        } else {
            console.log('no existente usuario activo');
        }
    });
  };