import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import Page1 from '../create-order/page1'; 

import { NavigationProp } from '@react-navigation/native';

const Order = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const sheetRef = useRef(null);

    const renderContent = () => (
        <View style={{ backgroundColor: 'white', padding: 16, height: '100%' }}>
            <Page1 navigation={navigation} sheetRef={sheetRef} /> {/* Passe la référence de navigation */}
        </View>
    );

    React.useEffect(() => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(0); // Ouvre le Bottom Sheet lors du chargement
        }
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap with GestureHandlerRootView */}
            <View style={{ flex: 1 }}>
                <Text style={{ padding: 20, fontSize: 20 }}>Détails de la commande</Text>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[450, 0]} // Ajuste la hauteur comme nécessaire
                    borderRadius={10}
                    renderContent={renderContent}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default Order;