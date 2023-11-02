import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function HomeScreenTabs() {

    // const [showBottomTabs, setshowBottomTabs] = useState(false);

    // const toggleshowBottomTabs = () => {
    //     setshowBottomTabs(!showBottomTabs);
    // };

    const [hideBottomTabs, sethideBottomTabs] = useState(false);

    const toggleBottomTabs = () => {
        sethideBottomTabs(true);
    };

    return (

        <Tab.Navigator screenOptions={{
            tabBarStyle: hideBottomTabs ? { display: 'none' } : { backgroundColor: 'black' },
            tabBarActiveTintColor: '#FFFFFF'
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="home" size={size} color={color} />
                    ),

                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />

            <Tab.Screen name="SettingsScreen" options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                ),
                tabBarShowLabel: false,
                headerShown: false,
            }}>
                {() => <SettingsScreen toggleBottomTabs={toggleBottomTabs} />}
            </Tab.Screen>

        </Tab.Navigator>

    );
}

export default HomeScreenTabs;