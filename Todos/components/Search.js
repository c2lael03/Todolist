import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function Search({criteria,setCriteria}) {

    return (    
        <View style={styles.searchBox}>
            <TextInput 
                value={criteria}
                onChangeText={text => setCriteria(text)}
                placeholder="Searh..."
                returnKeyType="search"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row', // Takes up the full available space
        justifyContent: 'space-between', // Distributes space evenly between fields
        marginBottom: 16,
        //padding: 20, // Adds padding around the content
    },
});