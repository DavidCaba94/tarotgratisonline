var signosNumerados = ["aries","tauro","geminis","cancer","leo","virgo","libra","escorpio","sagitario","capricornio","acuario","piscis"];
var signo = '';
var email = '';
var fecha = null;
var prediccion = '';
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

	$(".img-signo").on('click', function() {
        $(".img-signo").removeClass("img-signo-seleccionado");
        $(this).addClass("img-signo-seleccionado");
        signo = signosNumerados[$(this).data("id")];
    });

	$("#boton-solicitar").click(function() {
        if($("#email").val() && signo !== ''){
            email = $("#email").val();
            $("#formulario-oraculo").removeClass("visible");
            $("#formulario-oraculo").addClass("invisible");
			$("#loading").removeClass("invisible");
            $("#loading").addClass("visible");
            infoComposition();
            setTimeout(function() {
                $("#loading").removeClass("visible");
                $("#loading").addClass("invisible");
                $("#send-message").removeClass("invisible");
                $("#send-message").addClass("visible");
				sendMail();
				saveEmail();
            }, 3000);
        } else {
            $("#email").css("border", "1px solid #ff0000");
        }

    });
});

function infoComposition() {
	fecha = new Date().getDate() + '-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear();
	const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/json/horoscopo-diario.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let predis = JSON.parse(this.responseText);
            for(let item of predis) {
                if (item.signo === signo) {
					if ((new Date().getMonth()+1) % 2 === 0) {
						prediccion = item.prediccionesPar[new Date().getDate() - 1].prediccion;
					} else {
						prediccion = item.prediccionesImpar[new Date().getDate() - 1].prediccion;
					}
				}
            }
        }
    }
}

function sendMail() {
	$.ajax({
        type: "GET",
        dataType : 'json',
        async: false,
        url: '/js/send_horoscopo.php',
        data: {
			email: email,
			fecha: new Date().getFullYear(),
			prediccion: prediccion,
            periodo: 'anual'
		},
        success: function () { },
        failure: function() { }
    });
}

function saveEmail() {
    var stringLine = JSON.parse('{"email":"'+ email +'","signo":"'+ signo +'"}');
    $.ajax({
        type: "GET",
        dataType : 'json',
        async: false,
        url: '/js/save_email.php',
        data: { data: JSON.stringify(stringLine) },
        success: function () { },
        failure: function() { }
    });
}