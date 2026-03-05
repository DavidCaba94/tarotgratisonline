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

    $("#boton-amor").click(function() {
        if(camposRellenos() == 0){
            var nombre1 = $("#nombre-1").val();
            var nombre2 = $("#nombre-2").val();
            $("#texto-nombres").text(nombre1 +" y "+ nombre2);
            $("#formulario-amor").removeClass("visible");
            $("#formulario-amor").addClass("invisible");
            $("#respuesta-amor").removeClass("invisible");
            $("#respuesta-amor").addClass("visible");

            var porc1 = generarAleatorio();
            var porc2 = generarAleatorio();
            var porc3 = generarAleatorio();
            var porc4 = generarAleatorio();
            var porc5 = generarAleatorio();
            $("#porcentaje-1").css("width", porc1+"%");
            $("#porcentaje-1").css("height", "20px");
            $("#porcentaje-2").css("width", porc2+"%");
            $("#porcentaje-3").css("width", porc3+"%");
            $("#porcentaje-4").css("width", porc4+"%");
            $("#porcentaje-5").css("width", porc5+"%");

            $("#porcentaje-parametro-1").text(porc1+"%");
            $("#porcentaje-parametro-2").text(porc2+"%");
            $("#porcentaje-parametro-3").text(porc3+"%");
            $("#porcentaje-parametro-4").text(porc4+"%");
            $("#porcentaje-parametro-5").text(porc5+"%");

            setTimeout(function() {
                $("#loading").removeClass("visible");
                $("#loading").addClass("invisible");
                $("#porcentajes-respuesta").removeClass("invisible");
                $("#porcentajes-respuesta").addClass("visible");
                $(".meter > span").each(function() {
                  $(this)
                    .data("origWidth", $(this).width())
                    .width(0)
                    .animate({
                      width: $(this).data("origWidth")
                    }, 1200);
                });
            }, 3000);
        } else if(camposRellenos() == 1){
            $("#nombre-1").css("border", "1px solid #ff0000");
        } else if(camposRellenos() == 2){
            $("#nombre-2").css("border", "1px solid #ff0000");
        } else if(camposRellenos() == 3){
            $("#nombre-1").css("border", "1px solid #ff0000");
            $("#nombre-2").css("border", "1px solid #ff0000");
        }

    });

    $("#boton-nueva-pregunta").click(function() {
        $("#nombre-1").val("");
        $("#nombre-2").val("");
        $("#nombre-1").css("border", "1px solid #ffffff");
        $("#nombre-2").css("border", "1px solid #ffffff");
        $("#respuesta-amor").removeClass("visible");
        $("#respuesta-amor").addClass("invisible");
        $("#formulario-amor").removeClass("invisible");
        $("#formulario-amor").addClass("visible");
        $("#loading").removeClass("invisible");
        $("#loading").addClass("visible");
        $("#porcentajes-respuesta").removeClass("visible");
        $("#porcentajes-respuesta").addClass("invisible");
    });

});


function generarAleatorio(){
    return Math.floor(Math.random()*101);
}

function camposRellenos() {
    var relleno = 0;
    var nombre1 = $("#nombre-1").val();
    var nombre2 = $("#nombre-2").val();

    if(nombre1 == ""){
        relleno = 1;
    }

    if(nombre2 == ""){
        relleno = 2;
    }

    if(nombre1 == "" && nombre2 == ""){
        relleno = 3;
    }

    return relleno;
}
