var signosNumerados = ["aries","tauro","geminis","cancer","leo","virgo","libra","escorpio","sagitario","capricornio","acuario","piscis"];
var predicciones = [];
$(document).ready(function(){
	$('#text-dia').text(new Date().getDate() + ' - ' + (new Date().getMonth()+1) + ' - ' + new Date().getFullYear());
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

    obtenerPredicciones();
    setTimeout(function() {
        setPredicciones();
    }, 1500);  
});

function obtenerPredicciones() {
    fecha = new Date().getDate() + '-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear();
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/json/horoscopo-diario.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let predis = JSON.parse(this.responseText);
            if ((new Date().getMonth()+1) % 2 === 0) {
                predicciones[0] = predis.find(item => item.signo === 'aries').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[1] = predis.find(item => item.signo === 'tauro').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[2] = predis.find(item => item.signo === 'geminis').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[3] = predis.find(item => item.signo === 'cancer').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[4] = predis.find(item => item.signo === 'leo').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[5] = predis.find(item => item.signo === 'virgo').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[6] = predis.find(item => item.signo === 'libra').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[7] = predis.find(item => item.signo === 'escorpio').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[8] = predis.find(item => item.signo === 'sagitario').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[9] = predis.find(item => item.signo === 'capricornio').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[10] = predis.find(item => item.signo === 'acuario').prediccionesPar[new Date().getDate() - 1].prediccion;
                predicciones[11] = predis.find(item => item.signo === 'piscis').prediccionesPar[new Date().getDate() - 1].prediccion;
            } else {
                predicciones[0] = predis.find(item => item.signo === 'aries').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[1] = predis.find(item => item.signo === 'tauro').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[2] = predis.find(item => item.signo === 'geminis').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[3] = predis.find(item => item.signo === 'cancer').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[4] = predis.find(item => item.signo === 'leo').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[5] = predis.find(item => item.signo === 'virgo').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[6] = predis.find(item => item.signo === 'libra').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[7] = predis.find(item => item.signo === 'escorpio').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[8] = predis.find(item => item.signo === 'sagitario').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[9] = predis.find(item => item.signo === 'capricornio').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[10] = predis.find(item => item.signo === 'acuario').prediccionesImpar[new Date().getDate() - 1].prediccion;
                predicciones[11] = predis.find(item => item.signo === 'piscis').prediccionesImpar[new Date().getDate() - 1].prediccion;
            }
        }
    }
}

function setPredicciones() {
    $("#loading").removeClass("visible");
    $("#loading").addClass("invisible");
    $("#box-horoscopos").removeClass("invisible");
    $("#box-horoscopos").addClass("visible");
    $("#pred-aries").text(predicciones[0]);
    $("#pred-tauro").text(predicciones[1]);
    $("#pred-geminis").text(predicciones[2]);
    $("#pred-cancer").text(predicciones[3]);
    $("#pred-leo").text(predicciones[4]);
    $("#pred-virgo").text(predicciones[5]);
    $("#pred-libra").text(predicciones[6]);
    $("#pred-escorpio").text(predicciones[7]);
    $("#pred-sagitario").text(predicciones[8]);
    $("#pred-capricornio").text(predicciones[9]);
    $("#pred-acuario").text(predicciones[10]);
    $("#pred-piscis").text(predicciones[11]);
}