import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServerSetupScreen = (props) => {

    const [serverIP, setServerIP] = useState("");
    const [serverStatus, setServerStatus] = useState(true)

    useEffect(() => {
        checkStoredServerIP();
    }, []);

    const checkStoredServerIP = async () => {
        try {

            const storedServerIP = await AsyncStorage.getItem('serverIP');
            if (storedServerIP) {
                props.navigation.navigate("LoginScreen");
            }

        } catch (error) {
            console.error('Error checking server IP:', error);
        }
    }

    const checkServerStatus = async () => {
        try {
            const serverResponse = await fetch(`${serverIP}/checkServer`)

            if (serverResponse.status === 200) {
                return 200; // Server is online
            } else {
                return 500; // Server is online, but with an unexpected status code
            }

        } catch (error) {
            console.error("Error connecting the server", error)
        }
    }

    const addserver = async () => {
        if (serverIP) {
            try {
                const serverStatusResponse = await checkServerStatus();
                if (serverStatusResponse === 200) {
                    console.warn("Server status", serverStatusResponse)
                    setServerStatus(true)
                    const storedServerIP = await AsyncStorage.getItem('serverIP');
                    console.log("Server IP in Async Storage:", storedServerIP)
                    if (storedServerIP) {
                        await AsyncStorage.removeItem('serverIP');
                        console.log("Server IP in Async Storage after deletion:", await AsyncStorage.getItem('serverIP'))
                    }

                    await AsyncStorage.setItem('serverIP', serverIP);
                    console.log("Server IP in Async Storage after adding new IP:", storedServerIP)
                    console.warn('Server IP Added', serverIP);
                    props.navigation.navigate('LoginScreen');
                } else {
                    setServerStatus(false)
                    console.warn("Server unavailable")
                }

            } catch (error) {
                console.error('Error storing server IP:', error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Server Setup</Text>

            <TextInput
                value={serverIP}
                onChangeText={serverIP => setServerIP(serverIP)}
                placeholder='Server IP Address'
                placeholderTextColor={'grey'}
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.addServerButton} onPress={() => { addserver() }}>
                <Text style={styles.buttonText}>Add Server</Text>
            </TouchableOpacity>
            {serverStatus === false ? <Text style={styles.subText}>Server Unavailable</Text> : ""}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    headingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },

    subText: {
        marginTop: 10,
        fontSize: 15,
        color: 'red'
    },

    textInput: {
        width: '90%',
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 18
    },

    addServerButton: {
        backgroundColor: 'royalblue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '90%'
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
});

export default ServerSetupScreen;





