import React from 'react';
import { Router, Stack } from 'expo-router';
import AppNavigation from "@/app/navigation/appNavigation";
import { CreateOrderProvider } from '@/context/CreateOrderContext'; // Assurez-vous que le chemin est correct

const App = () => {
    return (
        <CreateOrderProvider>
            <AppNavigation />
            <Stack />
        </CreateOrderProvider>
    );
}

export default App;