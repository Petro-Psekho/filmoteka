import axios from 'axios';

const inputQuery = document.querySelector('.js-search');
inputQuery.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const { query } = e.currentTarget;
  console.log(query.value);
}

const API_KEY = 'a148ed5961285512fd3954af576af4a0';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const ID_URL = `${BASE_URL}/movie/`;

async function movieTrendingApi(poster_path, original_title) {
  try {
    const response = await axios.get(`${TREND_URL}?api_key=${API_KEY}`);
    console.log(response.data.results);

    return response;
  } catch (error) {
    console.error(error);
  }
}

movieTrendingApi();

function rendersMarkup(trending) {
  console.log(response);
  const markup = response.data.results
    .map(result => {
      return `<div>
                <img src="" alt="">
                <h2></h2>
                <p></p>
              </div>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// rendersMarkup();
