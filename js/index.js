// chamada de funções
import {
  getPopularMovies,
  searchMovieAfterKeyPress,
} from './services/requests.js';
import { renderMovie } from './modules/render.js';
import { handleCheckbox } from './modules/events.js';

const mainContent = document.querySelector('main');
const input = document.querySelector('.search');
const siteTitle = document.querySelector('h1');
const checkbox = document.querySelector('.favorites');

const popularMovies = await getPopularMovies();

popularMovies.forEach((movie) => renderMovie(movie));

input.addEventListener('keypress', searchMovieAfterKeyPress);

siteTitle.addEventListener('click', () => {
  mainContent.innerHTML = '';
  checkbox.checked = false;
  popularMovies.forEach((movie) => renderMovie(movie));
});

checkbox.addEventListener('click', handleCheckbox);
