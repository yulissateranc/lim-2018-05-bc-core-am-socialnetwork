
const validatorEmail = (email) => {
    console.log( 'validando email',email);
    if(/^([a-zA-Z0-9._-]{8,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
console.log('email es válido = 8+@+5+.+2')    
    return true;
 } else {
    console.log('falso');
    console.log('email es invalido');
    return false;
 }
 }
 const validatorPassword =(password)=>{
     console.log('validando contraseña', password);
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/.test(password)){
        console.log('la contraseña tiene más de 8 caracteres 1 min 1 may 1 simbolo [$@$!%*?&]');
        return true;    
    }else{
        console.log('la contraseña no tiene más de 8 caracteres 1 min 1 may 1 simbolo [$@$!%*?&]');
        return false;
    }
 }
const validatorNameUser=(name)=>{
    if(/^([A-Za-z0-9\s]{8,})+$/g.test(name)){
        console.log('el nombre de usuario tiene 8 a más dijitos y solo puede contener letras, números y espacios en blanco')
    return true
    }else{
        console.log('el nombre de usuario debe tener 8 amás díjitos y solo puede contener letras, números y espacios en blanco');
        return false
    }
  
}
 const validatorEmailAndPassword =(email, password, name)=>{
const validatedPassword=validatorPassword(password);
const validatedEmail =validatorEmail(email);
const validateNameUser = validatorNameUser(name);
if(validatedPassword  && validatorEmail && validateNameUser){
    console.log('email, nombre y contraseña OK');
    register(email, password, name);
return true;
}else if(validatedPassword === 'false' && validatorEmail ==='false'&& validateNameUser=== 'false'){
    console.log('email invalido ,contraseña invalida, nombre incorrecto');
    return false;
}else if(validatedPassword === 'true'  && validatorEmail === 'false' && validateNameUser=== 'true'){
    console.log('pasword OK ,name OK,correo es inválido');
    return false;
}else if(validatedPassword === 'false' && validatorEmail === 'true'&& validateNameUser=== 'true'){
    return false;
    console.log('correo  OK , nme ok,contraseña invalid');
}else if(validatedPassword === 'true' && validatorEmail === 'true'&& validateNameUser=== 'false'){
    console.log('correo  OK , contraseña ok,nombre invalid');
  return false
}
 }

/********************************************************Muestra Mensaje de Bienvenida  *************************************************************************/
const userProfile = (objectUser) => {//viewMessageWelcomeUser()  //viewModalWelcomeUser()    //viewProfileUser();
    if (objectUser.additionalUserInfo.isNewUser != false) {
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;
    } else {
        contenido.style.display = "none";
        console.log('usuario antiguo');
    }
}






