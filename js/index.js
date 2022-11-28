import config from '../config.json' assert { type: 'json' };

const mainContent = document.querySelector('main');
const input = document.querySelector('.search');
const siteTitle = document.querySelector('h1');
const checkbox = document.querySelector('.favorites');

/* FAVORITAR OU DESFAVORITAR FILME */
function addFavoriteEvent() {
  const favorites = document.querySelectorAll('.like');
  favorites.forEach((favorite) =>
    favorite.addEventListener('click', setFavoriteMovies)
  );
}

function setFavoriteMovies({ target }) {
  const id = target.parentNode.parentNode.querySelector('.title').id;

  target.classList.toggle('active');

  if (localStorage.getItem('favoriteMovies') == null) {
    localStorage.setItem('favoriteMovies', JSON.stringify([]));
  }

  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
  if (!favoriteMovies.includes(id)) {
    favoriteMovies.push(id);
  } else {
    const index = favoriteMovies.indexOf(id);
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
  try {
    const response = await fetch(url);
    const obj = await response.json();
    const final = obj.results.filter((obj) => obj.overview != '');
    return final;
  } catch (error) {
    console.log(error);
  }
}
const popularMovies = await getPopularMovies();

/* RENDERIZAR FILME DINAMICAMENTE NO HTML */
function renderMovie(movie) {
  let favorite = '<span class="like">Favoritar</span>';

  if (localStorage.getItem('favoriteMovies')) {
    const favoriteMovies = getFavoriteMovies();

    if (favoriteMovies.includes(movie.id.toString())) {
      favorite = '<span class="like active">Favoritar</span>';
    }
  }

  const markup = `
        <div class="movie-logo" style="background-image: url(https://image.tmdb.org/t/p/original${
          movie.poster_path
        }); background-size: cover"></div>
        <div class="info">
            <h3 class="title" id="${movie.id}">${movie.title}</h3>
            <div>
                <span class="score">${movie.vote_average.toFixed(1)}</span>
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
  try {
    const response = await fetch(url);
    const obj = await response.json();
    const final = obj.results.filter((obj) => obj.overview != '');
    return final;
  } catch (error) {
    console.log(error);
  }
}

async function searchMovieByID(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${config.apikey}&language=pt-BR`;
  try {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
  } catch (error) {
    console.log(error);
  }
}

async function searchMovieAfterKeyPress(event) {
  if (event.key == 'Enter' && input.value != '') {
    const searchedMovies = await searchMovie(input.value);
    mainContent.innerHTML = '';
    searchedMovies.forEach((movie) => renderMovie(movie));
    input.value = '';
  }
}

input.addEventListener('keypress', searchMovieAfterKeyPress);

siteTitle.addEventListener('click', () => {
  mainContent.innerHTML = '';
  popularMovies.forEach((movie) => renderMovie(movie));
});

/* MOSTRAR OS FILMES FAVORITOS AO CLICAR NO CHECKBOX */
function showFavoriteMovies() {
  const favoriteMovies = getFavoriteMovies();
  favoriteMovies.forEach(async (movie) => {
    const movieData = await searchMovieByID(movie);
    renderMovie(movieData);
  });
}

function handleCheckbox({ target }) {
  mainContent.innerHTML = '';
  if (target.checked) {
    showFavoriteMovies();
  } else {
    popularMovies.forEach((movie) => renderMovie(movie));
  }
}

checkbox.addEventListener('click', handleCheckbox);
