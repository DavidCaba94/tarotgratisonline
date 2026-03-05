var bubbleProductosOpen = true;

// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', function() {

    // Toggle clase "animate" en el menú hamburguesa
    document.querySelectorAll('.hamburger-menu').forEach(function(menu) {
        menu.addEventListener('click', function() {
            document.querySelectorAll('.bar').forEach(function(bar) {
                bar.classList.toggle('animate');
            });
        });
    });

    // Función simple para slideToggle
    function slideToggle(element) {
        if (window.getComputedStyle(element).display === 'none') {
            element.style.display = 'block';
            element.style.height = 'auto';
        } else {
            element.style.display = 'none';
        }
    }

    // Menú principal
    var btnMenu = document.getElementById('btn-menu');
    var menuMovil = document.getElementById('menu-movil-desplegable');
    if(btnMenu && menuMovil){
        btnMenu.addEventListener('click', function() {
            slideToggle(menuMovil);
        });
    }

    // Menú Tarot
    var btnTarot = document.getElementById('btn-tarot');
    var menuTarot = document.getElementById('menu-tarot-desplegable');
    if(btnTarot && menuTarot){
        btnTarot.addEventListener('click', function() {
            slideToggle(menuTarot);
        });
    }

    var btnTarotMovil = document.getElementById('btn-tarot-movil');
    var menuTarotMovil = document.getElementById('menu-tarot-desplegable-movil');
    if(btnTarotMovil && menuTarotMovil){
        btnTarotMovil.addEventListener('click', function() {
            slideToggle(menuTarotMovil);
        });
    }

});