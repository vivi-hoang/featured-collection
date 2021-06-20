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
export function setupFavoritesListener(updateFunc) {
    firebase
        .database()
        .ref('favoritesData/')
        .on('value', (snapshot) => {
            console.log('setupFavoritesListener fires up with ', snapshot);
            if (snapshot?.val()) {
                const firebaseObject = snapshot.val();
                const newArr = [];
                // Extract object from each key and make new mapping
                Object.keys(firebaseObject).map((key, index) => {
                    console.log(key, '||', index, '||', firebaseObject[key]);
                    // Push into array the Favorites object with unique key as attribute
                    // All Favorites items with IDs attached on each item to ensure they're unique
                    newArr.push({ ...firebaseObject[key], id: key});
                });
                updateFunc(newArr);                
            } else {
                updateFunc([]);
            }
        });
}