/* Menús de navegación en JS puro (sin jQuery), reutilizable por cualquier página */
(function () {
    "use strict";

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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMenus);
    } else {
        initMenus();
    }
})();
