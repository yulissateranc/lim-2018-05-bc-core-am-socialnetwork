
const buttonPublicPost = document.getElementById('btn-public-post');
const btnLogOut = document.getElementById('log-out');
const btnMenu = document.getElementById('menu');

window.onload = () => {
  window.getDataUserSessionActive();
  window.mostrarPost();
  let modal = document.getElementById('miModal');
  modal.classList.remove('modalView');
  document.getElementById('contenido').style.display = 'none';
  // let nameUser = document.getElementById('name-user');
};
window.onclick = () => {
  if (event.target.id === 'modal-welcome') {
    window.closeModalWelcome();
    document.getElementById('container-modal').innerHTML = '';
  }
};
let contador = 0;
btnMenu.addEventListener('click', () => {
  if (contador === 1) {
    document.getElementById('contenido').style.display = 'none';
    contador = 0;
  } else {
    contador = 1;
    document.getElementById('contenido').style.display = 'block';
  }
});

btnLogOut.addEventListener('click', () => {
  let modal = document.getElementById('miModal');
  modal.classList.add('modalView');
  let elmet = '';
  elmet = window.modalView('Cerrar Sesion', '¿ Seguro que desea salir ?', 'Si', 'No');
  modal.innerHTML = elmet;
  document.getElementById('accept').addEventListener('click', () => {
    window.logOut();
  });
});

document.getElementById('txt-description-post').addEventListener('click', () => {
  document.getElementById('txterror').innerHTML = '';
});

buttonPublicPost.addEventListener('click', (event) => {
  event.preventDefault();
  let descriptionPost = document.getElementById('txt-description-post');
  const privacityPost = document.getElementById('post-privacity-selector');
  window.createPost(descriptionPost, privacityPost);
});
