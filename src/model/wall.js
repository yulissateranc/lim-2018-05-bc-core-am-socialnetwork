/* global firebase */
let refPost = (firebase.database().ref().child('POST'));
const containerModalWelcome = document.getElementById('container-modal');
/* Create / Edite/ Remove  de los Post**************************************************************** */
window.createPostInFirebase = (descriptionPost, privacity) => {
  const validatepublications = window.validateContentOfpublications(descriptionPost.value);
  if (validatepublications) {
    const userId = firebase.auth().currentUser.uid;
    (firebase.database().ref('/users/' + userId).once('value', (snapshot) => {
      const displayName = snapshot.val().userName;
      let refPost = (firebase.database().ref().child('POST'));
      refPost.push({
        userId: firebase.auth().currentUser.uid,
        autor: displayName,
        description: descriptionPost.value,
        privacity: privacity.value,
        likesCount: 0,
      }).then(() => {
        descriptionPost.value = '';
        privacity.innerHTML = `<option value="PUBLICO">PUBLICO 🌎 </option>
          <option value="PRIVADO">PRIVADO 🔒</option>`;
          document.getElementById('txterror').innerHTML = '¡Tu opinión se  publicó con exito 😉😊!';
      });
    }));
  } else {
    document.getElementById('txterror').innerHTML = '¡ Ingrese texto para publicar !';
  }
};

/* like*/
const createLikeInFirebase = () => {
  const postId = event.target.getAttribute('data-like');
  const uid = (firebase.auth().currentUser.uid);
  let postRef = firebase.database().ref('POST/' + postId);
  let like = document.getElementById('like');
  postRef.transaction((post) => {
    if (post) {
      if (post.likes && post.likes[uid]) {
        like.classList.remove('icon-like');
        like.classList.add('icon-notLike');
        post.likesCount--;
        post.likes[uid] = null;
      } else {
        post.likesCount++;
        like.classList.add('icon-like');
        like.classList.remove('icon-notLike');
        if (!post.likes) {
          post.likes = {};
        }
        post.likes[uid] = true;
      }
    }
    return post;
  });
};

window.showPostsInWall = () => {
  let refPost = (firebase.database().ref().child('POST'));
  refPost.on('value', (snap) => {
    let datos = snap.val();
    const viewPost = document.getElementById('posts');
    let elementsView = '';
    for (let key in datos) {
      if (datos[key].privacity === 'PRIVADO') {
        if (datos[key].userId === firebase.auth().currentUser.uid) {
          elementsView += `           
          <form class="comentary">
              <p class="users" >${datos[key].autor}</p>
              <textarea name="postMessage" rows="4" cols="50" readonly class="mensaje">  ${datos[key].description}</textarea>
              <input type="number" class="textValuefixed" readonly value="${datos[key].likesCount}" />
              <select disabled id="post-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
              </select>
              <button type="button" class="icon-like" data-like="${key}" id="like"></button>
              <a href="#mi-modal"><button type="button" class="borrar" data-message-delete=${key}>Eliminar</button></a>

              <button type="button" id="btn-edit" class="editar" data-message-edit= ${key}>Editar</button>
             </div>
          </form>`;
        }
      } else if (datos[key].privacity === 'PUBLICO') {
        if (datos[key].userId !== firebase.auth().currentUser.uid) {
          elementsView += `           
              <form class="comentary">
              <p class="users" >${datos[key].autor}</p>
              <textarea name="postMessage" rows="4" cols="50" readonly class="mensaje">  ${datos[key].description}</textarea>
              <input type="number" class="textValuefixed" readonly value="${datos[key].likesCount}"/>
              <button type="button" class="icon-like" data-like="${key}" id="like"></button>
              <select disabled id="post-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
              </select>
              </div>
             </form>`;
        } else {
          elementsView += `           
             <form class="comentary">
             <p class="users" >${datos[key].autor}</p>
             <textarea name="postMessage" rows="4" cols="50" readonly class="mensaje">  ${datos[key].description}</textarea>
             <input type="number" class="textValuefixed" readonly value="${datos[key].likesCount}"/>
             <select disabled id="post-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
             </select>
             <button type="button" class="icon-like" data-like="${key}" id="like"></button>
             <a href="#mi-modal"><button type="button" class="borrar" data-message-delete=${key}>Eliminar</button></a>

             <button type="button" id="btn-edit" class="editar" data-message-edit= ${key}>Editar</button>
             </div>
             </form>`;
        }
      }
      viewPost.innerHTML = elementsView;
      if (elementsView !== '') {
        const elementDelete = document.getElementsByClassName('borrar');
        const elementEdit = document.getElementsByClassName('editar');
        const elementLike = document.getElementsByClassName('icon-like');
        for (let i = 0; i < elementLike.length; i++) {
          elementLike[i].addEventListener('click', createLikeInFirebase, false);
        }
        for (let i = 0; i < elementDelete.length; i++) {
          elementDelete[i].addEventListener('click', deletePostFirebase, false);
          elementEdit[i].addEventListener('click', showPostToEdit, false);
        }
      }
    }
  });
};

window.closeModalWelcome = () => {
  const userId = (firebase.auth().currentUser.uid);
  containerModalWelcome.innerHTML = '';
  (firebase.database().ref('/users/' + userId).update({
    isNewUser: false
  }));
};

window.modalView = (reftexto, text, btn1, btn2) => {
  return `
    <div class="modal-contentView">
      <a href="#modal-close" title="Cerrar" id="close" class="modal-close">Cerrar</a>
      <h2 id="txtTitle">${reftexto}</h2>
      <p>${text}</p>
        <button id="accept" class="btnmodal">${btn1}</button>
        <a href="#modal-close" title="${btn2}"><button class="btnmodal" id="close">${btn2}</button></a>
    </div>
  `;
};


