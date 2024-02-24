var bubbleProductosOpen = true;
$(document).ready(function(){
	/*
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:false,
		dots:true,
		items:1,
		autoplay:true
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
	*/
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
});
