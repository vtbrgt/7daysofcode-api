import movies from '../movies.json' assert { type: 'json' };

const mainContent = document.querySelector('main');

function renderMovie(movie) {
  let favorite;

  if (movie.isFavorited) {
    favorite = '<span class="like active">Favoritar</span>';
  } else {
    favorite = '<span class="like">Favoritar</span>';
  }

  const markup = `
        <div class="movie-logo" style="background-image: url('${movie.poster}'); background-size: cover"></div>
        <div class="info">
            <h3 class="title">${movie.title}</h3>
            <div>
                <span class="score">${movie.score}</span>
                ${favorite}
            </div>
        </div>
        <p class="description">${movie.description}</p>
    `;

  const card = document.createElement('section');
  card.classList.add('movie-card');
  card.innerHTML = markup;

  mainContent.appendChild(card);
}
movies.forEach((movie) => renderMovie(movie));

function handleFavorite({ target }) {
  target.classList.toggle('active');
}

const favorites = document.querySelectorAll('.like');
favorites.forEach((favorite) =>
  favorite.addEventListener('click', handleFavorite)
);
