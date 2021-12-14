import './css/styles.css';
import galleryItem from './templates/galleryList.hbs';
import apiService from './fetchPhotos';
import Notiflix from 'notiflix';

const searchForm = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

searchForm.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', fetchPhotos);


    hideButton();
    disableButton();
    

function onSubmit(e) {
    e.preventDefault();
    
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        galleryList.innerHTML = '';
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    }
      
    apiService.resetPage();
    apiService.fetchPhotos().then(photos => {
        clearGallery();
        appendPhotoCard(photos)
        
    });
}

function fetchPhotos() {
    hideButton();
    disableButton();
    apiService.fetchPhotos()
.then(photos => {
            appendPhotoCard(photos);
        })
.catch(error => console.log(error))
.finally(() => {
        enableButton()
        showButton()
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






