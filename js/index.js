import config from '../config.json' assert { type: 'json' };

const mainContent = document.querySelector('main');

/* REQUISIÇÃO A TMDB API */
/* https://api.themoviedb.org/3/ */
async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${config.apikey}&language=pt-BR`;
  const response = await fetch(url);
  const obj = await response.json();
  return obj.results;
}
const popularMovies = await getPopularMovies();

/* https://image.tmdb.org/t/p/original${}, title, vote_average, overview */

/* RENDERIZAR FILME DINAMICAMENTE NO HTML */
function renderMovie(movie) {
  let favorite;

  if (movie.isFavorited) {
    favorite = '<span class="like active">Favoritar</span>';
  } else {
    favorite = '<span class="like">Favoritar</span>';
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
}

popularMovies.forEach((movie) => renderMovie(movie));

/* FAVORITAR OU DESFAVORITAR FILME */
function handleFavorite({ target }) {
  target.classList.toggle('active');
}

const favorites = document.querySelectorAll('.like');
favorites.forEach((favorite) =>
  favorite.addEventListener('click', handleFavorite)
);
