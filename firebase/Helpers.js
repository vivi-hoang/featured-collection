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

// Remove Favorites object from Firebase
export function deleteFavoritesItem(firebaseID) {
    firebase.database().ref(`favoritesData/${firebaseID}`).remove();
}

export function setupFavoritesListener(updateFunc) {
    firebase
        .database()
        .ref(`favoritesData/`)
        .on('value', (snapshot) => {
            if (snapshot?.val()) {
                // Save entire firebase object to variable
                const firebaseObject = snapshot.val();
                const newArr = [];
                Object.keys(firebaseObject).map((key, index) => {
                    newArr.push({ 'firebaseID': key, 'itemID': firebaseObject[key] });
                });
                updateFunc(newArr);
            } else {
                updateFunc([]);
            }
        }
    );
}