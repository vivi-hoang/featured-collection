// ./screens/Home.js

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Card } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

// Data
import { CATEGORIES } from "../data/Categories";

const Home = ({route, navigation}) => {

    const renderCategoryCard = ({item}) => {
        return (
            <TouchableOpacity onPress = {() =>
                navigation.navigate('Category Items', {category: item.id})
            }>
                <Card>
                    <Card.Title style = {styles.cardTitle}>{item.text.toUpperCase()}</Card.Title>
                    <Card.Divider />
                    <Card.Image 
                        source = {{uri: item.url}} 
                    />
                    <Button 
                        title = 'View items in this category'
                        buttonStyle = {{
                        backgroundColor: '#221868'
                    }}
                />
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        
        <View style = {styles.container}>
            <FlatList
                data = { CATEGORIES }
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryCard}
            />                       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        //marginTop: 50, // Necessary to keep content from overlapping status bar
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: 18,
    }
});

export default Home;