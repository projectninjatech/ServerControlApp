import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginForm = (props) => {

    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onPressFunction = () => {
        console.warn("Register Now")
    }

    const getServerIP = async () => {
        try {
            const storedServerIP = await AsyncStorage.getItem('serverIP');
            if (storedServerIP) {
                return storedServerIP
            }
        } catch (error) {
            console.error('Error retrieving server IP:', error);
        }
    };

    const changeServer = () => {
        navigation.navigate("ServerSetupScreen")
    }

    const login = async () => {

        try {

            const serverIP = await getServerIP();
            var response = await fetch(`${serverIP}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.status === 200) {
                props.onLoginSuccess()
                console.warn("Login successfully...")
            } else if (response.status === 401) {
                console.warn("Unauthorized: Invalid credentials")
            } else if (response.status === 404) {
                console.warn("Not Found: User not found")
            }

        } catch (error) {
            console.error("API failed", error);
        }

    }

    return (

        <View style={styles.container}>

            <Text style={styles.headingText}>Login</Text>
            <View style={styles.formContainer}>

                <TextInput
                    value={username}
                    onChangeText={username => setUsername(username)}
                    placeholder='Username'
                    placeholderTextColor={'grey'}
                    style={styles.textInput}
                />

                <TextInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    placeholder='Password'
                    placeholderTextColor={'grey'}
                    secureTextEntry={true}
                    style={styles.textInput}
                />

                <TouchableOpacity style={styles.loginButton} onPress={() => { login() }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>

            <Pressable onPress={onPressFunction}>
                <Text style={styles.registerLinkText}>Not a Memeber! Register</Text>
            </Pressable>

            <Text style={styles.subText}>OR</Text>

            <TouchableOpacity style={styles.changeServerButton} onPress={() => { changeServer() }}>
                    <Text style={styles.buttonText}>Change Server</Text>
                </TouchableOpacity>
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
        fontSize: 40,
        textAlign: 'center',
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: '90%'
    },

    textInput: {
        width: '90%',
        marginBottom: 15,
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 18
    },

    loginButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        // width: '90%'
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },

    registerLinkText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline'
    },

    subText: {
        marginTop: 20,
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },

    changeServerButton: {
        marginTop: 20,
        backgroundColor: 'royalblue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '80%'
    },
});

export default LoginForm;