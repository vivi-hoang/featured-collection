import React from "react";

// Navigation
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Tab icons
import { Feather } from "@expo/vector-icons";

// Pages
import { MainStackNavigator, ItemStackNavigator, FavoritesStackNavigator } from './StackNavigator';

// Tabs at bottom of page
const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {

    return (

        <Tab.Navigator
            initialRouteName = {'Home'}
            inactiveColor = 'gray'
            barStyle = {{
                backgroundColor: '#221868', // Dark blue-purple
            }}
        >
            <Tab.Screen 
                name='Categories' 
                component = { MainStackNavigator } 
                options={{
                    tabBarLabel: 'Home',                        
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen 
                name='All Items' 
                component = { ItemStackNavigator }
                options={{
                    tabBarLabel: 'All Items',
                    tabBarIcon: ({ color }) => (
                        <Feather name="list" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen 
                name='Favorites' 
                component = { FavoritesStackNavigator } 
                options={{
                    tabBarLabel: 'Favorites',
                    //tabBarColor: 'red',
                    tabBarIcon: ({ color }) => (
                        <Feather name="heart" size={24} color="white" />
                    ),
                }}
            />
                        
        </Tab.Navigator>
        
    );
};

export { BottomTabNavigator };