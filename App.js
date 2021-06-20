// ./App.js

// DEPENDENCIES
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Pages
import { BottomTabNavigator } from './navigation/TabNavigator';

export default function App() {

    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}