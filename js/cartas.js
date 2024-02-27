var bubbleProductosOpen = true;
$(document).ready(function(){
	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

	$('#btn-tarot').on('click', function() {
	    $('#menu-tarot-desplegable').slideToggle();
	});

	$('#btn-tarot-movil').on('click', function() {
	    $('#menu-tarot-desplegable-movil').slideToggle();
	});

	$('#btn-horoscopo').on('click', function() {
	    $('#menu-horoscopo-desplegable').slideToggle();
	});

	$('#btn-horoscopo-movil').on('click', function() {
	    $('#menu-horoscopo-desplegable-movil').slideToggle();
	});
});
