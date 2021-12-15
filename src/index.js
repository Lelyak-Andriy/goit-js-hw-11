import './css/styles.css';
import galleryItem from './templates/galleryList.hbs';
import apiService from './fetchPhotos';
import Notiflix from 'notiflix';
import LoadMoreBtn from './templates/loadmorebtn'

const searchForm = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
// const loadMoreBtn = document.querySelector(".load-more");

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

console.log(loadMoreBtn);

searchForm.addEventListener('submit', onSubmit);
// btnLoadMore.addEventListener('click', fetchPhotos);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

    // hideButton();
    // disableButton();
    
    // loadMoreBtn.hide()
    function onSubmit(e) {
        e.preventDefault();
    
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        galleryList.innerHTML = '';
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    }
    loadMoreBtn.show();
    apiService.resetPage();
    clearGallery();
    fetchPhotos();
    // apiService.fetchPhotos().then(photos => {
    //     clearGallery();
    //     appendPhotoCard(photos)
        
    // });
}


function fetchPhotos() {
    loadMoreBtn.disable();
    apiService.fetchPhotos().then(photos => {
        appendPhotoCard(photos);
        loadMoreBtn.enable();
    })
}
// function fetchPhotos() {
//     hideButton();
//     disableButton();
//     apiService.fetchPhotos()
// .then(photos => {
//             appendPhotoCard(photos);
        
// })
// .catch(error => console.log(error))
// .finally(() => {
//         enableButton()
//         showButton()
// })
// }



function appendPhotoCard(photo) {
galleryList.insertAdjacentHTML('beforeend', galleryItem(photo.hits))
}

function clearGallery() {
galleryList.innerHTML = ''
}

// function hideButton() {
//     btnLoadMore.classList.add("is-hidden");
//     btnLoadMore.innerHTML = '';
// }

// function showButton() {
//     btnLoadMore.classList.remove("is-hidden");
// }

// function disableButton() {
//     btnLoadMore.setAttribute("disabled", 'true');
//     btnLoadMore.textContent = 'Loading';
// }

// function enableButton() {
//     btnLoadMore.removeAttribute("disabled");
//     btnLoadMore.textContent = 'Load more';
// }






