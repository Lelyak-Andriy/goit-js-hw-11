import './css/styles.css';
import photoCardTpl from './templates/photo-card.hbs';
import PhotosApiService  from './fetchphotos';
import Notiflix from 'notiflix';



const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const photoCard = document.querySelector(".photo-card");
const btnSearch = document.querySelector(".btn-search");
const btnLoadMore = document.querySelector(".load-more");

const photosApiService = new PhotosApiService();

searchForm.addEventListener('submit', onPhotoSearch);
btnLoadMore.addEventListener('click', loadMorePhotos);


function onPhotoSearch(e) {
e.preventDefault();
    
    photosApiService.query = e.currentTarget.query.value;
    if (photosApiService.query === '') {
        gallery.innerHTML = '';
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    }
    
    photosApiService.resetPage();
    photosApiService.fetchPhotos().then(photos => {
        clearGallery();
        appendPhotoCard(photos);
    });
}
  
function loadMorePhotos() {
photosApiService.fetchPhotos().then(appendPhotoCard);
}


function appendPhotoCard(photo) {
    gallery.insertAdjacentHTML('beforeend', photoCardTpl(photo))
}

function clearGallery() {
    gallery.innerHTML = '';
}