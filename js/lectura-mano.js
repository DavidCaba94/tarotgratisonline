var respuestasUsuario = [];
var preguntaActual = 1;
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

    inicializarPreguntas();

    $("#boton-siguiente").on('click', function() {
        if(!esFinal()){
            if($('input:radio[name=radio-group]').is(':checked')){
                respuestasUsuario.push($('input:radio[name=radio-group]:checked').val());
                preguntaActual++;
                avanzarFoto();
                avanzarPregunta();
            }
        } else {
            if($('input:radio[name=radio-group]').is(':checked')){
                respuestasUsuario.push($('input:radio[name=radio-group]:checked').val());
                $("#formulario-mano").slideToggle();
                $("#loading").removeClass("invisible");
                $("#loading").addClass("visible");
                setTimeout(function() {
                    $("#respuesta-mano").removeClass("invisible");
                    $("#respuesta-mano").addClass("visible");
                    $("#loading").removeClass("visible");
                    $("#loading").addClass("invisible");
                    $(".texto-info").css("display", "none");
                    mostrarPrediccion();
                }, 3000);
            }
        }
    });

});

function inicializarPreguntas() {
    $("#pregunta-mano").text(preguntas[preguntaActual-1]);
    $("#resp-1").text(respuestas[preguntaActual-1][0]);
    $("#resp-2").text(respuestas[preguntaActual-1][1]);
    $("#resp-3").text(respuestas[preguntaActual-1][2]);
    $("#resp-4").text(respuestas[preguntaActual-1][3]);
}

function avanzarFoto() {
    $("#img-mano").attr("src","/img/mano-"+preguntaActual+".png");
}

function avanzarPregunta() {
    $('input[name="radio-group"]').attr('checked', false);
    $("#pregunta-mano").text(preguntas[preguntaActual-1]);
    $("#resp-1").text(respuestas[preguntaActual-1][0]);
    $("#resp-2").text(respuestas[preguntaActual-1][1]);
    $("#resp-3").text(respuestas[preguntaActual-1][2]);
    $("#resp-4").text(respuestas[preguntaActual-1][3]);
    $("#resp-5").text(respuestas[preguntaActual-1][4]);
    $("#resp-6").text(respuestas[preguntaActual-1][5]);

    if(preguntaActual == 5 || preguntaActual == 8) {
        $(".radio-5").css("display", "block");
    }

    if(preguntaActual == 6) {
        $(".radio-4").css("display", "none");
    } else {
        $(".radio-4").css("display", "block");
    }

    if(preguntaActual == 8){
        $(".radio-6").css("display", "block");
        $("#boton-siguiente").text("Finalizar");
    }

    if(preguntaActual != 5 && preguntaActual != 8) {
        $(".radio-5").css("display", "none");
        $(".radio-6").css("display", "none");
    }
}

function esFinal() {
    var fin = false;

    if(preguntaActual > 7){
        fin = true;
    }

    return fin;
}

function mostrarPrediccion(){
    for(var i=0; i<8; i++){
        $(".contenedor-cartas").append(
            '<div class="row carta">'+
                '<div class="col-12 col-md-4">'+
                    '<img class="img-carta" src="/img/mano-'+(i+1)+'.png" />'+
                '</div>'+
                '<div class="col-12 col-md-8">'+
                    '<h3 class="titulo-carta">'+respuestas[i][respuestasUsuario[i]-1]+'</h3>'+
                    '<p class="descripcion-carta">'+predicciones[i][respuestasUsuario[i]-1]+'</p>'+
                '</div>'+
            '</div>'
        );
    }
}


var preguntas = ["¿Cómo es la palma de tu mano?","¿Cómo son tus dedos?","¿Cómo es tu pulgar?","¿Cómo es tu línea de la vida?","¿Cómo es tu línea del amor?","¿Cómo es tu línea del destino?","¿Cómo es tu línea de la cabeza?","¿Cómo es tu Monte de Venus?"];
var respuestas = [
                    ["Cuadrada y grande","Cuadrada y pequeña","Larga o cónica y Grande","Larga o cónica y pequeña"],
                    ["Cortos y delgados","Cortos y gruesos o carnosos","Largos o cónicos y delgados","Largos o cónicos y gruesos o carnosos"],
                    ["Largo","Largo y ancho","Corto","Corto y grueso"],
                    ["Larga y bien marcada","Larga y débil","Corta y bien marcada","Corta y débil"],
                    ["Termina bajo el dedo corazón","Termina bajo el dedo índice","Termina entre el dedo corazón y el índice","Se une a través de otra con la línea de la vida","Está interrumpida en algun punto"],
                    ["Recta","Entrecortada","Se mezcla con otras líneas"],
                    ["Larga y fuerte","Larga y débil","Corta y fuerte","Corta y débil"],
                    ["Muy rayado y con la piel fina","Líneas muy marcadas con la piel fina","Carnoso con la piel fina","Muy rayado con la piel gruesa","Líneas muy marcadas con la piel gruesa","Carnoso con la piel gruesa"]
                ];
