// ./screens/Locations.js

import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';

// Data
import { COLLECTION_ITEMS } from '../data/Items';
import { BRANCH_COORDINATES } from '../data/Coordinates';

const Locations = ({route, navigation}) => {

    // Incoming array of branches that have this item
    const branches = route.params;
    
    // Array of branch abbreviations
    const [branchList, setBranchList] = useState(branches)

    // Array of branch coordinates
    const [branchCoords, setBranchCoords] = useState([]);
    
    const [region, setRegion] = useState({
        // Kent County, Michigan
        latitude: 42.965462,
        longitude: -85.670174,
        latitudeDelta: 0.7,
        longitudeDelta: 0.7
    });

    // Generate array of branch coordinates based on branch lists
    useEffect(() => {        
        let tempBranchCoords = [];
        
        // Go through each element in the branchList array
        branchList.map(branch => {
            if (branch === 'ALP') {
               tempBranchCoords.push(BRANCH_COORDINATES[0]);
            } else if (branch === 'ALT') {
                tempBranchCoords.push(BRANCH_COORDINATES[1]);
            } else if (branch === 'ADA') {
                tempBranchCoords.push(BRANCH_COORDINATES[2]);
            } else if (branch === 'BYR') {
                tempBranchCoords.push(BRANCH_COORDINATES[3]);
            } else if (branch === 'CAL') {
                tempBranchCoords.push(BRANCH_COORDINATES[4]);
            } else if (branch === 'CAS') {
                tempBranchCoords.push(BRANCH_COORDINATES[5]);
            } else if (branch === 'COM') {
                tempBranchCoords.push(BRANCH_COORDINATES[6]);
            } else if (branch === 'EGR') {
                tempBranchCoords.push(BRANCH_COORDINATES[7]);
            } else if (branch === 'ENG') {
                tempBranchCoords.push(BRANCH_COORDINATES[8]);
            } else if (branch === 'GNS') {
                tempBranchCoords.push(BRANCH_COORDINATES[9]);
            } else if (branch === 'GDV') {
                tempBranchCoords.push(BRANCH_COORDINATES[10]);
            } else if (branch === 'SC') {
                tempBranchCoords.push(BRANCH_COORDINATES[11]);
            } else if (branch === 'KEL') {
                tempBranchCoords.push(BRANCH_COORDINATES[12]);
            } else if (branch === 'KWD') {
                tempBranchCoords.push(BRANCH_COORDINATES[13]);
            } else if (branch === 'KRA') {
                tempBranchCoords.push(BRANCH_COORDINATES[14]);
            } else if (branch === 'NEL') {
                tempBranchCoords.push(BRANCH_COORDINATES[15]);
            } else if (branch === 'PFD') {
                tempBranchCoords.push(BRANCH_COORDINATES[16]);
            } else if (branch === 'SPE') {
                tempBranchCoords.push(BRANCH_COORDINATES[17]);
            } else if (branch === 'TYR') {
                tempBranchCoords.push(BRANCH_COORDINATES[18]);
            } else if (branch === 'WAL') {
                tempBranchCoords.push(BRANCH_COORDINATES[19]);
            } else if (branch === 'WYO') {
                tempBranchCoords.push(BRANCH_COORDINATES[20]);
            } else {
                console.log('Branch not found');
            } 
        })
        setBranchCoords(tempBranchCoords);
    }, []);

    return (
        <MapView
            style={{ flex: 1 }}
            region = { region }
            onRegionChangeComplete = { region => setRegion(region)}
        >
            { branchCoords.map((coords, index) => {
                return(
                    <Marker
                        key = { index }
                        coordinate = {{         
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        }}
                    >
                        <Callout
                            onPress = {() => {
                                Linking.openURL(`${coords.url}`)
                                
                            }}
                        >
                            <View>
                                <Text style = { styles.branchName }> {coords.title} </Text>
                                <Text> {coords.address} </Text>
                            </View>
                        </Callout>
                    </Marker>
                )
            })}
                
        </MapView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginLeft: 5,
        marginRight: 5,
    },
    branchName: {
        fontWeight: 'bold'
    }
});

export default Locations;