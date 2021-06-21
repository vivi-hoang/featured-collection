// ./firebase/Helpers.js

import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './Credentials';

// Initialize database once
export function initFavoritesDatabase() {
    firebase.initializeApp(firebaseConfig);
}

// Write out Favorites object
// Push writes a new object and generates a unique key that it associates with object
export function storeFavoritesItem(number) {
    firebase.database().ref('favoritesData/').push(number);
}

{/*}
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
*/}

// Setup listener on database for whatever key we specify
// If there's data on that key, log it.
export function setupFavoritesListener(key) {
    firebase
        .database()
        .ref(`favoritesData/${key}`)
        .on('value', (snapshot) => {
            console.log('setupFavoritesListener fires up with ', snapshot);
        });
}