// ./screens/BookViewer.js

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from "react-native-gesture-handler";

const BookViewer = ({ route }) => {
    return (
        <View style = { styles.container }>
            <WebView
                javaScriptEnabled
                domStorageEnabled
                source = {{ uri: `https://www.google.com/books/edition/_/${route.params.id}?hl=en` }}
            />
        </View>
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

export default BookViewer;