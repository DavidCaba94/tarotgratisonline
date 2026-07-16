/**
 * Herramienta de Compatibilidad entre Signos.
 * JavaScript puro (sin librerías). Módulos separados:
 *   datos · enlace canónico · generación del resultado · interpretación · render · animaciones · navegación
 * Preparada para conectar con la futura arquitectura /compatibilidad-signos/{a}/{b}/.
 */
(function () {
    "use strict";

    /* =========================================================
       DATOS
       ========================================================= */
    // Orden del zodiaco (índice = data-id). Coincide con el criterio canónico del scaffold.
    var SIGNOS = [
        { slug: "aries", nombre: "Aries", elemento: "fuego" },
        { slug: "tauro", nombre: "Tauro", elemento: "tierra" },
        { slug: "geminis", nombre: "Géminis", elemento: "aire" },
        { slug: "cancer", nombre: "Cáncer", elemento: "agua" },
        { slug: "leo", nombre: "Leo", elemento: "fuego" },
        { slug: "virgo", nombre: "Virgo", elemento: "tierra" },
        { slug: "libra", nombre: "Libra", elemento: "aire" },
        { slug: "escorpio", nombre: "Escorpio", elemento: "agua" },
        { slug: "sagitario", nombre: "Sagitario", elemento: "fuego" },
        { slug: "capricornio", nombre: "Capricornio", elemento: "tierra" },
        { slug: "acuario", nombre: "Acuario", elemento: "aire" },
        { slug: "piscis", nombre: "Piscis", elemento: "agua" }
    ];

    var COLOR_ELEMENTO = { fuego: "#ff6b4a", tierra: "#5fb85f", aire: "#e2b93b", agua: "#4f9fe0" };

    // Dimensiones que se muestran como barras. "global" = valor de la matriz actual.
    var DIMENSIONES = [
        { key: "amor", label: "Amor", icon: "❤️" },
        { key: "comunicacion", label: "Comunicación", icon: "🤝" },
        { key: "pasion", label: "Pasión", icon: "🔥" },
        { key: "emocional", label: "Compatibilidad emocional", icon: "🧠" },
        { key: "estable", label: "Relación estable", icon: "💍" },
        { key: "global", label: "Compatibilidad global", icon: "⭐" }
    ];

    // Porcentajes actuales (matriz simétrica 12x12). Se mantienen tal cual.
    var MATRIZ = [
        [60, 65, 65, 65, 90, 45, 70, 80, 90, 50, 55, 65],
        [65, 70, 70, 80, 70, 90, 75, 85, 50, 95, 80, 85],
        [65, 70, 75, 60, 80, 75, 90, 60, 75, 50, 90, 50],
        [65, 80, 60, 75, 70, 75, 60, 95, 55, 45, 70, 90],
        [90, 70, 80, 70, 85, 75, 65, 75, 95, 45, 70, 75],
        [45, 90, 75, 75, 75, 70, 80, 85, 70, 95, 50, 70],
        [70, 75, 90, 60, 65, 80, 80, 85, 80, 85, 95, 50],
        [80, 85, 60, 95, 75, 85, 85, 90, 80, 65, 60, 95],
        [90, 50, 75, 55, 95, 70, 80, 80, 85, 55, 60, 75],
        [50, 95, 50, 45, 45, 95, 85, 65, 55, 85, 70, 85],
        [55, 80, 90, 70, 70, 50, 95, 60, 60, 70, 80, 55],
        [65, 85, 50, 90, 75, 70, 50, 95, 75, 85, 55, 80]
    ];

    // Estado
    var sel1 = null, sel2 = null;

    /* =========================================================
       ENLACE CANÓNICO
       Una única URL por combinación. Criterio: orden del zodiaco (índice menor primero).
       Aries+Leo y Leo+Aries -> /compatibilidad-signos/aries/leo/
       ========================================================= */
    function urlCanonica(a, b) {
        var i = Math.min(a, b), j = Math.max(a, b);
        return "/compatibilidad-signos/" + SIGNOS[i].slug + "/" + SIGNOS[j].slug + "/";
    }

    /* =========================================================
       GENERACIÓN DEL RESULTADO
       global = matriz. Las otras 5 dimensiones se derivan de forma determinista
       alrededor del global (mismo par -> mismos valores siempre).
       ========================================================= */
    function fnv1a(str) {
        var bytes = new TextEncoder().encode(str);
        var h = 0x811c9dc5;
        for (var i = 0; i < bytes.length; i++) {
            h ^= bytes[i];
            h = Math.imul(h, 0x01000193) >>> 0;
        }
        return h >>> 0;
    }

    function claveCanonica(a, b) {
        var i = Math.min(a, b), j = Math.max(a, b);
        return SIGNOS[i].slug + "|" + SIGNOS[j].slug;
    }

    function derivar(clave, key, global) {
        var off = (fnv1a(clave + "|" + key) % 31) - 15; // -15..+15
        return Math.max(40, Math.min(99, global + off));
    }

    function generarValores(a, b) {
        var i = Math.min(a, b), j = Math.max(a, b);
        var clave = claveCanonica(a, b);
        var global = MATRIZ[i][j];
        return {
            amor: derivar(clave, "amor", global),
            comunicacion: derivar(clave, "comunicacion", global),
            pasion: derivar(clave, "pasion", global),
            emocional: derivar(clave, "emocional", global),
            estable: derivar(clave, "estable", global),
            global: global
        };
    }

    /* =========================================================
       INTERPRETACIÓN (basada en reglas, sin IA)
       Compone: tramo global + punto fuerte + punto a trabajar + matiz condicional.
       ========================================================= */
    function interpretar(v, nombreA, nombreB) {
        var frases = [];
        var pareja = nombreA + " y " + nombreB;

        // 1) Tramo global
        if (v.global >= 85) frases.push("<strong>" + pareja + "</strong> forman una de esas parejas con una conexión natural y magnética. La química se percibe casi desde el primer momento.");
        else if (v.global >= 70) frases.push("Entre <strong>" + pareja + "</strong> existe una compatibilidad muy buena y una base sólida sobre la que construir una relación duradera.");
        else if (v.global >= 55) frases.push("La compatibilidad entre <strong>" + pareja + "</strong> es equilibrada: hay puntos muy fuertes y otros que merecerá la pena trabajar poco a poco.");
        else frases.push("<strong>" + pareja + "</strong> son una pareja de contrastes. No es la combinación más sencilla, pero esas diferencias también pueden enriquecer mucho la relación.");

        // 2) Punto fuerte (dimensión más alta de las cinco)
        var subs = [
            { key: "amor", val: v.amor }, { key: "comunicacion", val: v.comunicacion },
            { key: "pasion", val: v.pasion }, { key: "emocional", val: v.emocional },
            { key: "estable", val: v.estable }
        ];
        var fuerte = subs.slice().sort(function (x, y) { return y.val - x.val; })[0];
        var flte = {
            amor: "El <strong>amor</strong> es su gran punto fuerte: hay un cariño sincero que sostiene la relación.",
            comunicacion: "Se entienden con facilidad; la <strong>comunicación</strong> fluye entre ellos de forma natural.",
            pasion: "La <strong>pasión</strong> es intensa y ayuda a mantener viva la chispa con el paso del tiempo.",
            emocional: "Conectan a un nivel <strong>emocional</strong> profundo y se comprenden sin necesidad de muchas palabras.",
            estable: "Tienen madera para construir una relación <strong>estable</strong> y con proyección de futuro."
        };
        frases.push(flte[fuerte.key]);

        // 3) Punto a trabajar (dimensión más baja, si es notablemente baja)
        var debil = subs.slice().sort(function (x, y) { return x.val - y.val; })[0];
        if (debil.key !== fuerte.key && debil.val < 65) {
            var dbl = {
                amor: "Quizá les convenga cuidar más el <strong>romanticismo</strong> del día a día para que el amor no se dé por sentado.",
                comunicacion: "Su mayor reto será la <strong>comunicación</strong>: hablar las cosas con calma marcará la diferencia.",
                pasion: "La <strong>pasión</strong> puede necesitar algo de chispa extra para no caer en la rutina.",
                emocional: "Deberán trabajar la <strong>conexión emocional</strong> para acompañarse bien en los momentos difíciles.",
                estable: "La <strong>estabilidad</strong> no llegará sola: requerirá compromiso y paciencia por ambas partes."
            };
            frases.push(dbl[debil.key]);
        }

        // 4) Matiz condicional
        if (v.pasion >= 80 && v.amor >= 80) frases.push("Amor y pasión se combinan aquí en una mezcla difícil de resistir.");
        else if (v.comunicacion >= 75 && v.estable >= 75) frases.push("Diálogo y estabilidad son la base perfecta para una relación a largo plazo.");
        else if (v.global < 55 && v.pasion >= 75) frases.push("Aunque no todo sea fácil, la atracción entre ambos es innegable.");

        return frases;
    }

    /* =========================================================
       ANIMACIONES
       ========================================================= */
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function animarContador(el, target, dur) {
        var ini = performance.now();
        function paso(t) {
            var p = Math.min(1, (t - ini) / dur);
            el.textContent = Math.round(easeOutCubic(p) * target) + "%";
            if (p < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
    }

    /* =========================================================
       RENDER
       ========================================================= */
    var refs = {};

    function chipSigno(signo, idx, grupo) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "compat-signo";
        b.setAttribute("role", "radio");
        b.setAttribute("aria-checked", "false");
        b.setAttribute("data-id", idx);
        b.setAttribute("data-grupo", grupo);
        b.style.setProperty("--sc", COLOR_ELEMENTO[signo.elemento]);
        b.innerHTML =
            '<img src="/img/signos/' + signo.slug + '.png" alt="" aria-hidden="true"/>' +
            '<span>' + signo.nombre + '</span>';
        return b;
    }

    function renderSelector() {
        [1, 2].forEach(function (grupo) {
            var cont = refs["signos" + grupo];
            cont.innerHTML = "";
            SIGNOS.forEach(function (s, idx) { cont.appendChild(chipSigno(s, idx, grupo)); });
        });
    }

    function seleccionar(grupo, idx, chip) {
        var cont = refs["signos" + grupo];
        Array.prototype.forEach.call(cont.querySelectorAll(".compat-signo"), function (c) {
            c.classList.remove("seleccionado");
            c.setAttribute("aria-checked", "false");
        });
        chip.classList.add("seleccionado");
        chip.setAttribute("aria-checked", "true");
        if (grupo === 1) sel1 = idx; else sel2 = idx;
        refs.btnCalcular.disabled = (sel1 === null || sel2 === null);
    }

    function renderBarras(valores) {
        refs.barras.innerHTML = "";
        DIMENSIONES.forEach(function (d) {
            var val = valores[d.key];
            var fila = document.createElement("div");
            fila.className = "compat-barra" + (d.key === "global" ? " compat-barra-global" : "");
            fila.innerHTML =
                '<div class="compat-barra-cab">' +
                    '<span class="compat-barra-label">' + d.icon + " " + d.label + "</span>" +
                    '<span class="compat-barra-pct" data-target="' + val + '">0%</span>' +
                "</div>" +
                '<div class="compat-barra-track" role="progressbar" aria-label="' + d.label +
                    '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + val + '">' +
                    '<div class="compat-barra-fill"></div>' +
                "</div>";
            refs.barras.appendChild(fila);
        });
        // Animación con escalonado (crecimiento de barra + contador)
        var filas = refs.barras.querySelectorAll(".compat-barra");
        Array.prototype.forEach.call(filas, function (fila, idx) {
            setTimeout(function () {
                fila.classList.add("visible");
                var fill = fila.querySelector(".compat-barra-fill");
                var pct = fila.querySelector(".compat-barra-pct");
                var target = parseInt(pct.getAttribute("data-target"), 10);
                fill.style.width = target + "%";
                animarContador(pct, target, 900);
            }, idx * 130);
        });
    }

    function renderInterpretacion(valores, a, b) {
        var frases = interpretar(valores, SIGNOS[a].nombre, SIGNOS[b].nombre);
        refs.interpretacion.innerHTML = frases.map(function (f) {
            return '<p class="compat-interpretacion-p">' + f + "</p>";
        }).join("");
    }

    function renderCTA(a, b) {
        var na = SIGNOS[a].nombre, nb = SIGNOS[b].nombre;
        refs.ctaTitulo.textContent = "¿Quieres descubrir por qué " + na + " y " + nb + " tienen esta compatibilidad?";
        refs.ctaLink.setAttribute("href", urlCanonica(a, b));
    }

    function renderResultado() {
        var a = sel1, b = sel2;
        var valores = generarValores(a, b);

        // Cabecera de la pareja
        refs.resImg1.src = "/img/signos/" + SIGNOS[a].slug + ".png";
        refs.resImg1.alt = SIGNOS[a].nombre;
        refs.resNombre1.textContent = SIGNOS[a].nombre;
        refs.resImg2.src = "/img/signos/" + SIGNOS[b].slug + ".png";
        refs.resImg2.alt = SIGNOS[b].nombre;
        refs.resNombre2.textContent = SIGNOS[b].nombre;

        renderBarras(valores);
        renderInterpretacion(valores, a, b);
        renderCTA(a, b);

        // Aparición del resultado
        refs.resultado.hidden = false;
        // reinicia la animación de entrada
        refs.resultado.classList.remove("entra");
        void refs.resultado.offsetWidth;
        refs.resultado.classList.add("entra");

        // Scroll suave al resultado
        requestAnimationFrame(function () {
            var y = refs.resultado.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: y, behavior: "smooth" });
        });
    }

    /* =========================================================
       NAVEGACIÓN / EVENTOS (incluye menús, en JS puro)
       ========================================================= */
    function toggleDisplay(el) {
        if (!el) return;
        el.style.display = (getComputedStyle(el).display === "none") ? "block" : "none";
    }

    function initMenus() {
        var btnMenu = document.getElementById("btn-menu");
        if (btnMenu) {
            btnMenu.addEventListener("click", function () {
                var bar = btnMenu.querySelector(".bar");
                if (bar) bar.classList.toggle("animate");
                toggleDisplay(document.getElementById("menu-movil-desplegable"));
            });
        }
        [["btn-tarot", "menu-tarot-desplegable"], ["btn-tarot-movil", "menu-tarot-desplegable-movil"]]
            .forEach(function (par) {
                var btn = document.getElementById(par[0]);
                if (btn) btn.addEventListener("click", function () { toggleDisplay(document.getElementById(par[1])); });
            });
    }

    function initHerramienta() {
        refs.signos1 = document.getElementById("compat-signos-1");
        refs.signos2 = document.getElementById("compat-signos-2");
        refs.btnCalcular = document.getElementById("btn-calcular");
        refs.resultado = document.getElementById("compat-resultado");
        refs.barras = document.getElementById("compat-barras");
        refs.interpretacion = document.getElementById("compat-interpretacion");
        refs.ctaTitulo = document.getElementById("compat-cta-titulo");
        refs.ctaLink = document.getElementById("compat-cta-link");
        refs.resImg1 = document.getElementById("compat-res-img-1");
        refs.resImg2 = document.getElementById("compat-res-img-2");
        refs.resNombre1 = document.getElementById("compat-res-nombre-1");
        refs.resNombre2 = document.getElementById("compat-res-nombre-2");
        if (!refs.signos1 || !refs.signos2 || !refs.btnCalcular) return;

        renderSelector();

        // Delegación: selección de signo en cualquiera de los dos grupos
        [refs.signos1, refs.signos2].forEach(function (cont) {
            cont.addEventListener("click", function (e) {
                var chip = e.target.closest(".compat-signo");
                if (!chip || !cont.contains(chip)) return;
                seleccionar(parseInt(chip.getAttribute("data-grupo"), 10),
                            parseInt(chip.getAttribute("data-id"), 10), chip);
            });
        });

        refs.btnCalcular.addEventListener("click", function () {
            if (sel1 === null || sel2 === null) return;
            renderResultado();
        });

        var btnReiniciar = document.getElementById("btn-reiniciar");
        if (btnReiniciar) {
            btnReiniciar.addEventListener("click", function () {
                var y = refs.signos1.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    }

    function init() {
        initMenus();
        initHerramienta();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
