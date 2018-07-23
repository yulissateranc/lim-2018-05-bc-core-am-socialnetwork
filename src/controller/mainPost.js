const buttonPublicPost = document.getElementById('btn-public-post');


buttonPublicPost.addEventListener('click', (e) => {
	let descriptionPost = document.getElementById('txt-description-post');
	let likesCount = document.getElementById('input-likes-count');
	e.preventDefault();
     if (descriptionPost.value !== '') {
      createPost(descriptionPost,likesCount);
      descriptionPost.value ="";
    }
    else {
        alert('Escriba su opinion');
        descriptionPost.placelholder = "Escribe un mensaje";
    }
	/*posts.innerHTML += `
	<form class="comentary">
	<!--<button type="button" id="seleccion" class="icon-ellipsis-vert"></button>-->
	<textarea  id="${newPost}" name="textarea" rows="4" cols="50">${descriptionPost.value}</textarea>
	<input type="number" class="textValuefixed" readonly/>
	<button type="button" class="icon-ok"></button>
	<div class="section-seleccion">
			<button type="button" data-message-edit= ${newPost}>Editar</button>
			<button type="button" id="cerrar-sesion" data-message-delete="${newPost}">Eliminar</button>
	</div>
	</form>`*/
});

const borrarDatosFirebase = () => {
    let refPost = (firebase.database().ref().child('POST'));
    let keyDataDelete = event.target.getAttribute("data-message-delete");
    console.log(keyDataDelete);
    let refMesaggeDelete = refPost.child(keyDataDelete);
    if (confirm("Esta seguro de borrar el mensaje ?")) {
        refMesaggeDelete.remove();
    }
}


const editaDatosFirebase = () => {
    alert('editar');
    const posts = document.getElementById('posts');
    let keyDataEdit = event.target.getAttribute("data-message-edit");
    console.log(keyDataEdit);
    refPost.on("value", function (snap) {
        let datos = snap.val();
        console.log(datos);
        posts.innerHTML = "";

        for (let key in datos) {
            console.log(key);
            if (key == keyDataEdit) {
                posts.innerHTML +=
                    `<form class="comentary">
            <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" class="mensaje" id="text-save">  ${datos[key].description}</textarea>
            <input type="number" class="textValuefixed" readonly /*value="${datos[key].likesCount}*/"/>
            <button type="button" class="icon-ok"></button>
            <button type="button" id="btn-edit" class="save" data-message-save= ${key}>Update</button>
            <button type="button" class="borrar" data-message-delete=${key}  onclick=mostrarPost()>Cancelar</button>

            </div>

        </form>
            `
            } else {
       posts.innerHTML += `<form class="comentary">
        <p class="users" >${datos[key].autor}</p>
            <textarea name="postMessage" rows="4" cols="50" class="mensaje" readonly> ${datos[key].description} </textarea>
            <input type="number" class="textValuefixed" /*value="${datos[key].likesCount}*/" readonly/>
            <button type="button" class="icon-ok"></button>
            <button disabled type="button" id="btn-edit" class="editar">Editar</button>
            <button disabled type="button" class="borrar">Eliminar</button>
        </form>
 `
            };
        }
        if (posts != "") {
            const elementGuardar = document.getElementsByClassName("save");
            for (let i = 0; i < elementGuardar.length; i++) {
        elementGuardar[i].addEventListener('click', updateU, false);
            }

        }


    })

}

const updateU = () => {
    let keyDataSave = event.target.getAttribute("data-message-save");
    let refMesaggesave = refPost.child(keyDataSave);
    console.log(refMesaggesave);
    let newPost = document.getElementById("text-save").value;

    refPost.once("value", function (snap) {
        let data = snap.val();
        for (key in data) {
            if (key == keyDataSave) {
                console.log(keyDataSave);
                if (newPost === '') {
                    alert("Incompleto");
                }
                else {
                    data[key].mensaje = newPost;

                    let nuevoPost = {
                        description: newPost,

                    }

                    console.log(nuevoPost);
                    var updatesPost = {};
                    updatesPost = nuevoPost;
             refMesaggesave.update(updatesPost)
                    console.log(newPost);
                    mostrarPost();
                }
            }
        }
    })


}




mostrarPost();

























