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

    generarReparto();
    generarCartas();

});

function generarCartas(){
    for(var i=0; i<22; i++){
        $("#tablero-tarot").append('<div id="card" class="carta carta-'+repartoCartas[i]+'" onclick="voltearCarta('+repartoCartas[i]+')">'+
                                        '<div class="front">'+
                                            '<img class="img-carta" src="img/reverso2.png" />'+
                                        '</div>'+
                                        '<div class="back">'+
                                            '<img class="img-carta-volteada" src="img/cartas/carta-'+repartoCartas[i]+'.png" />'+
                                        '</div>'+
                                    '</div>');
        $(".carta-"+repartoCartas[i]).click();
    }
    cartasVolteadas = [];
    primeraEjecucion = false;
}

function voltearCarta(id){
    if(cartasVolteadas.length < 3){
        $(".carta-"+id).flip();
        totalVolteadas++;
        if(totalVolteadas > 21 && !cartaHaSalido(id)){
            cartasVolteadas.push(id);
            deshabilitarClick(id);
            if(cartasVolteadas.length == 3){
                for(var i=0; i<=21; i++){
                    deshabilitarClick(i);
                }
                setTimeout(function() {
                    $("#tablero-tarot").slideToggle();
                    $("#loading").removeClass("invisible");
                    $("#loading").addClass("visible");
                    generarRespuesta();
                }, 1500);
            }
        }
    }
}

function deshabilitarClick(id){
    if(!primeraEjecucion){
        $(".carta-"+id).off('click');
    }
}

function cartaHaSalido(id){
    var haSalido = false;

    for(var i=0; i<3; i++){
        if(cartasVolteadas[i] == id){
            haSalido = true;
        }
    }

    return haSalido;

}

function generarReparto(){
    repartoCartas = repartoCartas.sort(function() {return Math.random() - 0.5});
}

function generarRespuesta(){
    $("#texto-eleccion").text("Tu tirada dice lo siguiente:");
    setTimeout(function() {
        for(var i=0; i<3; i++){
            $("#contenedor-cartas").append('<div class="row carta-respuesta">'+
                                                '<div class="col-12 col-md-4">'+
                                                    '<img class="img-carta-respuesta" src="img/cartas/carta-'+cartasVolteadas[i]+'.png" />'+
                                                '</div>'+
                                                '<div class="col-12 col-md-8">'+
                                                    '<h3 class="titulo-carta">'+titulosCartas[cartasVolteadas[i]]+'</h3>'+
                                                    '<p class="descripcion-carta">'+descripcionesCartas[cartasVolteadas[i]]+'</p>'+
                                                '</div>'+
                                            '</div>');
        }

        $("#loading").removeClass("visible");
        $("#loading").addClass("invisible");
        $("#respuesta-tarot").removeClass("invisible");
        $("#respuesta-tarot").addClass("visible");

    }, 2000);

}


