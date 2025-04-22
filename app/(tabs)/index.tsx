import React from 'react';
import {AppRegistry} from 'react-native';
import OnboardingSwiper from '../onboarding';
// @ts-ignore
// @ts-ignore
import { name as appName } from '../../app.json';
import LoginScreen from "@/app/(auth)/LoginScreen";

const Main = () => {
    return <OnboardingSwiper />;
            <LoginScreen />;
};

// Enregistrement du composant principal

AppRegistry.registerComponent(appName, () => Main);

// Export par défaut du composant Main