const deletePostFirebase = () => {
  let refPost = (firebase.database().ref().child('POST'));
  let keyDataDelete = event.target.getAttribute('data-message-delete');
  let refMesaggeDelete = refPost.child(keyDataDelete);
  let modal = document.getElementById('mi-modal');
  modal.classList.add('modalView');
  let elmet = '';
  elmet = window.modalView('Eliminar', ' ¿ Desea realmente eliminar ?', 'SI', 'NO');
  modal.innerHTML = elmet;
  document.getElementById('close').addEventListener('click', () => {
    modal.innerHTML = '';
  });
  document.getElementById('accept').addEventListener('click', () => {
    refMesaggeDelete.remove();
    modal.innerHTML = '';
    modal.classList.remove('modalView');
  });
};
const showPostToEdit = () => {
  const posts = document.getElementById('posts');
  let keyDataEdit = event.target.getAttribute('data-message-edit');
  refPost.on('value', (snap) => {
    let datos = snap.val();
    posts.innerHTML = '';


    for (let key in datos) {
      if (key === keyDataEdit) {
        if (datos[key].privacity === 'PUBLICO') {
          posts.innerHTML +=
            `<form class="comentary">
            <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" class="mensaje" id="text-save">  ${datos[key].description}</textarea>
            <input type="number" class="textValuefixed" readonly value="${datos[key].likesCount}"/>
            <select id="postEdit-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
                <option value="PRIVADO">PRIVADO</option>
              </select>
            <button type="button" class="borrar" data-message-delete=${key}  onclick=showPostsInWall()>Cancelar</button>
            <button type="button" id="btn-edit" class="save" data-message-save= ${key}>Guardar</button>
            </div>
        </form>
            `;
        } else {
          posts.innerHTML +=
            `<form class="comentary">
            <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" class="mensaje" id="text-save">  ${datos[key].description}</textarea>
            <input type="number" class="textValuefixed" readonly value="${datos[key].likesCount}"/>
            <select id="postEdit-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
                <option value="PUBLICO">PUBLICO</option>
              </select>
            <button type="button" class="icon-like"></button>
            <button type="button" class="borrar" data-message-delete=${key} onclick=showPostsInWall()>Cancelar</button>
            <button type="button" id="btn-edit" class="save" data-message-save= ${key}>Guardar</button>
            </div>

        </form>`;
        }
      } else {
        posts.innerHTML += `<form class="comentary">
        <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" class="mensaje" readonly> ${datos[key].description} </textarea>
            <input type="number" class="textValuefixed" value="${datos[key].likesCount}" readonly/>
            <select disabled id="postEdit-privacity-selector">
                <option value="${datos[key].privacity}">${datos[key].privacity}</option>
              </select>
            <button type="button" class="icon-like"></button>
        </form>
 `;
      }
    }
    if (posts !== '') {
      const elementGuardar = document.getElementsByClassName('save');
      for (let i = 0; i < elementGuardar.length; i++) {
        elementGuardar[i].addEventListener('click', updatePostOnFirebase, false);
      }
    }
  });
};

const updatePostOnFirebase = () => {
  let keyDataSave = event.target.getAttribute('data-message-save');
  let refMesaggesave = refPost.child(keyDataSave);
  let newPost = document.getElementById('text-save').value;
  let newSelect = document.getElementById('postEdit-privacity-selector').value;
  refPost.once('value', (snap) => {
    let data = snap.val();
    for (const key in data) {
      if (key === keyDataSave) {
        if (newPost === '') {
          alert('Incompleto');
        } else {
          data[key].mensaje = newPost;
          data[key].option = newSelect;

          let nuevoPost = {
            description: newPost,
            privacity: newSelect
          };
          var updatesPost = {};
          updatesPost = nuevoPost;
          refMesaggesave.update(updatesPost);
          window.showPostsInWall();
        }
      }
    }
  });
};

window.renderModal = (containerModalWelcome) => {
  const userId = (firebase.auth().currentUser.uid);
  (firebase.database().ref('/users/' + userId).once('value', (snapshot) => {
    if (snapshot.val().isNewUser) {
      containerModalWelcome.innerHTML =
        `
	        <div id="modal-welcome" class="modal">
            <div class="modal-content">
            <div class="modal-header">
                <span id="close-modal-welcome"  class="close">&times;</span>
                <h2> Bienvenido a EDU TIC </h2>
             </div>
           <p class="welcomeUser">¡Hola ${snapshot.val().userName} !</p>
             <div class="modal-body">
             <p>Gracias por unirte. Las tecnologías y la educación son imprescindibles para transmititr conocimientos, 
             en Edu Tic esperamos crear una red social trascendental y hermosa. Diviértete usandola</p>
             </div>
            
        </div>
    </div>`, document.getElementById('close-modal-welcome').addEventListener('click', () => window.closeModalWelcome());
    }
  }));
};

window.logOut = () => {
  firebase.auth().signOut().then(() => {
    window.directionalUrl('../index.html');
  }).catch((error) => {
    alert('No se pudo cerrar sesión', error);
  });
};

/* *******************datos del usuario con  sesion activa ************************************ */
const nameCurrentUser = (nameUser, user) => {
  const userId = user.uid;
  (firebase.database().ref('/users/' + userId).once('value', (snapshot) => {
    nameUser.innerHTML = snapshot.val().userName;
  }));
};

window.getDataUserSessionActive = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.renderModal(containerModalWelcome);
      const nameUser = document.getElementById('nameUser');
      nameCurrentUser(nameUser, user);
    }
  });
};

