import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "@/app/navigation/appNavigation";
import { CreateOrderProvider } from '@/context/CreateOrderContext';
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'react-native';

const App = () => {
    useEffect(() => {
        const prepare = async () => {
            try {
                // Empêche le SplashScreen de se cacher automatiquement
                await SplashScreen.preventAutoHideAsync();

                // Précharge l'image du SplashScreen
                await Image.prefetch(require('./assets/images/mta.png'));
            } catch (e) {
                console.warn(e);
            } finally {
                // Cache le SplashScreen une fois prêt
                await SplashScreen.hideAsync();
            }
        };

        prepare();
    }, []);

    return (
        <CreateOrderProvider>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </CreateOrderProvider>
    );
};

export default App;