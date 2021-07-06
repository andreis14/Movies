function getUrlParam(name) {
  //"?altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8"
  const search = location.search.substr(1); // substr scoate semnul intrebarii din query string

  //"altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8""
  const keyValuePairs = search.split('&');

  // array de stringuri cheie=valoare
  for (const pair of keyValuePairs) {
    // Array destructuring
    const [key, value] = pair.split('=');

    if (key === name) {
      return value;
    }
  }

  console.warn(
    'The query parameter you tried to get: "%s" is not available in the URL.',
    name
  );
  return undefined;
}

function movieDetail() {
  fetch('https://movies-app-siit.herokuapp.com/movies/6018075fa1c19b0022112a02')
    .then((res) => res.json())
    .then((data) => renderCard(data));
}

function renderCard(details) {
  const container = document.createElement('div');
  container.classList.add('container-details');

  const movieTitle = document.createElement('h1');
  movieTitle.innerText = details.Title + '(2017)';

  const imdb = document.createElement('span');
  imdb.classList.add('imdb');
  imdb.innerText = 'Imdb Rating: ' + details.imdbRating + '/10';

  const starOutter = document.createElement('div');
  starOutter.classList.add('stars-outer');

  const starInner = document.createElement('div');
  starInner.classList.add('stars-inner');

  starOutter.appendChild(starInner);
  imdb.appendChild(starOutter);

  const movieImg = document.createElement('img');
  movieImg.src = details.Poster;

  const moviePlot = document.createElement('p');
  moviePlot.innerText = details.Plot;

  const released = document.createElement('p');
  released.innerText = 'Released: ' + details.Released;

  const production = document.createElement('p');
  production.innerText = 'Production: ' + details.Production;

  const actors = document.createElement('p');
  actors.innerText = 'Actors: ' + details.Actors;

  const language = document.createElement('p');
  language.innerText = 'Language: ' + details.Language;

  const wrapper = document.createElement('a');

  wrapper.appendChild(movieTitle);
  wrapper.appendChild(imdb);
  wrapper.appendChild(movieImg);
  wrapper.appendChild(moviePlot);
  wrapper.appendChild(released);
  wrapper.appendChild(production);
  wrapper.appendChild(actors);
  wrapper.appendChild(language);
  container.appendChild(wrapper);

  const wrapperContainer = document.querySelector('main');
  wrapperContainer.appendChild(container);

  const starPercentage = (7.3 / 10) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  document.querySelector(`.stars-inner`).style.width = starPercentageRounded;
}

movieDetail();
