import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PDFViewer from '../components/PDFViewer';
import pntLogo from '../../assets/pnt_logo.jpg'
import { useNavigation, CommonActions } from '@react-navigation/native';
import LoginForm from '../components/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { setLogoutStatus } from '../redux/appActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = (props) => {

    // const { toggleBottomTabs } = props

    const navigation = useNavigation();
    const logoutStatus = useSelector((state) => state.appReducer.logoutStatus);
    console.log("Logout Status:",logoutStatus)
    

    const dispatch = useDispatch();

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

    const logout = async () => {
        try {

            const serverIP = await getServerIP();
            const response = await fetch(`${serverIP}/logout`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            if (response.status === 200) {
                dispatch(setLogoutStatus(true));
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    })
                );
            }

        } catch (error) {
            console.log("Error logging out", error)
        }
    }


    return (

        <View style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.rowContainer}>
                    <Image style={styles.profileImage} source={pntLogo} />
                    <View style={styles.serverDetails}>
                        <Text style={styles.text}>Server IP: 192.168.0.104</Text>
                        <Text style={styles.text}>Username: ubuntu</Text>
                        <Text style={styles.text}>Password: server</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={[{ backgroundColor: 'red' }, styles.Button]} onPress={() => logout()}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    profileCard: {
        justifyContent: 'center',
        width: '80%',
        height: '20%',
        marginTop: 20,
        backgroundColor: '#3B556E',
        borderRadius: 10
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 10
    },

    serverDetails: {
        marginLeft: 10
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },

    Button: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
        marginTop: 20,
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
})

export default SettingsScreen;



// const pdfUrl = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';


// <PDFViewer pdfUrl={pdfUrl} showBottomTabs={showBottomTabs} toggleshowBottomTabs={toggleshowBottomTabs} />