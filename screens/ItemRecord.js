// ./screens/ItemRecord.js

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Linking, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image, ListItem } from 'react-native-elements';

import { getBooks } from '../api/GoogleBooksServer';

const initialFavorites = [
    { name: 'Birdwatching backpack', id: 598759174, hearted: false },
    { name: 'Chromebook combo', id: 797984174, hearted: false },
    { name: 'GoPro camera', id: 441869174, hearted: false }, 
    { name: 'Green Cross Line Laser kit', id: 810990174, hearted: false },
    { name: 'Green screen and umbrella light kit', id: 438196174, hearted: false },
    { name: 'iPad Air 2', id: 186464174, hearted: false },
    { name: 'KDL Cruiser', id: 451283174, hearted: false },
    { name: 'Kill a Watt EZ Meter', id: 188154174, hearted: false },
    { name: 'Nintendo Switch', id: 571411174, hearted: false },
    { name: 'Nintento Switch Ring Fit Adventure', id: 811229174, hearted: false },
    { name: 'Portable projector and screen', id: 810272174, hearted: false },
    { name: 'Portable turntable', id: 645852174, favheartedorite: false },
    { name: 'Silent Disco kit', id: 658724174, hearted: false },
    { name: 'Sony Playstation VR Kit', id: 811596174, hearted: false },
    { name: 'Spot thermal camera', id: 628829174, hearted: false },
    { name: 'Ukelele', id: 470245174, hearted: false },
    { name: 'WiFi Verizon hotspot', id: 438187174, hearted: false }
]

const ItemRecord = ({route, navigation}) => {

    const chosenItem = route.params.item;
    const [itemInfo, setItemInfo] = useState(chosenItem);

    const [favorites, setFavorites] = useState(initialFavorites);
    const [toggle, setToggle] = useState(true);
    const [books, setBooks] = useState([]);

    const toggleFunction = () => {
        setToggle(!toggle);
    };

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

    const getArrPosition = (item) => {
        // Cycle through favorites array to find matching object        
        for (let i = 0; i < favorites.length; i++) {
            // Determine if that object has been hearted
            if (favorites[i].name === item.text) {
               return i;
            }
        }
    }

    const handleHeartPress = (item) => {
        // Determine index of item in collection
        let index = getArrPosition(item);
        let newArr = [...favorites];
        // Update hearted property of object in array to the opposite
        newArr[index].hearted = !newArr[index].hearted;
        favorites = newArr;
        setFavorites(newArr);
    }

    const renderItemTitle = (item) => {
        let index = getArrPosition(item); 
        // If hearted, display solid heart
        if (favorites[index].hearted == true) {
            return (          
                <Text style = { styles.itemTitle }>
                    { item.text.toUpperCase() }&nbsp;                
                    <TouchableOpacity onPress = {() => {
                        toggleFunction();
                        //handleHeartPress(item);
                    }}>
                        {toggle ? <AntDesign name='heart' size={18} color='#DB6860' /> : <AntDesign name='hearto' size={18} color='black' />}
                    </TouchableOpacity>  
                </Text>
            )
        // Else display empty heart
        } else {
            return (          
                <Text style = { styles.itemTitle }>
                    { item.text.toUpperCase() }&nbsp;                
                    <TouchableOpacity onPress = {() => {
                        toggleFunction();
                        //handleHeartPress(item);
                    }}>
                        {toggle ? <AntDesign name='hearto' size={18} color='black' /> : <AntDesign name='heart' size={18} color='#DB6860' />}
                    </TouchableOpacity>  
                </Text>
            )
        }
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
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 5,
        textAlign: 'center',
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