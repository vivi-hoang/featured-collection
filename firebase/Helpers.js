// ./firebase/Helpers.js

import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './Credentials';

// Initialize database once
export function initFavoritesDatabase() {
    firebase.initializeApp(firebaseConfig);
}

// Write out Favorites object
// Push writes a new object and generates a unique keey that it associates with object
export function storeFavoritesItem(item) {
    firebase.database().ref('favoritesData/').push(item);
}

// Retrieve Favorites item
export function getFavoritesItem() {
    let chosenFavoritesItem;
    firebase
        .database()
        .ref('favoritesData/')
        .on('value', querySnapShot => {
            chosenFavoritesItem = querySnapShot.val();
        });
    return chosenFavoritesItem;
}

// Get data back from database
// Pass in a key and listen for updates on that key
export function setupFavoritesListener(key) {
    firebase
        .database()
        .ref('favoritesData/')
        .on('value', (snapshot) => {
            console.log('setupFavoritesListener fires up with ', snapshot);
        });
}