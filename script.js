const gap = 5;

const next = document.querySelectorAll(".next"),
      prev = document.querySelectorAll(".prev");


for (var i = 0; i < next.length; i++) {
    let crl = next[i].previousElementSibling;
    let width = crl.offsetWidth;
    next[i].onclick = function(e) {
	crl.scrollBy(width + gap, 0);
    }
}

for (var i = 0; i < prev.length; i++) {
    let crl = prev[i].nextElementSibling;
    let width = crl.offsetWidth;
    prev[i].onclick = function(e) {
	crl.scrollBy(-(width + gap), 0);
    }
}


