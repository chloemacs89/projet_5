// Carousel control

const gap = 5;

const next = document.querySelectorAll(".next"),
      prev = document.querySelectorAll(".prev");


for (var i = 0; i < next.length; i++) {
    let crl = next[i].previousElementSibling;
    let width = crl.offsetWidth;
    next[i].onclick = function(e) {
	crl.scrollBy(width + gap, 0);
    };
}

for (var i = 0; i < prev.length; i++) {
    let crl = prev[i].nextElementSibling;
    let width = crl.offsetWidth;
    prev[i].onclick = function(e) {
	crl.scrollBy(-(width + gap), 0);
    };
}

// Modal control

var modal = document.getElementById("myModal");
const descriptionBtn = document.querySelectorAll(".description");
var closeBtn = document.getElementsByClassName("close")[0];

for (var j = 0; j < descriptionBtn.length; j++) {
    descriptionBtn[j].onclick = function(e) {
	modal.style.display = "block";
    };
}

closeBtn.onclick = function(e) {
    modal.style.display = "none";
};


window.onclick = function(e) {
    if (e.target == modal) {
	modal.style.display = "none";
    }
};


