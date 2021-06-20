// ./api/GoogleBooksServer.js

import axios from 'axios';
import { GOOGLE_BOOKS_KEY } from './GoogleBooksKey';

// Create server
const GoogleBooksServer = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes',
});

export const getBooks = async (query) => {
    console.log(`Query: ${query}`);
    const response = await GoogleBooksServer.get(
        `?q=${query}&key=${GOOGLE_BOOKS_KEY}&printType=books&orderBy=newest`);
    console.log('Response data: ', response.data);
    return response.data;
};

export default GoogleBooksServer;