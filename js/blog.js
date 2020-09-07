var arrayPosts = [];

$(document).ready(function(){
	$('.hamburger-menu').on('click', function() {
	    $('.bar').toggleClass('animate');
	});

	$('#btn-menu').on('click', function() {
	    $('#menu-movil-desplegable').slideToggle();
	});

	const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../json/posts.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);

            for(let item of posts) {
                arrayPosts.push(item);
            }
        }
    }

	console.log(arrayPosts);
});
