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