var predicciones = [
                    ["La mano cuadrada es de una persona realista, ordenada, especulativa, pensativa, práctica, humilde, franca, honrada, cumplidora, a veces terca y excesivamente activa. Generalmente das una imagen de seguridad y confianza. Tiene habilidades para las matemáticas, la medicina, las leyes, y la arquitectura. Digna de confiar en ella con los ojos cerrados. Tu mano grande, significa que tienes una estructura mental fuerte, pero no te es fácil expresar tus sentimientos. Tienes costumbres muy tradicionales y tu mejor cualidad es la generosidad. Aparentas una personalidad tranquila y te agradan los placeres de la vida, te gustan los deportes y disfrutas la naturaleza. También, tienes facilidad para quedarte tranquilo ante las presiones de la vida diaria y ésta característica te ayudará a ejercer puestos de responsabilidad en los negocios.","La mano cuadrada es de una persona realista, ordenada, especulativa, pensativa, práctica, humilde, franca, honrada, cumplidora, a veces terca y excesivamente activa. Generalmente das una imagen de seguridad y confianza. Tiene habilidades para las matemáticas, la medicina, las leyes, y la arquitectura. Digna de confiar en ella con los ojos cerrados. Tienes una mano pequeña que significa que tienes inquietudes en diferentes aspectos de la vida. Eres una persona nerviosa, afectuosa, romántica, vulnerable y sobresales por tu entusiasmo y alegría. Puedes cambiar de opinión con mucha facilidad y tu objetivo es aceptar retos que casi nunca llegas a cumplir, ya que, aparecen nuevas metas que te fascinan mas que la anterior.","Tu mano larga o cónica significa que tienes percepciones y eres espontáneo, impresionable y romántico. Tienes amigos, pero a veces finges seguridad para disfrazar tus problemas internos. Eres muy generoso y capaz de sacrificarte. Sobresales en profesiones que tienen que ver con la sensibilidad artística. Tu mano grande, significa que tienes una estructura mental fuerte, pero no te es fácil expresar tus sentimientos. Tienes costumbres muy tradicionales y tu mejor cualidad es la generosidad. Aparentas una personalidad tranquila y te agradan los placeres de la vida, te gustan los deportes y disfrutas la naturaleza. También, tienes facilidad para quedarte tranquilo ante las presiones de la vida diaria y esta característica te ayudará a ejercer puestos de responsabilidad en los negocios.","Tu mano larga o cónica significa que tienes percepciones y eres espontáneo, impresionable y romántico. Tienes amigos, pero a veces finges seguridad para disfrazar tus problemas internos. Eres muy generoso y capaz de sacrificarte, Además tienes necesidad de entregar y recibir amor. Sobresales en profesiones que tienen que ver con la sensibilidad artística. Tienes una mano pequeña que significa que tienes inquietudes en diferentes aspectos de la vida. Eres una persona nerviosa, afectuosa, romántica, vulnerable y sobresales por tu entusiasmo y alegría. Puedes cambiar de opinión con mucha facilidad y tu objetivo es aceptar retos que casi nunca llegas a cumplir, ya que, aparecen nuevas metas que te fascinan mas que la anterior."],

                    ["Tus dedos cortos y delgados indican que eres una persona intuitiva, ordenada, reflexiva, inquieta, impulsiva y capaz de entender rápidamente los puntos mas importantes de una cuestión, trabajadora, responsable, eficaz y te gusta hacer las cosas bien. Tu mejor cualidad es la sinceridad.","Tus dedos cortos indican que eres una persona intuitiva, ordenada, reflexiva, inquieta, impulsiva y capaz de entender rápidamente los puntos mas importantes de una cuestión, trabajadora, responsable, eficaz y te gusta hacer las cosas bien. Tu mejor cualidad es la sinceridad. Tus dedos gruesos y carnosos indican naturaleza básica y reflexiva. Te gusta el lujo, los buenos alimentos y el placer. Eres un buen amante al que no le cuesta mucho trabajo conquistar. También eres una persona, romántica y halagadora. Algunas de tus características son sonrisa perpetua, entusiasmo, digno de confianza. Demuestras a tu familia y amigos cuanto los quieres. Podrías ser un buen líder.","Tus dedos cortos indican que eres una persona intuitiva, ordenada, reflexiva, inquieta, impulsiva y capaz de entender rápidamente los puntos mas importantes de una cuestión, trabajadora, responsable, eficaz y te gusta hacer las cosas bien. Tu mejor cualidad es la sinceridad. Tus dedos gruesos y carnosos indican naturaleza básica y reflexiva. Te gusta el lujo, los buenos alimentos y el placer. Eres un buen amante al que no le cuesta mucho trabajo conquistar. También eres una persona, romántica y halagadora. Algunas de tus características son sonrisa perpetua, entusiasmo, digno de confianza. Demuestras a tu familia y amigos cuanto los quieres. Podrías ser un buen líder.","Tus dedos largos o cónicos indican que eres una persona con mucha paciencia y detallista. Te inclinas a relacionarte con el mundo en un ambiente mas intelectual. Te gusta divagar y seleccionas muy bien a tus amigos, ya que consideras que pueden contribuir con tu desarrollo personal. Te encanta la historia y conocer el origen de todo lo que te rodea. Además eres una persona muy comprensiva en las relaciones amorosas. Tus dedos delgados revelan que tu personalidad es intelectual. Eres una persona de interior apasionante, pero se te dificulta compartirlo con cualquier persona. Si eres mujer, sobresaldrá en ti la sensibilidad y si eres hombre la agilidad mental. Tus superiores verán en ti a una persona con mucho potencial. Estabilizar tu economía es uno de tus grandes metas.","Tus dedos largos indican que eres una persona con mucha paciencia y detallista. Te inclinas a relacionarte con el mundo en un ambiente mas intelectual. Te gusta divagar y seleccionas muy bien a tus amigos, ya que consideras que pueden contribuir con tu desarrollo personal. Te encanta la historia y conocer el origen de todo lo que te rodea. Además eres una persona muy comprensiva en las relaciones amorosas. Tus dedos gruesos y carnosos indican naturaleza básica y reflexiva. Te gusta el lujo, los buenos alimentos y el placer. Eres un buen amante al que no le cuesta mucho trabajo conquistar. También eres una persona, romántica y halagadora. Algunas de tus características son sonrisa perpetua, entusiasmo, digno de confianza. Demuestras a tu familia y amigos cuanto los quieres. Podrías ser un buen líder."],

                    ["Tu pulgar largo significa que tienes una gran energía y una personalidad fuerte. Eres una persona impaciente y sobresales por tu gran voluntad, gran capacidad de sacrificio, decisión, imaginación. Si tu pulgar es muy largo significa que tienes espíritu capaz de influir en las demás personas y controlar cualquier situación. Si tu pulgar termina en punta, indica una dificultad para tomar decisiones, coquetería y necesidad de mantener a alguien cerca como guía, ya que tu inseguridad es característica de tu personalidad.","Tu pulgar largo y ancho indica que eres una persona con ideas finas, vanidosa, pasional y con mucha voluntad. Tienes unos deseos muy lejanos y te gusta contribuir con las personas que te rodean, aunque a ti te cuesta mucho pedir la ayuda de los demás. Si tu pulgar termina en una forma cuadrada, significa que buscas la equidad, eres tenaz, practico y muy fiel. Si tu pulgar en la base es muy ancho tu carácter es algo celoso y pesimista.","Tu pulgar corto significa que eres una persona con voluntad débil y sin confianza en ti misma. Algunas veces se te dificultara contener tu ira que de cualquier momento a otro puedes estallar y te sentirás culpable por los problemas que causes. Tu falta de iniciativa y de impulso hará que pases de un estado de hipersensibilidad y obediencia. Si tu pulgar es muy corto, eres una persona incapaz de asumir responsabilidades y que se impresiona fácilmente, perezosa y algunas veces apática.","Tu pulgar corto y grueso significa que eres una persona con voluntad débil y sin confianza en ti misma. Algunas veces se te dificultara contener tu ira que de cualquier momento a otro puedes estallar y te sentirás culpable por los problemas que causes. Tu falta de iniciativa y de impulso hará que pases de un estado de hipersensibilidad y obediencia. Si tu pulgar es muy corto, eres una persona incapaz de asumir responsabilidades y que se impresiona fácilmente, perezosa y algunas veces apática."],

                    ["Tu línea de la vida larga y bien marcada indica que eres una persona de gran condición física, saludable, con gran vitalidad y capacidad para enfrentarte a los problemas de la vida. Para ti no será fácil aceptar las derrotas debido a que tus experiencias serán intensas. Eres también una persona muy luchadora y para ti es muy fácil dar consejos a los demás. Probablemente tu vida sea larga. Pudo haber sido que tu infancia haya sido dura, pero aprendiste a encontrar la mejor manera de solucionar los problemas que se te han presentado. Tu carácter transmite alegría.","Tu línea de la vida larga y débil, significa que eres sensible a enfermarte y sueles ponerte nervioso. Tienes una mente sensible y te cuesta mucho trabajo mantenerte firme en una trayectoria. Al tomar decisiones importantes, lo pasas muy mal, porque no sabes si estas eligiendo la opción correcta. Te propones objetivos muy lejanos que te cansas a medio camino. Tus relaciones sexuales son buenas, ya que te adaptas muy bien a lo que exige tu pareja. Siempre necesitas la compañía de alguien.","Tu línea de la vida es corta y bien marcada, lo que significa que tu carácter es intenso y tienes una buena salud. En algunas ocasiones se te ocurren cosas increíbles, pero no te gusta contárselas a la gente porque piensas que no te creerán. Eres una persona divertida, extravagante, te gustan las fiestas, eres muy sociable. Te gusta viajar, conocer diferentes culturas, conocer sus lenguas y costumbres y experimentar cambios. Te gusta mucho cambiar, que algunas ocasiones ni tu misma te reconoces.","Tu línea de la vida corta y débil, indica que tienes una vida en la que la voluntad de las demás personas tiene el control."],

                    ["Tu línea del amor termina bajo el dedo corazón, lo que significa que tus relaciones las gobierna mas la cabeza que el corazón. Al principio sueles mostrarte poco sociable, a pesar de tu instinto apasionado. Sientes que tienes que tener el control de las situaciones, por lo que eres muy celoso. Si tu línea del amor es débil, no te gusta mostrar tus sentimientos. En algunas veces, defenderás todo lo que te pertenece y nadie podrá detenerte. Eso sí, no te gusta el compromiso y frecuentemente posesionaras a tu pareja, al notar cierta inseguridad.","Tu línea del amor termina bajo el dedo índice, lo que significa que eres muy idealista y te domina mas el corazón que la razón. Buscas a una pareja que sea romántica y te consideras muy afectuosa. También tienes mucha capacidad para dar y no es muy común que te acerques a alguien que no esté de acuerdo con lo que piensas. Tu forma de pensar y de actuar es muy tradicional. Si tu línea del amor se parece a una cadena, tendrás algo de inestabilidad afectiva y no tendrás al amor como proyecto futuro, porque eres un poco inconsistente.","Tu línea del amor termina entre el dedo corazón y el índice y eso significa que tienes un gran equilibrio entre la razón y las emociones. Eres una persona cálida, generosa y simpática. Tienes la capacidad para compartir y entender los deseos de las demás personas. En el campo del amor tendrás éxito y tu relación será sana y estable. Si tu línea del amor es un tridente, indica un equilibrio, cordura y serenidad en tu relación amorosa. Tu tipo de línea del amor, es auguro de victorias y logros en el amor.","Tu línea del amor unida a través de otra con la de la vida, indica facilidad para adaptarse a cualquier situación, ya que tienes recursos para todo. Si la línea que une tu línea del amor con la de la vida es recta, significa que usaras una personalidad atrevida cuando te relacionas con los demás, cosa que tus amigos encuentran divertida. Si la línea que las une es curva, indica tolerancia y respeto con los demás. Si la línea que las une esta entre el pulgar y el índice, tendrás facilidad para relacionarte sentimentalmente. Si la línea que las une está muy alejada de entre el pulgar y el índice, se te dificultará encontrar pareja.","Tu línea del amor esta interrumpida en algún punto, lo que significa que eres un poco inconstante en el amor. Intenta no atemorizarte mucho, porque si no tendrás muchas sensaciones desagradables que te costara liberar. Debes poner atención a tu actividad física, si no realizas la suficiente, deberás buscar algún tipo de ejercicio. También las amistades y la de pareja serán muy importantes para ti y las llevaras con mucho tacto. Eso sí, tu pareja no entenderá porque necesitas tanto a tus amigos."],

                    ["Tu línea del destino es recta, lo que significa que alcanzaras tus metas sin tener muchos obstáculos. Todo lo que deseas y te propongas será una meta que alcanzaras, aunque siempre tendrás la ayuda de personas que te facilitaran tus actividades. Generalmente las personas que te rodean tienen mucha confianza en ti y gracias a tu personalidad les ayudarás a enfrentarse a sus miedos. También tienes mucha confianza en tu mismo y tienes la fuerza para llevar al éxito tus proyectos. El inconveniente es que algunas veces habrá personas que se aprovechen de ti y no serás muy honesta con ellas.","Tu línea del destino es entrecortada, lo que significa que la suerte en tu vida será intermitente. Tendrás periodos difíciles, en los que las cosas no marcharan como tú lo deseas y en otros tendrás todo lo que necesites. Como en algunas ocasiones te han jugado sucio, te cuesta trabajo confiar en los demás y tendrás cuidado para hablar de tus cosas personales. Intenta estar alerta a las oportunidades que la vida te ofrece, porque si aprovechas esas oportunidades, tu futuro no tendrá muchos problemas. Si abres bien los ojos a lo que te rodea, llegarás hasta lugares que hoy consideras privilegiados.","Tu línea del destino se mezcla con otras líneas, lo que significa que eres bendecido por la buena suerte y el éxito y estarán contigo toda tu vida. Si tu línea del destino tiene ramificaciones hacia el dedo índice indica prestigio, abundancia de bienes materiales y un matrimonio afortunado. Si tu línea del destino finaliza hacia el dedo del corazón, indica éxito en el campo del amor. Si termina apuntando hacia el dedo anular, significa que sobresaldrás por tu inteligencia. Si la línea termina hacia el dedo menique, tus negocios serán fructíferos."],

                    ["Tu línea de la cabeza es larga, lo que indica que te caracterizas por tu inteligencia y por interesarte mucho en lo intelectual. Tienes mucha flexibilidad mental y emocional. Tienes también una personalidad muy distinguida. Si tu línea de la cabeza es muy larga que llega debajo del dedo meñique, tendrás una capacidad especial de cálculo. Si tu línea de la cabeza se une al inicio con la línea de la vida, significa que tu mentalidad es muy sensible. Tu línea de la cabeza es fuerte, lo que significa que tienes un sentido especial para captar cualquier situación, ya que sabes analizar muy bien debido a tu modo de pensar. Siempre superas tus problemas. Eres una persona con capacidad para encontrar el momento justo para decir o hacer lo mas favorable. Tus amigos valoran mucho tus consejos. Eres blanco de envidias.","Tu línea de la cabeza es larga, lo que indica que te caracterizas por tu inteligencia y por interesarte mucho en lo intelectual. Tienes mucha flexibilidad mental y emocional. Tienes también una personalidad muy distinguida. Si tu línea de la cabeza es muy larga que llega debajo del dedo meñique, tendrás una capacidad especial de cálculo. Si tu línea de la cabeza se une al inicio con la línea de la vida, significa que tu mentalidad es muy sensible. Tu línea de la cabeza es débil, lo que significa que tienes una mente un poco inquieta y siempre la tienes llena de proyectos que nunca terminas. Algunas veces tienes problemas emocionales debido a tu falta de concentración. Tienes relaciones un poco irregulares que a veces tienen periodos de inestabilidad que desaparecen con el paso del tiempo.","Tu línea de la cabeza es corta, lo que significa que tu forma de pensar se centra en cosas mundanas. Tienes problemas para concentrarte, por eso a veces se te dificulta concretar. Si tu línea de la cabeza tiene forma recta, tendrás pasiones amorosas llenas de celos. De lo que no hay duda es que te preocuparan las cuestiones económicas y de trabajo. Tu línea de la cabeza es fuerte, lo que significa que tienes un sentido especial para captar cualquier situación, ya que sabes analizar muy bien debido a tu modo de pensar. Siempre logras salir exitoso de los problemas. Eres una persona con capacidad para encontrar el momento justo para decir o hacer lo mas favorable. Tus amigos valoran mucho tus consejos y confían mucho en ti. Sabes escuchar a las personas. El problema será la envidia que te puedan tener.","Tu línea de la cabeza es corta, lo que significa que tu forma de pensar se centra en cosas mundanas. Tienes problemas para concentrarte, por eso a veces se te dificulta concretar. Si tu línea de la cabeza tiene forma recta, tendrás pasiones amorosas llenas de celos. De lo que no hay duda es que te preocuparan las cuestiones económicas y de trabajo. Tu línea de la cabeza es débil, lo que significa que tienes una mente un poco inquieta y siempre la tienes llena de proyectos que nunca terminas. Algunas veces tienes problemas emocionales debido a tu falta de concentración. Tienes relaciones un poco irregulares que a veces tienen periodos de inestabilidad que desaparecen con el paso del tiempo."],

                    ["Tienes un monte de venus muy rayado, lo que significa que eres una persona muy apasionada y a la que atrae casi todo lo que la rodea. Una de tus mas grandes preocupaciones es hacerle daño a los demás por tus comentarios. Si las líneas que tienes son poco profundas, significa que tus relaciones amorosas serán algo. Superficiales, aunque también indican una vida solitaria con problemas para relacionarte con el sexo opuesto. Tu monte de venus tiene la piel fina, lo que significa que eres sensible y observador. Tienes una gran relación con tu entorno, ya que siempre estas pendiente en lo que ocurre a tu alrededor. Tus problemas amorosos te pueden causar ansiedad. Algunas veces sentirás confusión en tus sentimientos, pero tus amigos te ayudaran a aclararte.","Tu monte de venus tiene las líneas muy marcadas, lo que significa te entregas totalmente a tu relación dándole mucha estabilidad y seguridad. Para ti el amor es sinónimo de entrega incondicional y todas las personas a tu alrededor confían en ti. Tu monte de venus tiene la piel fina, lo que significa que eres sensible y observador. Tienes una gran relación con tu entorno, ya que siempre estas pendiente en lo que ocurre a tu alrededor. Tus problemas amorosos te pueden causar ansiedad. Algunas veces sentirás confusión en tus sentimientos, pero tus amigos te ayudaran a aclararte.","Tu monte de venus es carnoso y con piel fina, lo que significa que eres una persona tierna y con gran bondad y tienes una gran capacidad para dar amor a las personas. Eres una persona con gran emotividad, la familia es muy importante para ti. Si tu monte de venus es muy pronunciado, significa que tienes mucha energía y emites amor por todos lados, aunque también eso indica que eres un poco estable, desleal y desordenado en tus sentimientos. Tu monte de venus tiene la piel fina, lo que significa que eres sensible y observador. Tienes una gran relación con tu entorno, ya que siempre estas pendiente en lo que ocurre a tu alrededor. Tus problemas amorosos te pueden causar ansiedad.","Tienes un monte de venus muy rayado, lo que significa que eres una persona muy apasionada. Una de tus mas grandes preocupaciones es hacerle daño a los demás por tus comentarios. Si las líneas que tienes son poco profundas, significa que tus relaciones amorosas serán algo superficiales, aunque también indican una vida solitaria con problemas para relacionarte con el sexo opuesto. Te cuesta mucho manejar las cuestiones amorosas. Vivirás grandes emociones, aunque no las expreses normalmente. Muestras mucha ternura y sensibilidad que a veces te llevan a las lágrimas, porque las emociones son muy fuertes para ti. No lo reconoces, pero te encanta que te halaguen. También las muestras de afecto como los abrazos y los besos son muy importantes para ti.","Tu monte de venus tiene las líneas muy marcadas, lo que significa te entregas totalmente a tu relación dándole mucha estabilidad y seguridad. Para ti el amor es sinónimo de entrega incondicional y todas las personas a tu alrededor confían en ti. Te cuesta mucho manejar las cuestiones amorosas. Vivirás grandes emociones, aunque no las expreses normalmente. Muestras mucha ternura y sensibilidad que a veces te llevan a las lágrimas, porque las emociones son muy fuertes para ti. No lo reconoces, pero te encanta que te halaguen. También las muestras de afecto como los abrazos y los besos son muy importantes para ti.","Tu monte de venus es carnoso, lo que significa que eres una persona tierna y con gran bondad y tienes una gran capacidad para dar amor. Eres una persona con gran emotividad, la familia es muy importante para ti. Si tu monte de venus es muy pronunciado, significa que tienes mucha energía y emites amor por todos lados, aunque también eso indica que eres un poco estable, desleal y desordenado en tus sentimientos. Te cuesta mucho manejar las cuestiones amorosas. Vivirás grandes emociones, aunque no las expreses normalmente. Muestras mucha ternura y sensibilidad que a veces te llevan a las lágrimas, porque las emociones son muy fuertes para ti. No lo reconoces, pero te encanta que te halaguen. También las muestras de afecto como los abrazos y los besos son muy importantes para ti."],
                   ];
