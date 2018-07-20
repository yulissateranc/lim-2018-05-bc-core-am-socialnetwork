//*****************************************Create / Edite/ Remove  de los Post*****************************************************************+/
createPost = () => {
    alert('soy la funcion que creará el Post');
    let ref = (firebase.database().ref().child('POTS'));
    ref.push({
        userId: firebase.auth().currentUser.uid,
        descriptionPost:document.getElementById('txt-description-post').value
    })

}

createUser = () => {
    alert('se va a crear una referencia para el users');
    let ref = (firebase.database().ref().child('USER'));
    ref.push({
        userId: firebase.auth().currentUser.uid,
        userName:firebase.auth().currentUser.displayName,
        userEmail:firebase.auth().currentUser.email
       
    })

}

// editPost = () => { }
// deletePost = () => { }