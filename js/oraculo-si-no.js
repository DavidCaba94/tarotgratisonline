document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const bars = document.querySelectorAll(".bar");

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            bars.forEach(bar => bar.classList.toggle("animate"));
        });
    }
    const btnMenu = document.getElementById("btn-menu");
    const menuMovil = document.getElementById("menu-movil-desplegable");

    if (btnMenu && menuMovil) {
        btnMenu.addEventListener("click", function () {
            toggleMenu(menuMovil);
        });
    }
    const menus = [
        ["btn-tarot", "menu-tarot-desplegable"],
        ["btn-tarot-movil", "menu-tarot-desplegable-movil"],
        ["btn-horoscopo", "menu-horoscopo-desplegable"],
        ["btn-horoscopo-movil", "menu-horoscopo-desplegable-movil"]
    ];
    menus.forEach(([btnId, menuId]) => {
        const btn = document.getElementById(btnId);
        const menu = document.getElementById(menuId);

        if (btn && menu) {
            btn.addEventListener("click", () => toggleMenu(menu));
        }
    });
    const botonOraculo = document.getElementById("boton-oraculo");
    const botonNuevaPregunta = document.getElementById("boton-nueva-pregunta");
    const inputPregunta = document.getElementById("pregunta");
    const formulario = document.getElementById("formulario-oraculo");
    const respuesta = document.getElementById("respuesta-oraculo");
    const textoPregunta = document.getElementById("texto-pregunta");
    const textoRespuesta = document.getElementById("texto-respuesta");
    const loading = document.getElementById("loading");
    if (botonOraculo) {
        botonOraculo.addEventListener("click", lanzarOraculo);
    }
    if (inputPregunta) {
        inputPregunta.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                lanzarOraculo();
            }
        });
    }
    if (botonNuevaPregunta) {
        botonNuevaPregunta.addEventListener("click", resetearOraculo);
    }
    function lanzarOraculo() {

        const pregunta = inputPregunta.value.trim();

        if (pregunta === "") {
            inputPregunta.style.border = "1px solid #ff0000";
            return;
        }

        textoPregunta.textContent = pregunta;

        formulario.classList.remove("visible");
        formulario.classList.add("invisible");

        respuesta.classList.remove("invisible");
        respuesta.classList.add("visible");

        const respuestaOraculo = comprobarRespuesta();

        textoRespuesta.textContent = respuestaOraculo;

        escribirFicheroPreguntas(pregunta, respuestaOraculo);

        setTimeout(() => {
            loading.classList.remove("visible");
            loading.classList.add("invisible");

            textoRespuesta.classList.remove("invisible");
            textoRespuesta.classList.add("visible");
        }, 1500);
    }
    function resetearOraculo() {

        inputPregunta.value = "";
        inputPregunta.style.border = "1px solid #ffffff";

        respuesta.classList.remove("visible");
        respuesta.classList.add("invisible");

        formulario.classList.remove("invisible");
        formulario.classList.add("visible");

        loading.classList.remove("invisible");
        loading.classList.add("visible");

        textoRespuesta.classList.remove("visible");
        textoRespuesta.classList.add("invisible");
    }
});


function generarAleatorio() {
    return Math.floor(Math.random() * 1001);
}
function comprobarRespuesta() {
    const resto = generarAleatorio() % 2;
    return resto === 0 ? "NO" : "SI";
}
function toggleMenu(menu) {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function escribirFicheroPreguntas(pregunta, respuesta) {
    const data = {
        pregunta: pregunta,
        respuesta: respuesta
    };
    fetch("/js/save_json.php?data=" + encodeURIComponent(JSON.stringify(data)))
        .then(() => {})
        .catch(() => {});
}