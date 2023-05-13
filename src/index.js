import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
function createMarkup(countries) {
  let markup;
  if (countries.length > 10) {
    countryList.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length >= 2 && countries.length <= 10) {
    countryInfo.innerHTML = '';
    markup = countries
      .map(country => {
        return `<li><p><img width="50" height="30" src="${country.flags.svg}">
        ${country.name.official}</p></li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }
  if (countries.length === 1) {
    countryList.innerHTML = '';
    markup = countries.map(country => {
      return `<p><b>Name</b>: ${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Flag</b>: <img width="200" height="100" src="${
              country.flags.svg
            }"></p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    });
    countryInfo.innerHTML = markup;
  }
  if (countries.length === 0) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
  }
}

function searchCountry() {
  const searchedPhrase = inputEl.value.trim();
  if (searchedPhrase === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchedPhrase)
    .then(countries => createMarkup(countries))
    .catch(error => console.log(error));
}

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
