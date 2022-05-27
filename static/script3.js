$.ajax({
    url: "/get_movie_id",
    type: "POST",
    data: {},
    success: function (response) {
        id = (response.id).slice(-1);
        console.log(id);
        main.innerHTML = '';
        getMovie(id);
        getCredits(id);
    }
});

const API_KEY = 'api_key=f5f74b863a63eb977adc6287638d363f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const main = document.getElementById('main');
const credits = document.getElementById('movie_credits');


function getMovie(movie_id) {
    const url = BASE_URL + '/movie/' + movie_id + '?' + API_KEY + '&language=en-US';
    fetch(url).then(res => res.json()).then(data => {
        showMovie(data);
    })
}

function getCredits(movie_id) {
    const url = BASE_URL + '/movie/' + movie_id + '/credits?' + API_KEY + '&language=en-US';
    fetch(url).then(res => res.json()).then(data => {
        showCredits(data);
    })
}

function showCredits(data) {
    cast = data.cast;
    const castname = document.createElement('h1');
    castname.innerHTML = "Top Cast";
    castname.style.textAlign = "center";
    main.appendChild(castname);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie_credits');
    
    for (let i = 0; i < 8; ++i) {
        movieEl.innerHTML += `<div class="poster"><img src="${IMG_URL + cast[i].profile_path}" alt="${cast[i].name}">
    <h2>${cast[i].name}</h2></div>`
        main.appendChild(movieEl);
    }

}
function showMovie(data) {
    title = data.title;
    poster_path = data.poster_path;
    backdrop_path = data.backdrop_path;
    overview = data.overview;
    genres = data.genres;
    release_date = data.release_date;
    runtime = data.runtime;
    tagline = data.tagline;
    vote_average = data.vote_average;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `<div><img src="${IMG_URL + poster_path}" alt="${title}"></div>
        <div class="title"><h2>${title}</h2></div>
        <div class="movie-info">
            <div class="rating">Rating: ${vote_average}</div>
            <div class="overview">
            Plot: ${overview}
            </div>
            <div class="date">Release date: ${release_date}</div>
            <div class="tagline">Tagline: ${tagline}</div>
            <div class="time">Runtime ${runtime} min</div>
            <div class="genres">Genres: ${genres[0].name}, 
            ${genres[1].name}</div>
        </div>`
    main.appendChild(movieEl);
}

