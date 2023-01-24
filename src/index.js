import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const inputQuery = document.querySelector('.js-search');
inputQuery.addEventListener('submit', onSearch);

const trendingGallery = document.querySelector('.gallery');

function onSearch(e) {
  e.preventDefault();
  const { query } = e.currentTarget;
  console.log(query.value);
}

const API_KEY = 'a148ed5961285512fd3954af576af4a0';

const TREND_URL = `/trending/movie/week`;
const GENRES_URL = `/genre/movie/list`;

async function movieTrending() {
  try {
    const response = await axios.get(`${TREND_URL}?api_key=${API_KEY}`);

    const arr = response.data;

    console.log(arr);

    return arr;
  } catch (error) {
    console.error(error);
  }
}

async function movieGenres() {
  try {
    const genres = await axios.get(
      `${GENRES_URL}?api_key=${API_KEY}&language=en-US`
    );

    const arrGenres = genres.data;

    return arrGenres;
  } catch (error) {
    console.error(error);
  }
}

async function compareObject() {
  const genersObj = await movieGenres();
  console.log('genersObj', genersObj.genres);
  const trendingObj = await movieTrending();
  console.log('trendingObj', trendingObj.results);

  let arrObj = [genersObj.genres, trendingObj.results];

  console.log(arrObj);

  for (let i = 0; i < arrObj.length; i++) {
    if (i.genre_ids === i.id) {
      let gen = genersObj.genres[i].name;
      console.log(gen);
    }
  }
}

compareObject();

movieTrending().then(rendersMarkup).catch(console.error());

async function rendersMarkup(arr) {
  const markup = arr.results
    .map(result => {
      return `<li>
                <article>
                  <img src="https://www.themoviedb.org/t/p/w200${result.poster_path}" loading="lazy" alt="${result.title}">
                  <h2  data-id="${result.id}">${result.title}</h2>
                    <div class="js-genres">
                       <p>${result.genre_ids}</p>
                       <p>${result.release_date}</p>
                    </div>
              </article>
            </li>`;
    })
    .join('');

  trendingGallery.insertAdjacentHTML('beforeend', markup);
}

// rendersMarkup();
