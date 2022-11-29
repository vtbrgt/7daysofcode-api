// funções relacionadas à manipulação do localStorage

/* FAVORITAR OU DESFAVORITAR FILME */
export function setFavoriteMovies({ target }) {
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

export function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'));
}
