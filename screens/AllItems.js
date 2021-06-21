// ./screens/AllItems.js

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Data
import { COLLECTION_ITEMS } from "../data/Items";

const AllItems = ({route, navigation}) => {

    const [beyondBooksItems, setBeyondBooksItems] = useState(COLLECTION_ITEMS);

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
            data = { beyondBooksItems }
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

export default AllItems;