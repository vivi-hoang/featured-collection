import React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Pages
import Home from '../screens/Home';
import CategoryItems from '../screens/CategoryItems';
import AllItems from '../screens/AllItems';
import ItemRecord from '../screens/ItemRecord';
import BookViewer from '../screens/BookViewer';
import Locations from '../screens/Locations';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return(      
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#A8A8A8', // gray
                },
                headerTitleStyle: {
                    color: 'white'
                }
            }}        
        >
            <Stack.Screen name='Beyond Books Categories' component = { Home } />
            <Stack.Screen name='Category Items' component = { CategoryItems } />
            <Stack.Screen name='Item Record' component = { ItemRecord } />
            <Stack.Screen name='Book Details' component = { BookViewer } />
            <Stack.Screen name='Locations' component = { Locations } />
        </Stack.Navigator>
    );
}

const ItemStackNavigator = () => {
    return(      
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#A8A8A8', // gray
                },
                headerTitleStyle: {
                    color: 'white'
                }
            }}  
        >
            <Stack.Screen name='All Items' component = { AllItems } />
            <Stack.Screen name='Item Record' component = { ItemRecord } />
            <Stack.Screen name='Book Details' component = { BookViewer } />
            <Stack.Screen name='Locations' component = { Locations } />
        </Stack.Navigator>
    );
}

const FavoritesStackNavigator = () => {
    return(      
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#A8A8A8', // gray
                },
                headerTitleStyle: {
                    color: 'white'
                }
            }}      
        >
            <Stack.Screen name='Favorites' component = { Favorites } />
            <Stack.Screen name='Item Record' component = { ItemRecord } />
            <Stack.Screen name='Book Details' component = { BookViewer } />
            <Stack.Screen name='Locations' component = { Locations } />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, ItemStackNavigator, FavoritesStackNavigator };