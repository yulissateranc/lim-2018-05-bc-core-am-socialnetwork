
///********************************************FUNCIONES DE VALIDACIÓN*******************************/
const validatorNameUser = (name) => {
    if ((/^([A-Za-z0-9\s]{3,})+$/g.test(name))) {
        return true
    } else {
        return false
    }
}
const validatorEmail = (email) => {
    console.log('validando email', email);
    if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}
const validatorPassword = (password) => {
    console.log('validando contraseña', password);
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/.test(password)) {
        return true;
    } else {
        return false;
    }
}
// ********************************FUNCIÓN QUE INVOCA A TODAS LAS VALIDACIONES ANTERIORES********************//

const validatorEmailAndPassword = (email, password, name) => {
    const msjErrorName = document.getElementById('divLabelMsjErrorName');
    const msjErrorEmail = document.getElementById('divLabelMsjErrorEmail');
    const msjErrorPassword = document.getElementById('divLabelMsjErrorPassword');
    const validatedPassword = validatorPassword(password);
    const validatedEmail = validatorEmail(email);
    const validateNameUser = validatorNameUser(name);
    if (validatedPassword && validatorEmail && validateNameUser) {
        console.log('email, nombre y contraseña OK');
        registerUserUsual(email, password, name);
        return true;
    } else if (!validateNameUser) {
        msjErrorName.innerHTML = `<em>el nombre de usuario debería tener más de 8 dígitos y solo puede contener letras, números y espacios en blanco</em>`
        return false;
    } else if (!validatedEmail) {
        msjErrorEmail.innerHTML =`<em>Email invalid</em><br>`
        return false;
    } else if (!validatedPassword) {
        msjErrorPassword.innerHTML = `<em>Password invalid /Ejm :abcABC@123</em><br>`;
        return false;
    } 
}
/************************************************MUESTRA MENSAJE DE BIENVENIDA****************************/
viewMessageWelcomeUser = (objectUser) => { //userProfile()
    if (objectUser.additionalUserInfo.isNewUser != false) {
        // contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;
        alert('Bienvenido,oh, nos visitas por primera vez');
        console.log(objectUser.additionalUserInfo);
        alert(objectUser.additionalUserInfo.profile.name);
    } else {
        contenido.style.display = "none";
        alert('Bienvenido, hola denuevo');
        console.log(objectUser.additionalUserInfo);
        alert(objectUser.additionalUserInfo.profile.name);
    }
}
//********************************************REGISTRO ORDINARIO DEL USUARIO*******************************/
const registerUserUsual = (email, password, name) => { //register()
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            viewMessageWelcomeUser(result);
            directionalUrl('../src/view/muro.html');
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            errorCode = 'La dirección de correo electrónico ya está registrada';
            errorMessage = 'La contraseña debe tener una longitud de 6 caracteres o más .';
            // document.getElementById("msjValidation1").style.display = "block"; document.getElementById("msjValidation1").innerHTML = errorMessage;

            // document.getElementById("msjValidation2").style.display = "block"; document.getElementById("msjValidation2").innerHTML = errorCode;
        });
}
/**********************************************Registro con Facebook*********************************/
const registerUserFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        viewMessageWelcomeUser(result);
        directionalUrl('../src/view/muro.html');
        createUser();
    }).catch(function (error) {
        console.log(error);
    })
}
/*****************************************Registro con Gmail********************************/
const registerUserGmail = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        viewMessageWelcomeUser(result);
        directionalUrl('../src/view/muro.html');
    }).catch(function (error) {
        console.log(error);
    });
};
const  initSessionFirebase = (emailLogin,passwordLogin) => {
  
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).then(() => {
        directionalUrl('../src/view/muro.html');
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
};

