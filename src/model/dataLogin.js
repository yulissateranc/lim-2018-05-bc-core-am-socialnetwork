
///********************************************FUNCIONES DE VALIDACIÓN*******************************/
const validatorNameUser=(name,msjErrorName)=>{
    if((/^([A-Za-z0-9\s]{3,})+$/g.test(name))){
        console.log('el nombre de usuario tiene 8 a más dígitos y sólo puede contener letras, números y espacios en blanco');
        msjErrorName.innerHTML = `<em>Name valid</em><br>`;
        return true
    }else{
        console.log('el nombre de usuario debería tener más de 8 dígitos y solo puede contener letras, números y espacios en blanco');
        msjErrorName.innerHTML = `<em>Name invalid</em><br>`;
        return false
    }
}

const validatorEmail = (email,msjErrorEmail) => {
    console.log('validando email', email);
    if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
        alert('email es válido = 8+@+5+.+2')
        msjErrorEmail.innerHTML = `<em>Email valid</em><br>`;
        return true;
    
    } else {
        console.log('falso');
        msjErrorEmail.innerHTML = `<em>Email invalid</em><br>`;
        return false;
    }
}
const validatorPassword = (password,msjErrorPassword) => {
    console.log('validando contraseña', password);
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/.test(password)) {
       alert('la contraseña tiene más de 8 caracteres 1 minúscula 1 mayúscula 1 símbolo [$@$!%*?&]');
       msjErrorPassword.innerHTML = `<em>Password valid</em><br>`;

        return true;
    } else {
    //    alert('la contraseña no tiene más de 8 caracteres 1 min 1 may 1 simbolo [$@$!%*?&]');
       alert('La contrase debe tener más de 8 caracteres que incluyan 1 minúscula,1 mayúscula y un símbolo :/n abcABC@123');
       msjErrorPassword.innerHTML = `<em>Password invalid /Ejm :abcABC@123</em><br>`;
        return false;
    }
}
// ********************************FUNCIÓN QUE INVOCA A TODAS LAS VALIDACIONES ANTERIORES********************//

const validatorEmailAndPassword =(email, password, name)=>{
    const msjErrorName = document.getElementById('divLabelMsjErrorName');
    const msjErrorEmail= document.getElementById('divLabelMsjErrorEmail');
    const msjErrorPassword = document.getElementById('divLabelMsjErrorPassword');
    
    const validatedPassword = validatorPassword(password,msjErrorPassword);
    const validatedEmail = validatorEmail(email,msjErrorEmail);
    const validateNameUser = validatorNameUser(name,msjErrorName);
    if(validatedPassword  && validatorEmail && validateNameUser){
        console.log('email, nombre y contraseña OK');
        registerUserUsual(email, password, name);
    return true;

    }else if(validatedPassword === false && validatorEmail ===false && validateNameUser=== false ){
        
        alert('email invalido ,contraseña invalida, nombre incorrecto');
     
        return false;
    }else if(validatedPassword === 'true'  && validatorEmail === 'false' && validateNameUser=== 'true'){
       alert('pasword OK ,name OK,correo es inválido');
   
        return false;
    }else if(validatedPassword === 'false' && validatorEmail === 'true'&& validateNameUser=== 'true'){
        return false;
      alert('correo  OK , nme ok,contraseña invalid');
   
    }else if(validatedPassword === 'true' && validatorEmail === 'true'&& validateNameUser=== 'false'){
        console.log('correo  OK , contraseña ok,nombre invalid');

      return false
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
const registerUserUsual = (email,password,name) => { //register()
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword( email, password)
        .then((result) => {
            verificar();
            viewMessageWelcomeUser(result);
            directionalUrl('../src/view/muro.html');
             createUser();
  
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
    
     
     console.log(hola);
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
    })
  }
