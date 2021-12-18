import './css/styles.css';
import galleryItem from './templates/galleryList.hbs';
import apiService from './fetchPhotos';
import Notiflix from 'notiflix';


const searchForm = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

searchForm.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', fetchPhotos);

if (apiService.query === "") {
    hideButton();
    disableButton();
    clearGallery();
}

function onSubmit(e) {
    e.preventDefault();
    
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        hideButton();
        disableButton();
        clearGallery();
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    }
    clearGallery();
    apiService.resetPage();
    fetchPhotos();
}



function fetchPhotos() {
    hideButton();
    disableButton();

apiService.fetchPhotos()
.then(photos => {
            appendPhotoCard(photos);
    if (photos.totalHits === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    if (apiService.page === 2) {
        Notiflix.Notify.info(`Hooray! We found ${photos.totalHits} images.`)
    }
    if (((apiService.page - 1) * apiService.perPage) >= photos.totalHits) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    }
    showButton()
    enableButton()
})
.catch(error => console.log(error))
.finally(() => {})
}



function appendPhotoCard(photo) {
galleryList.insertAdjacentHTML('beforeend', galleryItem(photo.hits))
}

function clearGallery() {
galleryList.innerHTML = ''
}

function hideButton() {
    btnLoadMore.classList.add("is-hidden");
    btnLoadMore.innerHTML = '';
}

function showButton() {
    btnLoadMore.classList.remove("is-hidden");
}

function disableButton() {
    btnLoadMore.setAttribute("disabled", 'true');
    btnLoadMore.textContent = 'Loading';
}

function enableButton() {
    btnLoadMore.removeAttribute("disabled");
    btnLoadMore.textContent = 'Load more';
}






