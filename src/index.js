import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
function createMarkup(countries) {
  const markup = countries
    .map(country => {
      return `<li>
            <p><b>Name</b>: ${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Flag</b>: <img width="200" height="100" src="${
              country.flags.svg
            }"></p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>
            </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function searchCountry() {
  const searchedPhrase = inputEl.value.trim();
  if (searchedPhrase === '') {
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(searchedPhrase)
    .then(countries => createMarkup(countries))
    .catch(error => console.log(error));
}

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
