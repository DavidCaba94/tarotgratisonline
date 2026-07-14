/**
 * Combinaciones populares de la Calculadora del Amor.
 * - Genera enlaces de parejas aleatorias a partir de nombres frecuentes (España y Latinoamérica).
 * - Al hacer clic, rellena los inputs y REUTILIZA la lógica existente del botón #boton-amor.
 * - Botón "Mostrar más combinaciones" para añadir otras 10 sin recargar la página.
 * Módulo autocontenido (no depende de jQuery).
 */
(function () {
    "use strict";

    var LOTE = 10; // combinaciones por tanda

    /* ---- Nombres frecuentes (España + Latinoamérica) ---- */
    var MUJERES = [
        "María", "Lucía", "Sofía", "Valentina", "Camila", "Isabella", "Martina", "Daniela",
        "Paula", "Ana", "Laura", "Elena", "Carmen", "Sara", "Andrea", "Gabriela", "Natalia",
        "Adriana", "Fernanda", "Mariana", "Alejandra", "Carolina", "Patricia", "Claudia",
        "Verónica", "Rocío", "Marta", "Cristina", "Beatriz", "Lorena", "Emilia", "Julieta",
        "Renata", "Ximena", "Guadalupe", "Rosa", "Silvia", "Pilar", "Noelia", "Antonella"
    ];
    var HOMBRES = [
        "David", "Pablo", "Carlos", "Alejandro", "Lucas", "Mateo", "Hugo", "Sebastián",
        "Sergio", "Daniel", "Javier", "Diego", "Andrés", "Fernando", "Juan", "José", "Manuel",
        "Antonio", "Miguel", "Adrián", "Álvaro", "Rodrigo", "Gabriel", "Santiago", "Nicolás",
        "Emiliano", "Tomás", "Bruno", "Iván", "Rubén", "Marcos", "Óscar", "Raúl", "Jorge",
        "Luis", "Francisco", "Gonzalo", "Martín", "Emilio", "Ángel"
    ];

    // Construye ~400 parejas distintas combinando ambos conjuntos.
    function construirParejas() {
        var pares = [];
        for (var i = 0; i < MUJERES.length; i++) {
            for (var k = 0; k < 10; k++) {
                var j = (i * 3 + k) % HOMBRES.length; // rotación para variar los emparejamientos
                pares.push({ n1: MUJERES[i], n2: HOMBRES[j] });
            }
        }
        return pares;
    }

    var PAREJAS = construirParejas(); // array con 400 parejas

    /* ---- Plantillas de texto (los nombres van resaltados con <strong>) ---- */
    function s(n) { return "<strong>" + n + "</strong>"; }
    var PLANTILLAS = [
        function (a, b) { return "Calcula la compatibilidad entre " + s(a) + " y " + s(b); },
        function (a, b) { return "Descubre el porcentaje de amor entre " + s(a) + " y " + s(b); },
        function (a, b) { return "¿Son compatibles " + s(a) + " y " + s(b) + "?"; },
        function (a, b) { return "Calcula la afinidad entre " + s(a) + " y " + s(b); },
        function (a, b) { return "Comprueba la compatibilidad de " + s(a) + " y " + s(b); },
        function (a, b) { return "Descubre si " + s(a) + " y " + s(b) + " hacen buena pareja"; },
        function (a, b) { return "Calcula el porcentaje de amor entre " + s(a) + " y " + s(b); },
        function (a, b) { return "Comprueba la afinidad de " + s(a) + " y " + s(b); },
        function (a, b) { return "¿Existe química entre " + s(a) + " y " + s(b) + "?"; },
        function (a, b) { return "Calcula la compatibilidad amorosa entre " + s(a) + " y " + s(b); }
    ];

    /* ---- Utilidades ---- */
    function barajar(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    function clave(p) { return p.n1 + "|" + p.n2; }

    var mostradas = {}; // parejas ya mostradas en esta carga (evita repetir)

    // Selecciona n parejas aleatorias que no se hayan mostrado aún.
    function seleccionarParejas(n) {
        var disponibles = PAREJAS.filter(function (p) { return !mostradas[clave(p)]; });
        if (disponibles.length < n) { mostradas = {}; disponibles = PAREJAS.slice(); }
        var elegidas = barajar(disponibles).slice(0, n);
        elegidas.forEach(function (p) { mostradas[clave(p)] = true; });
        return elegidas;
    }

    /* ---- Render ---- */
    var contenedor = null;

    function crearEnlace(pareja, plantilla) {
        var a = document.createElement("a");
        a.href = "#";
        a.className = "combinacion-amor";
        a.setAttribute("data-nombre1", pareja.n1);
        a.setAttribute("data-nombre2", pareja.n2);
        a.innerHTML = plantilla(pareja.n1, pareja.n2);
        return a;
    }

    // Añade una tanda de parejas al contenedor con plantillas variadas (una distinta por enlace).
    function pintarTanda(parejas) {
        var plantillas = barajar(PLANTILLAS);
        var frag = document.createDocumentFragment();
        parejas.forEach(function (p, idx) {
            frag.appendChild(crearEnlace(p, plantillas[idx % plantillas.length]));
        });
        contenedor.appendChild(frag);
    }

    /* ---- Interacción: reutiliza la lógica del botón existente ---- */
    function rellenarYCalcular(n1, n2) {
        var input1 = document.getElementById("nombre-1");
        var input2 = document.getElementById("nombre-2");
        var boton = document.getElementById("boton-amor");
        if (!input1 || !input2 || !boton) return;

        input1.value = n1;
        input2.value = n2;
        input1.style.border = "1px solid #ffffff";
        input2.style.border = "1px solid #ffffff";

        boton.click(); // dispara exactamente el mismo comportamiento actual

        requestAnimationFrame(scrollAlResultado);
    }

    function scrollAlResultado() {
        var el = document.getElementById("respuesta-amor");
        if (!el) return;
        var y = el.getBoundingClientRect().top + window.pageYOffset - 90; // margen para la cabecera fija
        window.scrollTo({ top: y, behavior: "smooth" });
    }

    function onClickContenedor(e) {
        var enlace = e.target.closest(".combinacion-amor");
        if (!enlace || !contenedor.contains(enlace)) return;
        e.preventDefault();
        rellenarYCalcular(enlace.getAttribute("data-nombre1"), enlace.getAttribute("data-nombre2"));
    }

    /* ---- Init ---- */
    function init() {
        contenedor = document.getElementById("combinaciones-populares");
        if (!contenedor) return;

        contenedor.innerHTML = "";                 // sustituye los ejemplos estáticos
        pintarTanda(seleccionarParejas(LOTE));     // primera tanda aleatoria
        contenedor.addEventListener("click", onClickContenedor); // delegación (vale para las tandas nuevas)

        var btnMas = document.getElementById("mostrar-mas-combinaciones");
        if (btnMas) {
            btnMas.addEventListener("click", function () {
                pintarTanda(seleccionarParejas(LOTE)); // añade otras 10 sin recargar
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
