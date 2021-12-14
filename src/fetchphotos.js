export default {
    
    apiKey: '24769515-7151fb4d93d5940551af86767',
    baseUrl: 'https://pixabay.com/api/',
    searchQuery: '',
    perPage: 4,
    page: 1,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,

    fetchPhotos() {
        const url = `${this.baseUrl}?q=${this.query}&image_type=photo&orientation=horizontal&per_page=${this.perPage}&page=${this.page}&key=${this.apiKey}`;
        return fetch(url)
            .then(response => {
                this.incrementPage();
                return response.json();
            })
    },

    resetPage() {
        this.page = 1;
    },

    incrementPage() {
        this.page += 1;
    },
    
    get query() {
        return this.searchQuery;
    },

    set query(value) {
        this.searchQuery = value;
    },
};

    
    


