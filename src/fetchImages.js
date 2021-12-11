export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        console.log(this);
        const options = {
            headers: {
                key: '24769515-7151fb4d93d5940551af86767',
            },
        };

        const url = `https://pixabay.com/api/?key=24769515-7151fb4d93d5940551af86767&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        fetch(url, options)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                this.page += 1;
            });
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }


}