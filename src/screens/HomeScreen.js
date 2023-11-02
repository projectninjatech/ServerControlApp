import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const HomeScreen = () => {

    // const logoutStatus = useSelector((state) => state.logoutStatus);

    const restart = () => {
        console.warn("Server is restarting...")
    }

    const shutdown = () => {
        console.warn("Server is shutting down...")
    }

    return (

        <View style={styles.container}>
            <Text style={styles.headingText}>Server Control</Text>

            <View style={styles.contents}>
                <TouchableOpacity style={[{ backgroundColor: 'green' }, styles.Button]} onPress={() => restart()}>
                    <Text style={styles.buttonText}>Restart Server</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[{ backgroundColor: 'red' }, styles.Button]} onPress={() => shutdown()}>
                    <Text style={styles.buttonText}>Shutdown Server</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: '100%'
    },

    headingText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 15
    },

    Button: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '90%',
        marginBottom: 20
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
});


export default HomeScreen;