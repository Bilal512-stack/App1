import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingSwiper from '../onboarding';
import WelcomeScreen from '../(auth)/WelcomeScreen';
import LoginScreen from '../(auth)/sign-in/LoginScreen';
import SignUpScreen from '../(auth)/sign-up/SignUpScreen';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">
                <Stack.Screen name="Onboarding" component={OnboardingSwiper} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />

                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;