var titulosCartas = ["El Loco","El Mago","La Sacerdotisa","La Emperatriz","El Emperador","El Sumo Sacerdote","Los Enamorados","El Carro","La Justicia","El Ermitaño","La Rueda de la Fortuna","La Fuerza","El Colgado","La Muerte","La Templanza","El Diablo","La Torre","La Estrella","La Luna","El Sol","El Juicio","El Mundo"];
var descripcionesCartas = ["El Loco es una carta muy poderosa de la baraja del Tarot que usualmente representa un nuevo comienzo – y como consecuencia el fin de algo en tu vida anterior. La posición del Loco en tu tirada revela qué aspectos de tu vida pueden estar sujetos a cambios. El Loco anuncia que se vienen importantes decisiones que pueden ser difíciles de tomar, y que pueden significar un riesgo para ti. Acércate a los cambios con optimismo y cuidado para obtener el resultado más positivo posible.",
    "El Mago generalmente se asocial con los comunicadores inteligentes y hábiles. Su presencia en tu tirada indica que posees un nivel de autoconfianza y determinación que te permiten traducir las ideas en acciones. Ésta es una carta muy práctica cuyas revelaciones son mejor aplicadas a los aspectos pragmáticos y físicos de tu vida, mas no en los teóricos o efímeros. Tu éxito en emprendimientos futuros en la política o los negocios dependerán de tu propia fuerza de voluntad y determinación.",
    "Tu asociación con la Sacerdotisa sugiere que posees buen juicio en la forma de una fuerte intuición. Ella puede estar indicando que la razón debe pasar a segundo plano frente al instinto. Tu cabeza debe confiar en la sabiduría de tu corazón. Sin embargo, ella también simboliza la ayuda de la naturaleza y su presencia en ciertas partes de tu tirada puede indicar que alguien cercano a ti va a venir en tu rescate con su intuición. La intuición también es más efectiva para ver aquello que está oculto a los sentidos. Por lo tanto, la Sacerdotisa puede también simbolizar una advertencia de hechos ocultos que son o serán importantes para ti.",
    "Tradicionalmente se le ha asociado con una fuerte influencia maternal, la presencia de la Emperatriz te trae excelentes noticias si estás buscando la armonía en tu matrimonio o esperar iniciar una familia. Cualquier actividad artística en la que estés actualmente envuelto será más exitosa ya que esta carta con frecuencia encuentra a aquellos que están expuestos a fuertes ráfagas de energía creativa o artística. Sin embargo, esa energía creativa puede no estar en la forma de una pintura o un proyecto artístico. Esta carta también sugiere una fuerte posibilidad de embarazo -- no necesariamente tuya, pero podrías ver una nueva adición a tu familia o la familia de un amigo cercano en el futuro cercano. Esta carta es de buen augurio para ti y quienes te rodean.",
    "El Emperador es la contraparte de la Emperatriz y simboliza una influencia poderosa, generalmente de naturaleza masculina. Esto también puede incluir conceptos en tu vida que han sido considerados históricamente masculinos, como el liderazgo y autoridad, autodisciplina y la estabilidad a través del poder de la acción. Sus influencias positivas sugieren que puedes estar en el camino de una promoción o avance, pero también puede ser neutral. Usualmente es el compañero de aquellos destinados a asumir una mayor responsabilidad, puede presagiar cambios o pérdidas que requieren que des un paso adelante para asumir una mayor carga a la que ya tenías en el pasado. Cualquiera sea el ímpetu del cambio, indica que puedes poseer una fuerza interior fuera de lo común que te obligará a actuar y liderar.",
    "Dependiendo de tu propia naturaleza, el Sumo Sacerdote puede significar cosas muy diferentes. Básicamente representa la doctrina, pero la doctrina puede venir en manera de enseñanza y guía o de una autoridad rígida. En qué parte de tu tirada aparece también es importante dado que a menudo indica tu propia perspectiva de las convenciones morales, religiosas y sociales del mundo. Si se lo considera sabiamente, ayuda a mostrarnos el camino hacia la realización.",
    "Tu primer instinto será asociar esta carta como representante del amor, pero al igual que el amor ésta no posee una naturaleza simple. El amor no solo viene en formas diversas sino que los Amantes pueden indicar que se avecinan decisiones difíciles o importantes en tu vida. Esto es malo en el sentido de que estas decisiones son por lo general mutuamente excluyentes, son caminos a dos futuros totalmente diferentes. Pero también es Buena ya que confirma que al menos uno de esos caminos te llevará al lugar correcto. Por lo tanto, si encuentras esta carta en tu tirada debes de tomarla en cuenta con cautela pero sin miedo. Ella dice que se vienen decisiones difíciles, incluso dolorosas, pero que la decisión correcta que traerá un resultado positivo está al alcance de tu mano.",
    "Tienes trabajo arduo frente a ti. Se puede resolver rápidamente, pero El Carro es una carta fuerte y la labor a la que te estás comprometiendo probablemente sea larga y difícil. Es muy posible que experimentes caminos duros, largos, largas pendientes ascendentes, callejones sin salida y reveses dolorosos. Un buen resultado sólo puede ser asegurado si la carta está de pie. Pero no pierdas la esperanza. Este duro camino te inspirará un fuerte sentido de propósito, la habilidad de triunfar a través de organización y Resistencia, y la confianza que solo poseen aquellos que han hecho algo que no creían posible. Aprovechado correctamente, pocas fuerzas pueden enfrentarse contra una persona así.",
    "Es muy bueno encontrar la carta de la Justicia en tu tirada si has actuado con bondad y equidad respecto a los demás, especialmente si has sido una víctima. Es un indicador importante de una resolución positiva, aunque cómo y de qué clase dependerá de tus propias experiencias. Sin embargo, si has sido injusto, abusivo e inmoral en tus tratos entonces presta atención. En el mejor de los casos, esta carta representa para los injustos una advertencia para que cambien su forma de ser antes de que les caiga un castigo, y en el peor de los casos es un mensaje de que ya es demasiado tarde. En casos neutros puede simplemente estar diciéndote que busques el equilibro en tu vida.",
    "Hay momentos en la vida en que uno debe dar un paso atrás y examinar cuidadosamente las situaciones y decisiones que toma. El encontrar al Ermitaño en tu turada sugiere que este momento ha llegado para ti. Necesitas de un periodo de reflexión interior, lejos de las actuales demandas de tu posición. Este retiro puede ser físico o una búsqueda interior. Sólo una introspección honesta y profunda te llevará a una solución.",
    "La Rueda de la Fortuna simboliza los ciclos de la vida y habla de nuevos inicios. Es muy probable que encuentres que estos eventos sean positivos, pero al ser regidos por la suerte, puede que estén fuera de tu control e influencia. Atiende a aquellas cosas que puedes controlar con cuidado, y aprende a no sufrir con aquellos que no puedes controlar.",
    "La Fuerza es la forma más básica de poder y tú la posees de alguna manera. Esta es una carta muy feliz si te encuentras luchando contra una enfermedad o recuperándote de alguna lesión. Como he de sospecharse, su influencia sobre ti y el uso que le des puede orientarse hacia la luz o la oscuridad. Es probable que tiendas a enfrentarte a tus problemas con valentía y los conquistes a través de perseverancia y voluntad. Con esta habilidad de superar los obstáculos de la vida viene también la responsabilidad de controlarte a ti mismo. Esta carta puede ser una alerta para tomar las riendas de tus propias acciones y emociones antes de que te dañen a ti o a las personas que te importan.",
    "El Colgado se puede interpretar de dos maneras distintas. Todo cambio es a su vez una pequeña muerte, ya que lo viejo debe morir para crear lo nuevo. Puede simplemente indicar un cambio en tu futuro que tal vez esté más allá de tu control, y que será una decisión de la cual, para bien o para mal, no podrás retractarte. La otra interpretación habla de sacrificio. Aunque no sea fácil de saber si este sacrificio es grande o pequeño. Ambas interpretaciones se mantienen implícitas y deberás de pensar mucho antes de tomar una decisión en tu vida.",
    "La Muerte indica cambios en tu futuro. Este cambio se puede dar en casi cualquier aspecto de tu vida, pero de seguro será permanente, significativo y absoluto. La Muerte sugiere una completa separación entre el pasado y el futuro y será muy probablemente dolorosa. A pesar de la sensación de pérdida que la pueda acompañar, La Muerte cumple un rol natural e importante de la vida, y nos lleva eventualmente a la aceptación. Es una parte necesaria para seguir avanzando y verás que los cambios son más sencillos si los aceptas en vez de luchar en su contra. Espera el fin de una amistad cercana, un trabajo, un matrimonio o incluso de la vida, pero no te enfoques demasiado en lo negativo.",
    "La Templanza es una carta optimista que te anima a encontrar un equilibrio en tu vida y abordar los problemas con una actitud calmada. Ella reconoce que las fuerzas opuestas no necesitan estar en guerra dentro de ti. Pisa con cuidado en todas las decisiones importantes que tomes. Confía en que las buenas decisiones llevarán a un resultado positive para ti.",
    "El Diablo está en el negocio de la trampa. Señala que hay una situación de la cual no hay escapatoria, o un camino que conduce a ésta. El aviso puede permitirte evitar la trampa, o tal vez no. El tipo de trampa y cómo debes de evitarla dependerá del lugar que el Diablo ocupe en tu tirada y de las cartas que lo rodean. Esta carta no predice la condenación, solo la necesidad de prudencia.",
    "Oscura y amenazante, la Torre es la encarnación de la complicación y el conflicto. No solo el cambio, sino el movimiento brusco y desagradable causado por los acontecimientos imprevistos y traumáticos que forman parte de la vida. La Torre en tu tirada siempre es una amenaza, pero la vida inevitablemente implica tragedia, y debes de decidir si la enfrentarás con gracia.",
    "La presencia de la Estrella significa un periodo de descanso y renovación para ti. Esta renovación puede ser spiritual, física o ambas. Es un signo particularmente positivo de que tú o alguien cercano a ti se están recuperando de una enfermedad o lesión. Es una luz en la oscuridad iluminando tu futuro y tu pasado.",
    "Algo en tu vida no es lo que parece. Tal vez hay algo que no has comprendido bien o hay una verdad que te rehúsas a aceptar. También puede significar que hay algo importante que se te está siendo ocultado por otra persona. Esto puede causar preocupación y depresión en tu vida y la Luna es un fuerte indicador de que debes de apoyarte en tu intuición para ver a través del subterfugio.",
    "El sol representa un desarrollo positivo y tiene una Buena influencia inherente. Sugiere ganancia personal y alegría, y que las metas personales están al alcance de tus manos si estás dispuesto a esforzarte por ellas. Si estás embarcándote en un nuevo emprendimiento personal, como el matrimonio o empezar una familia, el Sol es de particular influencia.",
    "El Juicio habla sobre una transición, pero a diferencia de la Muerte o la Torre, el cambio no es súbito, ni procede de la suerte o la intuición, sino que es un cambio que proviene de la razón. Significa que los planes, que con frecuencia han tardado tiempo en llevarse a cabo, van a rendir frutos, Si apunta hacia el futuro, también puede hablar de la naturaleza del cambio. Si se necesita tomar una decisión, debes de dejar que tu mente la tome. En este caso, la lógica es mejor guía que la intuición. Debes estar preparado para tomar una gran decisión en tu vida, probablemente una que dará forma al siguiente capítulo de tu vida.",
    "El Mundo es un indicador de un cambio importante e inexorable, de amplitud tectónica. Este cambio representa una oportunidad para tu para terminar con lo Viejo y darle un buen inicio a lo Nuevo. Esta carta indica un crecimiento en la madurez, un sentido de equilibrio interno y un entendimiento más profundo. Sugiere que puedes estar aproximándote a una compresión más madura de tu identidad y la seguridad en ti mismo que viene con la edad. También representa la caída de las barreras, a veces de sentido espiritual, pero a veces en el sentido puramente físico, indicando un futuro con viajes."];
