import { SplashScreen, Stack } from "expo-router";
import './global.css';
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { CreateOrderContext } from "../context/CreateOrderContext";

export default function RootLayout() {
    const [orderData, setOrderData] = useState([]); // État déclaré en haut
    const [fontsLoaded] = useFonts({
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null; // Ne pas afficher tant que les polices ne sont pas chargées

    return (
        <CreateOrderContext.Provider value={{ orderData, setOrderData }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
            </Stack>
        </CreateOrderContext.Provider>
    );
}