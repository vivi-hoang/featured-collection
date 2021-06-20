// ./api/GoogleBooksServer.js

import axios from 'axios';
import { GOOGLE_KEY } from './GoogleKey';

// Create server
const GoogleBooksServer = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes',
});

export const getBooks = async (query) => {
    const response = await GoogleBooksServer.get(
        `?q=${query}&key=${GOOGLE_KEY}&printType=books&orderBy=newest`);
    return response.data;
};

export default GoogleBooksServer;