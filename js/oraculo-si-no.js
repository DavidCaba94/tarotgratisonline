$(document).ready(function(){
    $('.hamburger-menu').on('click', function() {
        $('.bar').toggleClass('animate');
    });

    $('#btn-menu').on('click', function() {
        $('#menu-movil-desplegable').slideToggle();
    });

    $("#boton-oraculo").click(function() {
        if(camposRellenos()){
            var pregunta = $("#pregunta").val();
            $("#texto-pregunta").text(pregunta);
            $("#formulario-oraculo").removeClass("visible");
            $("#formulario-oraculo").addClass("invisible");
            $("#respuesta-oraculo").removeClass("invisible");
            $("#respuesta-oraculo").addClass("visible");
            var respuestaOraculo = comprobarRespuesta();
            $("#texto-respuesta").text(respuestaOraculo);
            setTimeout(function() {
                $("#loading").removeClass("visible");
                $("#loading").addClass("invisible");
                $("#texto-respuesta").removeClass("invisible");
                $("#texto-respuesta").addClass("visible");
            }, 3000);
        } else {
            $("#pregunta").css("border", "1px solid #ff0000");
        }

    });

    $("#boton-nueva-pregunta").click(function() {
        $("#pregunta").val("");
        $("#pregunta").css("border", "1px solid #ffffff");
        $("#respuesta-oraculo").removeClass("visible");
        $("#respuesta-oraculo").addClass("invisible");
        $("#formulario-oraculo").removeClass("invisible");
        $("#formulario-oraculo").addClass("visible");
        $("#loading").removeClass("invisible");
        $("#loading").addClass("visible");
        $("#texto-respuesta").removeClass("visible");
        $("#texto-respuesta").addClass("invisible");
    });

});


function generarAleatorio(){
    return Math.floor(Math.random()*1001);
}

function comprobarRespuesta(){
    var resto = generarAleatorio() % 2;
    var respuesta = ""

    if( resto == 0) {
        respuesta = "NO";
    } else {
        respuesta = "SI";
    }

    return respuesta;
}

function camposRellenos() {
    var relleno = false;
    var pregunta = $("#pregunta").val();

    if(pregunta != ""){
        relleno = true;
    }

    return relleno;
}
