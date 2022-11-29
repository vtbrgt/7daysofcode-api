// definindo eventos à serem chamados no index.js

import { setFavoriteMovies } from './localStorage.js';
import { showFavoriteMovies } from '../services/requests.js';
import { getPopularMovies } from '../services/requests.js';
import { renderMovie } from './render.js';

const mainContent = document.querySelector('main');
const popularMovies = await getPopularMovies();

/* MOSTRAR OS FILMES FAVORITOS AO CLICAR NO CHECKBOX */
export function handleCheckbox({ target }) {
  mainContent.innerHTML = '';
  if (target.checked) {
    showFavoriteMovies();
  } else {
    popularMovies.forEach((movie) => renderMovie(movie));
  }
}

export function addFavoriteEvent() {
  const favorites = document.querySelectorAll('.like');
  favorites.forEach((favorite) =>
    favorite.addEventListener('click', setFavoriteMovies)
  );
}
