import './css/styles.css';
import imageCardTpl from './templates/image-card.hbs';
import ImageApiService  from './fetchImages';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const photoCard = document.querySelector(".photo-card");
const btnSearch = document.querySelector(".btn-search");
const btnLoadMore = document.querySelector(".load-more");

const imageApiService = new ImageApiService();

searchForm.addEventListener('submit', debounce(onImageSearch, DEBOUNCE_DELAY));
btnLoadMore.addEventListener('click', loadMoreImages);


function onImageSearch(e) {
e.preventDefault();
    
imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.fetchImages();
}
  
function loadMoreImages () {
imageApiService.fetchImages();
}





// function onFetchError(error) {
//     if (error) {countryList.innerHTML = '';
//         Notiflix.Notify.failure('Oops, there is no country with that name')
//     }
// }


// function renderImageCard(image) {
// const markup = imageCardTpl(image);
// imageCardTpl.innerHTML = markup;
// }