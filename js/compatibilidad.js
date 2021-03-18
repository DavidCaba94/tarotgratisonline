var signo1 = 999;
var signo2 = 999;
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

    $(".img-signo").on('click', function() {
        $(".img-signo").removeClass("img-signo-seleccionado");
        $(this).addClass("img-signo-seleccionado");
        signo1 = $(this).data("id");
    });

    $(".img-signo2").on('click', function() {
        $(".img-signo2").removeClass("img-signo-seleccionado");
        $(this).addClass("img-signo-seleccionado");
        signo2 = $(this).data("id2");
    });

    $("#boton-consulta").on('click', function() {
        if(signo1 != 999 && signo2 !=999) {
            generarRespuesta()
        }
    });

});

function generarRespuesta() {
    $("#porcentaje").text(compatibilidad[signo1][signo2]+"%");
    $("#signo-elegido-1").attr("src","/img/signos/"+signosNumerados[signo1]+".png");
    $("#signo-elegido-2").attr("src","/img/signos/"+signosNumerados[signo2]+".png");
    $("#formulario-signos").removeClass("visible");
    $("#formulario-signos").addClass("invisible");
    $("#respuesta-signos").removeClass("invisible");
    $("#respuesta-signos").addClass("visible");
    if($(window).width() < 768) {
        $("#respuesta-signos").css("display","block");
    } else {
        $("#respuesta-signos").css("display","flex");
    }

    $("#loading").removeClass("invisible");
    $("#loading").addClass("visible");
    setTimeout(function() {
        $("#loading").removeClass("visible");
        $("#loading").addClass("invisible");
        $("#loading").css("display", "none");
        $("#porcentaje").removeClass("invisible");
        $("#porcentaje").addClass("visible");
    }, 3000);
}

var signosNumerados = ["aries","tauro","geminis","cancer","leo","virgo","libra","escorpio","sagitario","capricornio","acuario","piscis"];
var compatibilidad = [
    [60,65,65,65,90,45,70,80,90,50,55,65],
    [60,70,70,80,70,90,75,85,50,95,80,85],
    [70,70,75,60,80,75,90,60,75,50,90,50],
    [65,80,60,75,70,75,60,95,55,45,70,90],
    [90,70,80,70,85,75,65,75,95,45,70,75],
    [45,90,75,75,75,70,80,85,70,95,50,70],
    [70,75,90,60,65,80,80,85,80,85,95,50],
    [80,85,60,95,75,85,85,90,80,65,60,95],
    [90,50,75,55,95,70,80,85,85,55,60,75],
    [50,95,50,45,45,95,85,65,55,85,70,85],
    [55,80,90,70,70,50,95,60,60,70,80,55],
    [65,85,50,90,75,70,50,95,75,85,55,80]
];
