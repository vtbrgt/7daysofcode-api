// função usada para renderizar na página os filmes recebidos pela API

import { getFavoriteMovies } from './localStorage.js';
import { addFavoriteEvent } from './events.js';

const mainContent = document.querySelector('main');

/* RENDERIZAR FILME DINAMICAMENTE NO HTML */
export function renderMovie(movie) {
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
