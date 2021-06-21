// ./screens/Favorites.js

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Data
import { COLLECTION_ITEMS } from "../data/Items";

// FIREBASE
import { initFavoritesDatabase, setupFavoritesListener } from '../firebase/Helpers';

// Alphabetize list
const comparator = (item1, item2) => {
    return item1.text > item2.text;
}

const Favorites = ({route, navigation}) => {

    const [favoritesFromFirebase, setFavoritesFromFirebase] = useState([]);
    const [favorites, setFavorites] = useState([])

    // Initialize Firebase database once and only once
    useEffect(() => {
        try {
            initFavoritesDatabase();
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Pull list of favorites from Firebase and setFavorites with that array of objects
    useEffect(() => {     
        // Added this to avoid 'Can't perform a React state update on an unmounted component' error 
        let isMounted = true;         
        
        setupFavoritesListener((items) => {
            if (isMounted) {
                console.log('Items pushed into setFavoritesFromFirebase: ', items);
                setFavoritesFromFirebase(items);
            }

            // Cross-reference itemIDs to COLLECTION_ITEMS to build collection
            const tempFavorites = [];
            // Loop through array of items returned from Firebase
            items.map(item => {
                // Extract item ID
                const itemID = item.itemID;
                // Locate item with matching ID in COLLECTION_ITEMS; save that object
                const obj = COLLECTION_ITEMS.find(element => element.id === itemID);
                // Push object onto tempFavorites array
                tempFavorites.push(obj);
            })
            setFavorites(tempFavorites.sort(comparator));

        });
        
        // This is useEffect cleanup function
        return () => { isMounted = false; }  
    }, []);

    const renderItemCard = ({item}) => {
        return (
            <TouchableOpacity onPress = {() =>                 
                navigation.navigate('Item Record', { item })
            }>
                <View style = {styles.listItem}>
                    <Image 
                        source = {{uri: item.imageURL}}
                        style = {styles.coverImage}
                    />
                    <View style = {styles.metaInfo}>
                        <Text style = {styles.title}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style = {styles.container}>
        <FlatList
            data = { favorites }
            keyExtractor={(item) => item.id.toString()}
            renderItem={ renderItemCard }
        />       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        textAlign: 'center',
    },
    listItem: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    metaInfo: {
        marginLeft: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        width: 200,
        padding: 10,
    }
});

export default Favorites;