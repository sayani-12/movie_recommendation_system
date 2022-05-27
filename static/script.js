const API_KEY = 'api_key=f5f74b863a63eb977adc6287638d363f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const movie_ids = [19995, 10192, 138843, 206647, 49026, 49529, 559, 38757, 99861, 767, 209112, 1452, 10764, 43074, 57201, 2454, 24428, 1865, 41154, 122917, 1930, 20662, 57158, 2268, 254, 597, 271110, 135397];

movie_ids.forEach(getMovies);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


function getMoviesBySearch(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMoviesBySearch(data.results);
        console.log(data);
    })
}

function getMovies(movie_id) {
    const url = BASE_URL + '/movie/' + movie_id + '?' + API_KEY + '&language=en-US';
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data);
    })
}

main.innerHTML = '';
var idx = 1;
function showMovies(data) {
    title = data.title
    poster_path = data.poster_path
    overview = data.overview;
    vote_average = data.vote_average;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.classList.add('details');
    movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="title"><h3>${title}</h3></div>
        <div class="movie-info">
            <span class="rating">${vote_average}</span>
            <div class="overview">
            ${overview}
            </div>
            <a href="/recommendations"><button class="button" onclick="get_title('${title}')">Watch Now</button></a>          
        </div>`
    idx++;
    main.appendChild(movieEl);
}

function showMoviesBySearch(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
        <div class="title"><h3>${title}</h3></div>
        <span class="rating">${vote_average}</span>
        <div class="overview">
        ${overview}
        </div>
            <a href="/recommendations"><button class="button" onclick="get_title('${title}')">Watch Now</button></a>         
        </div>`
        main.appendChild(movieEl);
    })
}

function get_title(movie_name) {
    console.log("button clicked");
    console.log(movie_name);
    const request = new XMLHttpRequest();
    request.open('POST', `/ProcessUserInfo/${JSON.stringify(movie_name)}`);
    request.send();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMoviesBySearch(SEARCH_URL + '&query=' + searchTerm)
    }
    else {
        main.innerHTML = '';
        movie_ids.forEach(getMovies);
    }
})
