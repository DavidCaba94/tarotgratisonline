var arrayPosts = [];

$(document).ready(function(){
	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

	const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/json/posts.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);

            for(let item of posts) {
                arrayPosts.push(item);
            }

			cargarPosts();
        }
    }
});

function cargarPosts() {
	$("#contenedor-blog").html('');
	arrayPosts = arrayPosts.reverse();
	for(var i = 0; i < arrayPosts.length; i++){
        if(arrayPosts[i] != undefined){
            $("#contenedor-blog").append(
				'<div class="box-post">'+
                    '<h2 class="titulo-post">'+ arrayPosts[i].titulo +'</h2>'+
                    '<p class="subtitulo-post">'+ arrayPosts[i].descripcion +'</p>'+
                    '<a href="'+ arrayPosts[i].url +'"><div class="btn-post">Ir al post</div></a>'+
                '</div>'
            );
        }
    }
}

/*
¿Qué significa soñar con encontrar dinero?

¿Qué significa soñar con estar embarazado?

¿Qué significa soñar con viajar sin rumbo?

¿Qué significa soñar con encontrar un nuevo cuarto?

¿Qué significa soñar con llegar tarde?

¿Qué significa soñar con vivir un desastre natural?

¿Qué significa soñar con ser famoso?

¿Qué significa soñar con ser infiel?

¿Qué significa soñar con conducir un vehículo sin control?

¿Qué significa soñar con animales?

¿Qué significa soñar con comer en exceso?

¿Qué significa soñar con ser asesinado?

¿Qué significa soñar con ver a un ser querido fallecido?

¿Qué significa soñar con ser perseguido por un animal?

¿Qué significa soñar con escalar?

¿Qué significa soñar con desnudarse frente a un público?

¿Qué significa soñar con conducir un vehículo en agua?

¿Qué significa soñar con ser abandonado?

¿Qué significa soñar con estar en un examen?

¿Qué significa soñar con presenciar un accidente?

¿Qué significa soñar con hablar en público?

¿Qué significa soñar con estar perdido?

¿Qué significa soñar con caminar descalzo?
*/
