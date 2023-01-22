import axios from 'axios';

const inputQuery = document.querySelector('.js-search');
inputQuery.addEventListener('submit', onSearch);

const trendingGallery = document.querySelector('.gallery');

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

async function movieTrending() {
  try {
    const response = await axios.get(`${TREND_URL}?api_key=${API_KEY}`);
    const arr = response.data;

    console.log(arr.results);
    console.log(arr.results[0]);
    console.log(arr.results[0].poster_path);
    console.log(arr.results[0].title);

    return arr;
  } catch (error) {
    console.error(error);
  }
}

movieTrending().then(rendersMarkup).catch(console.error());

function rendersMarkup(arr) {
  console.log('arr', arr.results);
  const markup = arr.results
    .map(result => {
      return `<div>
                <img src="https://www.themoviedb.org/t/p/w300${result.poster_path}" alt="">
                <h2>${result.title}</h2>
                <p></p>
              </div>`;
    })
    .join('');

  trendingGallery.insertAdjacentHTML('beforeend', markup);
}

// rendersMarkup();
