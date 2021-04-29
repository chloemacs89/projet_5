
/**
   |--------------------------------------------------
   | GET DATA FROM API PART
   |--------------------------------------------------
*/

var genre = {
    "Best-movies": [],
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
	do {
	    if (item == "Best-movies") {
		var url = `http://localhost:8000/api/v1/titles?page=${page}&sort_by=-votes,-imdb_score`;
	}
	    else {
		let genre = item;
		var url = `http://localhost:8000/api/v1/titles?genre=${genre}&page=${page}&sort_by=-votes,-imdb_score`;
	}
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


async function addDateToApp() {
    await getMoviesData(genre);
    let movie_genre = Object.keys(genre);
    for(let movGenre of movie_genre) {
	let zone = document.getElementById(movGenre);
	let div = zone.querySelectorAll(".grid-items");
	for (var i = 0; i < div.length; i++) {
	    div[i].querySelector("p").textContent = genre[movGenre][i]["title"];
	    let url = genre[movGenre][i]["image_url"];
	    div[i].style.backgroundImage = `url(${url})`;
	}
    }
}

// addDateToApp();

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
const gridContent = document.querySelectorAll(".grid-items");
var closeBtn = document.getElementsByClassName("close")[0];

function dataFromArray(data) {
    let str = "";
    for(let item of data) {
	str += item + ", ";
    }
    return str;
}


function setDataInModal(data) {
    modal.querySelector(".title").textContent = "Titre : " + data["title"];
    modal.querySelector(".genres").textContent = "Genre(s) : " + dataFromArray(data["genres"]);
    modal.querySelector(".date_published").textContent = "Date de sortie : " + data["date_published"];
    modal.querySelector(".rated").textContent = "Classification : " + data["rated"];
    modal.querySelector(".imdb_score").textContent = "Score IMDB : " + data["imdb_score"];
    modal.querySelector(".directors").textContent = "Réalisateur(s) : " + dataFromArray(data["directors"]);
    modal.querySelector(".duration").textContent = "Durée : " + data["duration"] + "min";
    modal.querySelector(".countries").textContent = "Pays : " + dataFromArray(data["countries"]);
    modal.querySelector(".worldwide_gross_income")
	.textContent = "Gains au Box-Office : " + data["worldwide_gross_income"] + "$";
    modal.querySelector(".actors").textContent = "Acteurs : " + dataFromArray(data["actors"]);
}

async function getInfoToModal() {
    await addDateToApp();
    for (var j = 0; j < descriptionBtn.length; j++) {
	let parent = descriptionBtn[j].parentElement;
	let movieGenre = parent.parentElement.getAttribute("id");
	let gender = genre[movieGenre];
	let movieIndex = j % 7;
	let currentMovie = gender[movieIndex];
	descriptionBtn[j].onclick = async function(e) {
	    await fetch("http://localhost:8000/api/v1/titles/" + currentMovie["id"])
		.then((resp) => (resp.json()))
		.then(function(data) {
		    modal.querySelector(".movie_pic").setAttribute("src", data["image_url"]);
		    setDataInModal(data);
		    modal.querySelector(".summary").textContent = "Résumé :\n" + data["long_description"];
		});
	    modal.style.display = "block";
	};
	gridContent[j].onclick = async function(e) {
	    await fetch("http://localhost:8000/api/v1/titles/" + currentMovie["id"])
		.then((resp) => (resp.json()))
		.then(function(data) {
		    modal.querySelector(".movie_pic").setAttribute("src", data["image_url"]);
		    setDataInModal(data);
		    modal.querySelector(".summary").textContent = "Résumé :\n" + data["long_description"];
		});
	    modal.style.display = "block";
	};	
    }   
}

getInfoToModal();

closeBtn.onclick = function(e) {
    modal.style.display = "none";
};


window.onclick = function(e) {
    if (e.target == modal) {
	modal.style.display = "none";
    }
};
