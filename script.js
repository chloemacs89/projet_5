/**
   |--------------------------------------------------
   | GET DATA FROM API PART
   |--------------------------------------------------
*/

var genre = {
    "Sci-Fi": [],
    "Fantasy": [],
    "Horror": []
};

var best_movie;

fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then((resp) => resp.json())
    .then(function(data) {
	best_movie = data["results"][0];
    });

async function getMoviesData(obj) {
    let movies_genre = Object.keys(obj);
    for(let item of movies_genre) {
	let page = 1;
	let genre = item;
	do {
	    let url = `http://localhost:8000/api/v1/titles?genre=${genre}&page=${page}&sort_by=-votes,-imdb_score`;
	    await fetch(url)
		.then((resp) => (resp.json()))
		.then(function(data) {
		    for(let elem of data["results"]) {
			obj[item].push(elem);
			if (obj[item].length == 7) {
			    break;
			}
		    }
		});
	    page++;
	} while (page < 3);
    }
}

getMoviesData(genre);

// END OF PART ////////////////////////////////////////////////////////////////

/**
   |--------------------------------------------------
   | CAROUSEL PART
   |--------------------------------------------------
*/

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

// END OF PART ////////////////////////////////////////////////////////////////

/**
   |--------------------------------------------------
   | MODAL WINDOW PART
   |--------------------------------------------------
*/

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
