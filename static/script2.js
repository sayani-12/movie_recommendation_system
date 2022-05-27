$.ajax({
    url: "/get_ids",
    type: "POST",
    data: {},
    success: function (response) {
        console.log("movie_ids")
        ids = (response.ids).slice(-10)
        main.innerHTML = '';
        ids.forEach(getMovies);
    }
});

const API_KEY = 'api_key=f5f74b863a63eb977adc6287638d363f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const main = document.getElementById('main');

function getMovies(movie_id) {
    const url = BASE_URL + '/movie/' + movie_id + '?' + API_KEY + '&language=en-US';
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data);
    })
}

function showMovies(data) {
    title = data.title;
    poster_path = data.poster_path;
    overview = data.overview;
    id = data.id;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="title"><h3>${title}</h3></div>
        <div class="movie-info">
        <a href="/movie_info"><button class="button" onclick="get_id('${id}')">Read more</button></a>          
        </div>`
    main.appendChild(movieEl);
}


function get_id(id) {
    console.log("button clicked");
    console.log(id);
    const request = new XMLHttpRequest();
    request.open('POST', `/ProcessUserId/${JSON.stringify(id)}`);
    request.send();
}


