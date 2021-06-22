// ./App.js

// DEPENDENCIES
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// FIREBASE
import 'firebase/database';
import * as Analytics from 'expo-firebase-analytics';

// Pages
import { BottomTabNavigator } from './navigation/TabNavigator';


// FIREBASE SNIPPET
// Gets the current screen from navigation state
const getActiveRouteName = state => {
    const route = state.routes[state.index];
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

export default function App() {

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    React.useEffect(() => {
        const state = navigationRef.current.getRootState();
    
        // Save the initial route name
        routeNameRef.current = getActiveRouteName(state);
    }, []);

    return (
        <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = getActiveRouteName(state);
            if (previousRouteName !== currentRouteName) {
                Analytics.setCurrentScreen(currentRouteName, currentRouteName);
            }
        }}
        >
            <BottomTabNavigator />
        </NavigationContainer>
    );
}