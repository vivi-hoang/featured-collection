// ./screens/Favorites.js

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Favorites = ({route, navigation}) => {

    return (
        <Text style = {styles.container}>Favorites Screen</Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginLeft: 5,
        marginRight: 5,
    },
});

export default Favorites;