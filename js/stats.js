document.addEventListener("DOMContentLoaded", function () {
    cargarTotalPreguntas();
    cargarRespuestasDiarias();
    cargarRankingOraculos();
});

function cargarTotalPreguntas() {
    fetch("/js/preguntas_oraculo.json")
        .then(response => response.json())
        .then(data => {
            const total = data.contadorTotal || 0;
            animarNumero("numero-preguntas", total);
        })
        .catch(err => {
            console.error("Error cargando total:", err);
        });
}

function animarNumero(id, valorFinal) {
    const elemento = document.getElementById(id);
    let valorActual = 0;
    const duracion = 1500;
    const incremento = valorFinal / (duracion / 16);

    const intervalo = setInterval(() => {
        valorActual += incremento;

        if (valorActual >= valorFinal) {
            elemento.textContent = valorFinal.toLocaleString("es-ES");
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(valorActual).toLocaleString("es-ES");
        }
    }, 16);
}

function cargarRespuestasDiarias() {
    fetch("/js/preguntas_oraculo.json")
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById("respuestas-diarias");
            const dias = data.contadorDiario || [];

            // Ordenar por fecha (más reciente primero)
            dias.sort((a, b) => {
                const [d1, m1, y1] = a.dia.split("-");
                const [d2, m2, y2] = b.dia.split("-");
                return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
            });

            // Pillar últimos 7
            const ultimos7 = dias.slice(0, 7);

            contenedor.innerHTML = "";

            ultimos7.forEach(dia => {
                const div = document.createElement("div");
                div.classList.add("dia-card");

                div.innerHTML = `
                    <div class="dia-fecha">${formatearFecha(dia.dia)}</div>
                    <div class="dia-numero">${dia.numPreguntas.toLocaleString("es-ES")}</div>
                `;

                contenedor.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error cargando respuestas diarias:", err);
        });
}

function cargarRankingOraculos() {
    fetch("/js/oraculos_stats.json")
        .then(response => response.json())
        .then(data => {

            const contenedor = document.getElementById("listado-oraculos");

            if (!data || data.length === 0) {
                contenedor.innerHTML = "<p>No hay datos todavía</p>";
                return;
            }

            // Ordenar por número de preguntas (descendente)
            data.sort((a, b) => b.numPreguntas - a.numPreguntas);

            contenedor.innerHTML = "";

            data.forEach((oraculo, index) => {
                const div = document.createElement("a");
                div.href = `/${oraculo.url}`;
                div.classList.add("oraculo-item");

                div.innerHTML = `
                    <div class="oraculo-rank">#${index + 1}</div>
                    <div class="oraculo-info">
                        <div class="oraculo-nombre">${oraculo.name}</div>
                        <div class="oraculo-visitas">${oraculo.numPreguntas.toLocaleString()} consultas</div>
                    </div>
                `;

                contenedor.appendChild(div);
            });

        })
        .catch(err => {
            console.error("Error cargando ranking:", err);
        });
}

function formatearFecha(fecha) {
    const [dia, mes, año] = fecha.split("-");
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${dia} ${meses[parseInt(mes) - 1]}`;
}