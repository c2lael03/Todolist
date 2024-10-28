import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

export default function Add({add}) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    /* alla oleva tullee ehkä app.js:ään???

    const add = useCallback((name) => {
        const newItem = {
          id: uui.v4(),
          name: name
        }
        const tempData = [...data, newItem]
        setData(tempData)
        */

    return (    
        <View style={styles.container}>
            <TextInput 
                style={styles.form} 
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Item name..."
            />
            <Button 
                title='Save'
                onPress={() => save(name)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Takes up the full available space
        justifyContent: 'space-between', // Distributes space evenly between fields
        marginBottom: 16,
        //padding: 20, // Adds padding around the content
    },
    form: {
        flexDirection: 'row', // Takes up the full available space
        justifyContent: 'space-between', // Distributes space evenly between fields
        marginBottom: 16,
    },
});