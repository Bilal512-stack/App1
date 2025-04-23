import React from 'react';
import { AppRegistry } from 'react-native';
// @ts-ignore
import { name as appName } from '../app.json';
import OnboardingSwiper from "@/app/onboarding";


const Main = () => {
    return <OnboardingSwiper/>

};

// Enregistrement du composant principal
AppRegistry.registerComponent(appName, () => Main);

// Export par défaut du composant Main
export default Main;

