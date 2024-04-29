import axios from 'axios';

export const fetchMovies = async (page) => {
    const options = {
        method: 'GET',
        url: 'https://api.kinopoisk.dev/v1.4/movie',
        params: {
            page: page.toString(),
            limit: '100',
            selectFields: ['id', 'name', 'rating', 'poster', 'description', 'genres'],
            type: ['movie', 'tv-series']
        },
        headers: {
            accept: 'application/json',
            'X-API-KEY': 'J4Q0T05-Y3DM790-HGE9WH2-H9KBCPZ'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies');
    }
};
