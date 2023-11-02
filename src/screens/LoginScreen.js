import { useState, useEffect } from 'react';
import HomeScreenTabs from './TabNavigator';
import LoginForm from '../components/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { setLogoutStatus } from '../redux/appActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

    const [sessionStatus, setSessionStatus] = useState('loading');

    useEffect(() => {
        checkSessionStatus();
    }, []);

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

    const checkSessionStatus = async () => {
        try {

            const serverIP = await getServerIP()
            console.log("Log In Screen Server IP:", serverIP);

            const response = await fetch(`${serverIP}/checkSession`)
            const data = await response.json();
            setSessionStatus(data.status)
        } catch (error) {
            console.error("Error checking the session status", error)
        }
    }

    const logoutStatus = useSelector((state) => state.appReducer.logoutStatus);
    const dispatch = useDispatch();

    const [loggedInStatus, setloggedInStatus] = useState(false);

    const onLoginSuccess = () => {
        setloggedInStatus(true);
        dispatch(setLogoutStatus(false));
    }

    // console.log("Logged In Status:",loggedInStatus)
    // console.log("Session Status:",sessionStatus)

    return (

        loggedInStatus === true || sessionStatus === "authenticated" ? <HomeScreenTabs /> : <LoginForm onLoginSuccess={onLoginSuccess} />

    );
};

export default LoginScreen;