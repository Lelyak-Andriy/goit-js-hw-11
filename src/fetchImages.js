const BASE_URL = 'https://pixabay.com/api';
const API_KEY = 24769515 - 7151fb4d93d5940551af86767;

// const options = {
//     key: ,
//     q: ,
//     image_type: photo,
//     orientation: horizontal,
//     safesearch: true,
// }


function fetchImages(image) {

    return fetch(`${BASE_URL}/?API-KEY&${image}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => {
    if (response.status === 404) {
          throw new Error(response.status);
        }
        return response.json()
    })
}

export default {fetchImages}