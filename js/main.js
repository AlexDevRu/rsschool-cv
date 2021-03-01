var links  = document.querySelectorAll('.header__menu a');
Array.from(links).forEach(function(link) {

});

var body = document.querySelector('body');
var popup = document.getElementById('popup');
var projects = document.getElementsByClassName("projects-item");
var close = document.getElementsByClassName("close")[0];

Array.from(projects).forEach(function(p) {
	p.onclick = function() {
		console.log(p);
		console.log(popup);
		popup.querySelector('.popup-image').append(p.querySelector('img').cloneNode(true));
		popup.querySelector('.popup-text').append(p.querySelector('h3').cloneNode(true));
		popup.querySelector('.popup-text').append(p.querySelector('.hidden-info').cloneNode(true));
	    popup.style.display = "block";
	    body.classList.toggle("lock");
	};
});

close.onclick = function() {
    popup.style.display = "none";
    clear();
};

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
        clear();
    }
};

function clear() {
	popup.querySelector('.popup-image').innerHTML = '';
	popup.querySelector('.popup-text').innerHTML = '';
	body.classList.toggle("lock");
}