import './css/styles.css';
import galleryItem from './templates/galleryList.hbs';
import apiService from './fetchPhotos';
import Notiflix from 'notiflix';


const searchForm = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");


console.log(btnLoadMore);

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
    // apiService.fetchPhotos().then(photos => {
    //     clearGallery();
    //     appendPhotoCard(photos)
    // });
}
//  до фетча все списав, продовжувати з функції фетч


function fetchPhotos() {
    // hideButton();
    // disableButton();
    apiService.fetchPhotos()
.then(photos => {
            appendPhotoCard(photos);
        
})
.catch(error => console.log(error))
.finally(() => {
        // enableButton()
        // showButton()
})
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






