import config from '../config.json' assert { type: 'json' };

const mainContent = document.querySelector('main');
const input = document.querySelector('.search');
const siteTitle = document.querySelector('h1');

/* FAVORITAR OU DESFAVORITAR FILME */
function addFavoriteEvent() {
  const favorites = document.querySelectorAll('.like');
  favorites.forEach((favorite) =>
    favorite.addEventListener('click', setFavoriteMovies)
  );
}

function setFavoriteMovies({ target }) {
  const titulo = target.parentNode.parentNode.querySelector('.title').innerText;

  target.classList.toggle('active');

  if (localStorage.getItem('favoriteMovies') == null) {
    localStorage.setItem('favoriteMovies', JSON.stringify([]));
  }

  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
  if (!favoriteMovies.includes(titulo)) {
    favoriteMovies.push(titulo);
  } else {
    const index = favoriteMovies.indexOf(titulo);
    favoriteMovies.splice(index, 1);
  }
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'));
}

/* REQUISIÇÃO A TMDB API */
/* https://api.themoviedb.org/3/ */
async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${config.apikey}&language=pt-BR`;
  const response = await fetch(url);
  const obj = await response.json();
  const final = obj.results.filter((obj) => obj.overview != '');
  return final;
}
const popularMovies = await getPopularMovies();

/* RENDERIZAR FILME DINAMICAMENTE NO HTML */
function renderMovie(movie) {
  let favorite = '<span class="like">Favoritar</span>';

  if (localStorage.getItem('favoriteMovies')) {
    const favoriteMovies = getFavoriteMovies();

    if (favoriteMovies.includes(movie.title)) {
      favorite = '<span class="like active">Favoritar</span>';
    }
  }

  const markup = `
        <div class="movie-logo" style="background-image: url(https://image.tmdb.org/t/p/original${movie.poster_path}); background-size: cover"></div>
        <div class="info">
            <h3 class="title">${movie.title}</h3>
            <div>
                <span class="score">${movie.vote_average}</span>
                ${favorite}
            </div>
        </div>
        <p class="description">${movie.overview}</p>
    `;

  const card = document.createElement('section');
  card.classList.add('movie-card');
  card.innerHTML = markup;

  mainContent.appendChild(card);
  addFavoriteEvent();
}

popularMovies.forEach((movie) => renderMovie(movie));

/* PESQUISA DE FILMES */
async function searchMovie(value) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${config.apikey}&language=pt-BR&query=${value}`;
  const response = await fetch(url);
  const obj = await response.json();
  const final = obj.results.filter((obj) => obj.overview != '');
  return final;
}

async function searchMovieAfterKeyPress(event) {
  if (event.key == 'Enter' && input.value != '') {
    const searchedMovies = await searchMovie(input.value);
    mainContent.innerHTML = '';
    searchedMovies.forEach((movie) => renderMovie(movie));
  }
}

input.addEventListener('keypress', searchMovieAfterKeyPress);

siteTitle.addEventListener('click', () => {
  mainContent.innerHTML = '';
  popularMovies.forEach((movie) => renderMovie(movie));
});

// ao clicar no checkbox renderizar os filmes da lista de filmes do localStorage
