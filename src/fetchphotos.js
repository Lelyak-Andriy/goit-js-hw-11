const API_KEY = '24769515-7151fb4d93d5940551af86767';
const BASE_URL = 'https://pixabay.com/api'

const options = {
    headers: {
        key: API_KEY,
    },
};

export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhotos() {
        const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(url, options)
            .then(response => response.json())
            .then(({ photos }) => {
                this.incrementPage();
                return photos;
            });
    }

    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }


}