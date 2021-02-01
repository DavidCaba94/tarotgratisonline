var bubbleProductosOpen = true;

$(document).ready(function(){
	/*
	var idioma = navigator.language;
	var resIdioma = idioma.split("-");
	var idiomaActual = resIdioma[0];
	var urlActual = window.location.href;
	var arrayUrl = urlActual.split("/");
	var paginaActual = arrayUrl[arrayUrl.length-1];
	var urlNuevaEN = "http://tarotgratisonline.es/en/";
	var urlNuevaES = "http://tarotgratisonline.es/";

	if(!urlActual.includes("/en/") && idiomaActual == "en") {
		window.location.replace(urlNuevaEN + paginaActual);
	} else if(urlActual.includes("/en/") && idiomaActual == "es") {
		window.location.replace(urlNuevaES + paginaActual);
	}
	*/

	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:false,
		dots:true,
		items:1,
		autoplay:true
	});

	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

	$('.cabecera-bubble-productos').on('click', function() {
		$('.desplegable-productos').slideToggle();
		bubbleProductosOpen = !bubbleProductosOpen;
		if(bubbleProductosOpen) {
			$('#btn-cerrar').html("×");
		} else {
			$('#btn-cerrar').html("&#129045");
		}
	});

});

/*ANIMACIÓN FLECHA SLIDE*/
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		$('#titulo').addClass('slideDown');
	}, 1000);
	setTimeout(function() {
		$('#subtitulo').addClass('slideDown');
	}, 1500);
	setTimeout(function() {
		$('#boton-cabecera').addClass('slideDown');
	}, 2000);
	setTimeout(function() {
		document.getElementById('flecha-slide').className = 'slideDown';
	}, 3000);
}, false);
/*FIN ANIMACIÓN FLECHA SLIDE*/
