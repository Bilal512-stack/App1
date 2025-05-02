import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingSwiper from '../onboarding';
import LoginScreen from '../(auth)/sign-in/LoginScreen';
import SignUpScreen from '../(auth)/sign-up/SignUpScreen';
import Order from '../(tabs)/order';
import ReviewOrder from '../create-order/review-order';
import SplashScreen from '../SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingSwiper} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Order" component={Order} />                
                <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;