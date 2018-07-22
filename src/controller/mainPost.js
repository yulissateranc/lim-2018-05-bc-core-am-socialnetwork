

const buttonPublicPost = document.getElementById('btn-public-post');


buttonPublicPost.addEventListener('click', (e) => {
	let descriptionPost = document.getElementById('txt-description-post');
	let likesCount = document.getElementById('input-likes-count');
	e.preventDefault();
	const posts = document.getElementById('posts');
	newPost = createPost(descriptionPost, likesCount);
	posts.innerHTML += `
	<form class="comentary">
	<!--<button type="button" id="seleccion" class="icon-ellipsis-vert"></button>-->
	<textarea  id="${newPost}" name="textarea" rows="4" cols="50">${descriptionPost.value}</textarea>
	<input type="number" id="textValuefixed" readonly/>
	<button type="button" class="icon-ok"></button>
	<div class="section-seleccion">
			<button type="button">Editar</button>
			<button type="button" id="cerrar-sesion">Eliminar</button>
	</div>
	</form>`


});



