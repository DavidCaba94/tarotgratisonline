$(document).ready(function(){
	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

});

/*ANIMACIÓN FLECHA SLIDE*/
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		document.getElementById('flecha-slide').className = 'slideDown';
	}, 1000);
}, false);
/*FIN ANIMACIÓN FLECHA SLIDE*/
