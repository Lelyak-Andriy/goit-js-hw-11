import './css/styles.css';
import imageCardTpl from './templates/image-card.hbs';
import API  from './fetchImages';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const photoCard = document.querySelector(".photo-card");
const btnSearch = document.querySelector(".btn-search");
const btnLoadMore = document.querySelector(".load-more");



searchForm.addEventListener('submit', debounce(imageSearchInputHandler, DEBOUNCE_DELAY));

function imageSearchInputHandler(e) {
e.preventDefault();
    
const image = e.currentTarget.elements.query.value.trim();

API.fetchImages(image)
.then(renderImageCard)
// .catch(onFetchError) 
}
  
// function onFetchError(error) {
//     if (error) {countryList.innerHTML = '';
//         Notiflix.Notify.failure('Oops, there is no country with that name')
//     }
// }


function renderImageCard(image) {
const markup = imageCardTpl(image);
imageCardTpl.innerHTML = markup;
}





    