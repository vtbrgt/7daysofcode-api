// funções relacionadas à requisições fetch

import config from '/config.json' assert { type: 'json' };
import { getFavoriteMovies } from '../modules/localStorage.js';
import { renderMovie } from '../modules/render.js';

const mainContent = document.querySelector('main');

/* REQUISIÇÃO A TMDB API */
export async function getPopularMovies() {
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

export async function searchMovieAfterKeyPress(event) {
  if (event.key == 'Enter' && event.target.value != '') {
    const searchedMovies = await searchMovie(event.target.value);
    mainContent.innerHTML = '';
    searchedMovies.forEach((movie) => renderMovie(movie));
    event.target.value = '';
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

/* MOSTRAR OS FILMES FAVORITOS AO CLICAR NO CHECKBOX */
export function showFavoriteMovies() {
  const favoriteMovies = getFavoriteMovies();
  favoriteMovies.forEach(async (movie) => {
    const movieData = await searchMovieByID(movie);
    renderMovie(movieData);
  });
}
