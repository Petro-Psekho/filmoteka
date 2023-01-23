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
    // console.log(arr);
    // console.log(arr.results);
    // console.log(arr.results[0]);
    // console.log(arr.results[0].poster_path);
    // console.log(arr.results[0].title);
    // console.log(arr.results[0].genre_ids[1]);

    // const arrGenres = genres.data;
    // console.log('genres', arrGenres.genres);
    // console.log('genresID', arrGenres.genres[1].id);

    // if (arr.results[0].genre_ids[1] === arrGenres.genres[1].id) {
    //   console.log('genresName', arrGenres.genres[1].name);
    // }

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
    console.log('genres', arrGenres.genres);
    // console.log('genresID', arrGenres.genres[1].id);

    // if (arr.results[0].genre_ids[1] === arrGenres.genres[1].id) {
    //   console.log('genresName', arrGenres.genres[1].name);
    // }

    return arrGenres;
  } catch (error) {
    console.error(error);
  }
}

Promise.allSettled([movieGenres(), movieTrending()]).then(results =>
  results.forEach(result => console.log('result.value.genres', result.value))
);

movieTrending().then(rendersMarkup).catch(console.error());

function rendersMarkup(arr) {
  console.log('arr', arr.results);

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
  console.log(arr.results);
}

// rendersMarkup();
