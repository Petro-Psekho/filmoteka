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

    const arr = response.data.results;

    // if (arr.results[0].genre_ids[1] === arrGenres.genres[1].id) {
    //   console.log('genresName', arrGenres.genres[1].name);
    // }

    return arr;
  } catch (error) {
    console.error(error);
  }
}

foo();

async function movieGenres() {
  try {
    const genres = await axios.get(
      `${GENRES_URL}?api_key=${API_KEY}&language=en-US`
    );

    const arrGenres = genres.data;
    // console.log('genres', arrGenres.genres);
    // console.log('genresID', arrGenres.genres[1].id);

    // if (arr.results[0].genre_ids[1] === arrGenres.genres[1].id) {
    //   console.log('genresName', arrGenres.genres[1].name);
    // }

    return arrGenres;
  } catch (error) {
    console.error(error);
  }
}

async function foo() {
  const test = await movieGenres();
  console.log('test', test.genres);
  const test2 = await movieTrending();
  console.log('test2', test2.results);

  // return Object.assign(test, test2);
  const test3 = Object.assign(test, test2);
  console.log('test3', test3);

  return test3;
}

movieTrending().then(rendersMarkup).catch(console.error());

async function rendersMarkup(test3) {
  // console.log('arr', arr.results);

  // const test = await movieGenres();
  // const test2 = await movieTrending();
  // const test3 = Object.assign(test, test2);
  // console.log('test3', test3);

  const markup = test3
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
