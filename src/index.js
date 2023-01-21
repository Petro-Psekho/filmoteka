// const BASE_URL = 'https://restcountries.com/v2/name/';
// const searchQuery = '?fields=name,capital,population,flags,languages';

// export function fetchCountries(countryName) {
//   const url = `${BASE_URL}${countryName}${searchQuery}`;

//   return fetch(url).then(response => {
//     return response.json().catch(error => console.log(error));
//   });
// }

const inputQuery = document.querySelector('.js-search');
inputQuery.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const { query } = e.currentTarget;
  console.log(query.value);
}

async function movieTrendingApi() {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const key = 'a148ed5961285512fd3954af576af4a0';

  const url = `${BASE_URL}/movie/550?api_key=${key}&Media Type=move&
Time Window=day`;

  const response = await fetch(url);

  console.log(response);

  try {
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

movieTrendingApi().then(data => console.log(data));
