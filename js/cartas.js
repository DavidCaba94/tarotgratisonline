var bubbleProductosOpen = true;
$(document).ready(function(){
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
