import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import ServerSetupScreen from './src/screens/ServerSetupScreen';
import HomeScreenTabs from './src/screens/TabNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ServerSetupScreen'>
          <Stack.Screen name="ServerSetupScreen" component={ServerSetupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;






// const [sessionStatus, setSessionStatus] = useState('loading');

// useEffect(() => {
//   checkSessionStatus();
// }, []);

// const checkSessionStatus = async () => {
//   try {
//     const response = await fetch(`http://192.168.0.148:3000/checkSession`)
//     const data = await response.json();
//     setSessionStatus(data.status)
//   } catch (error) {
//     console.error("Error checking the session status", error)
//   }
// }

{/* {sessionStatus === "authenticated" ? <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} options={{ headerShown: false }} /> :
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />} */}

{/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} options={{ headerShown: false }} /> */}