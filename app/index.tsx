import React from 'react';
import { AppRegistry } from 'react-native';
import { Redirect } from 'expo-router'; // Import Redirect from expo-router
// @ts-ignore
import { name as appName } from '../app.json';
import OnboardingSwiper from "@/app/onboarding";
import { auth } from '../config/FirebaseConfig';

const Main = () => {
  const user = auth.currentUser;

  return user ? (
    <Redirect href="/(tabs)/home" /> // Adjusted path for Redirect
  ) : (
    <OnboardingSwiper />
  );
};

// Enregistrement du composant principal
AppRegistry.registerComponent(appName, () => Main);

// Export par défaut du composant Main
export default Main;
