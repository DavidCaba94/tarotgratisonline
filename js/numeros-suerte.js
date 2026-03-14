document.addEventListener("DOMContentLoaded", function () {
    const numeros = numerosSuerteDelDia(1, 49, 6);
    let html = "<div class='numeros-resultado'>";
    numeros.forEach(n => {
        html += "<div class='numero-resultado'>" + n + "</div>";
    });
    html += "</div>";
    html += "<p class='mensaje-numero'>Tus números de la suerte para hoy son: <strong>" + numeros.join(", ") + "</strong>.</p>";

    document.getElementById("numero-suerte").innerHTML = html;
});

function numerosSuerteDelDia(min, max, cantidad) {
    const hoy = new Date();
    let seed = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
    function random() {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 5;
        return (seed < 0 ? ~seed + 1 : seed) % 1000 / 1000;
    }
    const numeros = new Set();
    while (numeros.size < cantidad) {
        const numero = Math.floor(random() * (max - min + 1)) + min;
        numeros.add(numero);
    }
    return Array.from(numeros).sort((a, b) => a - b);
}