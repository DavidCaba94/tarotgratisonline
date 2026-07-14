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

            // Estado inicial: mostrando el "loading"
            $("#loading").removeClass("invisible");
            $("#loading").addClass("visible");
            $("#porcentajes-respuesta").removeClass("visible");
            $("#porcentajes-respuesta").addClass("invisible");

            obtenerCompatibilidad(nombre1, nombre2);
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

// Pide la compatibilidad al servidor; si falla, la calcula en local (mismo algoritmo).
function obtenerCompatibilidad(nombre1, nombre2){
    var inicio = Date.now();
    fetch("/js/calculadora_amor.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre1: nombre1, nombre2: nombre2 })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
        if(data && data.valores){
            mostrarResultado(data.valores, inicio);
        } else {
            mostrarResultado(calcularLocal(nombre1, nombre2), inicio);
        }
    })
    .catch(function(){
        mostrarResultado(calcularLocal(nombre1, nombre2), inicio);
    });
}

// Pinta los 5 medidores y anima (respetando un mínimo de "loading" para la UX).
function mostrarResultado(v, inicio){
    var espera = Math.max(0, 1500 - (Date.now() - inicio));

    $("#porcentaje-parametro-1").text(v.amor+"%");
    $("#porcentaje-parametro-2").text(v.amistad+"%");
    $("#porcentaje-parametro-3").text(v.afinidad+"%");
    $("#porcentaje-parametro-4").text(v.sexo+"%");
    $("#porcentaje-parametro-5").text(v.pasion+"%");

    $("#porcentaje-1").css("width", v.amor+"%");
    $("#porcentaje-1").css("height", "20px");
    $("#porcentaje-2").css("width", v.amistad+"%");
    $("#porcentaje-3").css("width", v.afinidad+"%");
    $("#porcentaje-4").css("width", v.sexo+"%");
    $("#porcentaje-5").css("width", v.pasion+"%");

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
    }, espera);
}

// ---- Cálculo determinista de respaldo (idéntico al PHP) ----
function normalizaNombre(s){
    return s.trim().toLowerCase().replace(/\s+/g, ' ').substring(0, 40);
}

// FNV-1a 32 bit sobre los bytes UTF-8 de la cadena.
function fnv1a(str){
    var bytes = new TextEncoder().encode(str);
    var hash = 0x811c9dc5;
    for(var i = 0; i < bytes.length; i++){
        hash ^= bytes[i];
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash >>> 0;
}

function calcularLocal(nombre1, nombre2){
    var clave = normalizaNombre(nombre1) + "|" + normalizaNombre(nombre2);
    function val(param){ return 45 + (fnv1a(clave + "|" + param) % 55); } // 45..99
    return {
        amor:     val("amor"),
        amistad:  val("amistad"),
        afinidad: val("afinidad"),
        sexo:     val("sexo"),
        pasion:   val("pasion")
    };
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
