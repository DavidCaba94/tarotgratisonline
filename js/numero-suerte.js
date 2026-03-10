document.addEventListener("DOMContentLoaded", function () {
    const numero = numeroSuerteDelDia(1, 99);
    document.getElementById("numero-suerte").innerHTML =
        "<div class='numero-resultado'>" + numero + "</div>" +
        "<p class='mensaje-numero'>Tu número de la suerte para hoy es el <strong>" + numero + "</strong>.</p>";
});

function numeroSuerteDelDia(min, max) {
    const hoy = new Date();
    const seed =
        hoy.getFullYear() * 10000 +
        (hoy.getMonth() + 1) * 100 +
        hoy.getDate();
    
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x);

    return Math.floor(random * (max - min + 1)) + min;
}
