// ./screens/ItemRecord.js

// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image, ListItem } from 'react-native-elements';

// GOOGLE BOOKS
import { getBooks } from '../api/GoogleBooksServer';

// FIREBASE
import { initFavoritesDatabase, storeFavoritesItem, setupFavoritesListener } from '../firebase/Helpers';

const ItemRecord = ({route, navigation}) => {

    const chosenItem = route.params.item;
    const [itemInfo, setItemInfo] = useState(chosenItem);

    const [favorites, setFavorites] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [books, setBooks] = useState([]);

    const toggleFunction = () => {
        setToggle(!toggle);
    };

    // Initialize Firebase database once and only once
    useEffect(() => {
        try {
            initFavoritesDatabase();
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Pull list of favorites from Firebase and setFavorites with that array
    useEffect(() => {     
        // Added this to avoid 'Can't perform a React state update on an unmounted component' error 
        let isMounted = true;         
        
        setupFavoritesListener((items) => {
            if (isMounted) {
                console.log('Items pushed into setFavorites: ', items);
                setFavorites(items);
            }
            // On loading page, update heart based on data stored in Firebase
            const foundInFavorites = items.some(item => item.itemID === itemInfo.id);
            if (foundInFavorites) {
                setToggle(true);
            }    
        });
        
        // This is useEffect cleanup function
        return () => { isMounted = false; }  
    }, []);

    // Pull book list; run only once, when component is instantianted
    useEffect(() => {
        getBooks(itemInfo.query)
            .then(response => {
                setBooks(response.items);
            }) 
    }, []);

    const renderHoldButton = (number) => {
        // Don't show button for KDL Cruisers, which aren't holdable by patrons
        if (number !== 451283174) {
            return(
                <View style = { styles.holdButton }>
                    <Button 
                        title = 'Place Hold'
                        onPress = {() => {
                            Linking.openURL(`https://kdl.bibliocommons.com/holds/select_hold/${number}?j_callback=button_requesthold`)
                        }}
                        color = '#221868'
                    />
                </View>
            )
        }    
    }
    
    const renderCatalogButton = (number) => {
        return(
            <View style = { styles.catalogButton }>
                <Button 
                    title = 'Visit KDL Catalog'
                    onPress = {() => {
                        Linking.openURL(`https://kdl.bibliocommons.com/item/show/${number}`)                        
                    }}
                    color = '#221868' // Dark blue-purple
                />
            </View>
        )
    }

    const renderLocationsButton = (number) => {
        return(
            <View style = { styles.catalogButton }>
                <Button 
                    title = 'Item Locations'
                    onPress = {() => { navigation.navigate('Locations', itemInfo.locations) }}
                    color = '#221868' // Dark blue-purple
                />
            </View>
        )
    }
    
    const renderHeart = (number) => {
        return(
            <TouchableOpacity onPress = {() => {
                toggleFunction()
                storeFavoritesItem(number);
            }}>
                {toggle ? <AntDesign name='heart' size={18} color='#DB6860' /> : <AntDesign name='hearto' size={18} color='black' />}
            </TouchableOpacity>
        )        
    }

    const renderItemTitle = (item) => {        
        return (          
            <View style = {styles.titleContainer}>
                <Text style = { styles.itemTitle }>
                    { item.text.toUpperCase() }
                </Text>
                { renderHeart(itemInfo.id) }
            </View>
        )
    }

    const renderBookList = ({index, item}) => {
        if (item.volumeInfo.language === 'en') {
            return (
                <TouchableOpacity
                    onPress = {() => {
                        navigation.navigate('Book Preview', item);
                    }}                
                >
                    <ListItem key = {index} bottomDivider>
                        <Image 
                            // Need '?' in URI to check if property is undefined first
                            source = {{ uri: item.volumeInfo.imageLinks?.thumbnail }} 
                            style = { styles.bookCovers } // Declares image size
                        />
                        <ListItem.Content>
                            <ListItem.Title> { item.volumeInfo.title } </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
            )
        }      
    }

    return (            
            
            <View style = { styles.bookList }>
                <FlatList
                    ListHeaderComponent = {<>
                        <View style = {styles.container}>
                            <Image 
                                source = {{ uri: itemInfo.imageURL }} 
                                containerStyle = { styles.imageContainer } // Centers image
                                style = { styles.image } // Declares image size
                            />             
                            { renderItemTitle(itemInfo) }
                            { renderHoldButton(itemInfo.id) }
                            <Text style = { styles.metadata }>{ itemInfo.summary }</Text>            
                            <Text style = { styles.metadataTitle }>CONTENTS</Text>
                            <Text style = { styles.metadata }>{ itemInfo.characteristics }</Text>
                            <Text style = { styles.metadataTitle }>NOTES</Text>
                            <Text style = { styles.metadata }>{ itemInfo.notes }</Text>
                            <Text style = { [styles.note, styles.metadata] }>Please check on an item's availability in the KDL Catalog before visiting a KDL branch for pickup.</Text>
                            <View style = {styles.buttonContainer}>                                
                                { renderCatalogButton(itemInfo.id) }
                                { renderLocationsButton(itemInfo.id) }
                            </View>                          
                            <Text style = { styles.metadataTitle }>RELATED READING</Text>
                        </View>
                    </>}                  
                    data = { books }
                    keyExtractor = { (item) => item.id }
                    // If book array changes, re-render and include that data
                    extraData = { books }
                    renderItem = { renderBookList } // passes {index: i, item: {...}}
                />
            </View>  
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imageContainer: {
        alignSelf: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',        
        marginRight: 5,
    },
    metadataTitle: {
        fontWeight: 'bold',
    },
    metadata: {
        marginBottom: 10,
    },
    note: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    holdButton: {
        width: '45%',
        alignSelf: 'center',
        marginBottom: 5,
    },
    catalogButton: {
        width: '45%',
        marginBottom: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    bookList: {
        flex: 1,
        width: '100%',
    },
    bookCovers: {
        height: 100,
        width: 75,
    }
});

export default ItemRecord;