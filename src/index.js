import './css/styles.css';
import galleryItem from './templates/galleryList.hbs';
import apiService from './fetchPhotos';
// import Notiflix from 'notiflix';

const searchForm = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

searchForm.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadMore);


function onSubmit(e) {
    e.preventDefault();
    
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        galleryList.innerHTML = '';  
    }
        
    // apiService.resetPage();
    apiService.fetchPhotos().then(photos =>{});
}

 

function onLoadMore() {
apiService.fetchPhotos().then(appendPhotoCard);
}

function appendPhotoCard(photo) {
    galleryList.insertAdjacentHTML('beforeend', galleryItem(photo.hits))
}
















// function clearGallery() {
//     galleryList.innerHTML = '';
// }



// API.resetPage();
    // API.fetchPhotos().then(photos => {
    //     clearGallery();
    //     appendPhotoCard(photos);
    // });