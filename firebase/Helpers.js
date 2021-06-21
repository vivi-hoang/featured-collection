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

export function setupFavoritesListener(updateFunc) {
    console.log('setFavoritesListener called.');
    firebase
        .database()
        .ref(`favoritesData/`)
        .on('value', (snapshot) => {
            if (snapshot?.val()) {
                // Save entire firebase object to variable
                const firebaseObject = snapshot.val();
                const newArr = [];
                Object.keys(firebaseObject).map((key, index) => {
                    console.log(key, '||', index, '||', firebaseObject[key]);
                    newArr.push({ ...firebaseObject[key], 'firebaseID': key, 'itemID': firebaseObject[key]});
                });
                updateFunc(newArr);
            } else {
                updateFunc([]);
            }
        });
}