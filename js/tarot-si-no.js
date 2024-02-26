var cartasVolteadas = [];
var totalVolteadas = 0;
var repartoCartas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
var primeraEjecucion = true;

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

    $('#btn-nueva-tirada').on('click', function() {
        primeraEjecucion = true;
        cartasVolteadas = [];
        totalVolteadas = 0;
        $("#formulario-oraculo").slideToggle();
        $("#tablero-tarot").slideToggle();
        $("#respuesta-tarot").removeClass("visible");
        $("#respuesta-tarot").addClass("invisible");
        $("#btn-nueva-tirada").removeClass("visible");
        $("#btn-nueva-tirada").addClass("invisible");
        $("#tablero-tarot").html('');
        $("#contenedor-cartas").html('');
        $("#pregunta").val('');
        generarReparto();
        generarCartas();
	});

    generarReparto();
    generarCartas();

});

function generarCartas(){
    for(var i=0; i<3; i++){
        $("#tablero-tarot").append('<div id="card" class="carta carta-'+repartoCartas[i]+'" onclick="voltearCarta('+repartoCartas[i]+')">'+
                                        '<div class="front">'+
                                            '<img class="img-carta" src="/img/reverso2.png" />'+
                                        '</div>'+
                                        '<div class="back">'+
                                            '<img class="img-carta-volteada" src="/img/cartas/carta-'+repartoCartas[i]+'.png" />'+
                                        '</div>'+
                                    '</div>');
        $(".carta-"+repartoCartas[i]).click();
    }
    cartasVolteadas = [];
    primeraEjecucion = false;
}


function voltearCarta(id){
    if (cartasVolteadas.length < 1) {
        $(".carta-"+id).flip();
        totalVolteadas++;
        if (totalVolteadas > 3) {
            cartasVolteadas.push(id);
            deshabilitarClick(id);
            if(cartasVolteadas.length === 1){
                deshabilitarClick(repartoCartas[0]);
                deshabilitarClick(repartoCartas[1]);
                deshabilitarClick(repartoCartas[2]);
                setTimeout(function() {
                    $("#formulario-oraculo").slideToggle();
                    $("#tablero-tarot").slideToggle();
                    $("#loading").removeClass("invisible");
                    $("#loading").addClass("visible");
                    generarRespuesta();
                }, 1000);
            }
        }
    }
}

function deshabilitarClick(id){
    if(!primeraEjecucion){
        $(".carta-"+id).off('click');
    }
}

function generarReparto(){
    repartoCartas = repartoCartas.sort(function() {return Math.random() - 0.5});
}

function generarRespuesta(){
    setTimeout(function() {
            $("#contenedor-cartas").append('<div class="carta-respuesta">'+
                                                '<img class="img-carta-respuesta" src="/img/cartas/carta-'+cartasVolteadas[0]+'.png" />'+
                                                '<div class="titulo-carta">'+titulosCartas[cartasVolteadas[0]]+' dice que...</div>'+
                                                '<div class="text-respuesta">'+ generarSiNo() +'</div>'+
                                            '</div>');

        $("#loading").removeClass("visible");
        $("#loading").addClass("invisible");
        $("#respuesta-tarot").removeClass("invisible");
        $("#respuesta-tarot").addClass("visible");
        $("#btn-nueva-tirada").removeClass("invisible");
        $("#btn-nueva-tirada").addClass("visible");

    }, 2000);

}

function generarSiNo() {
    if (Math.floor(Math.random()*1001) % 2 === 0) {
        return 'NO';
    } else {
        return 'SI';
    }
}


var titulosCartas = ["El Loco","El Mago","La Sacerdotisa","La Emperatriz","El Emperador","El Sumo Sacerdote","Los Enamorados","El Carro","La Justicia","El Ermitaño","La Rueda de la Fortuna","La Fuerza","El Colgado","La Muerte","La Templanza","El Diablo","La Torre","La Estrella","La Luna","El Sol","El Juicio","El Mundo"];