import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
    Page2: { weight: string; nature: string; truckType: string };
};

type Page1NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page2'>;

const Page1 = ({ navigation }: { navigation: Page1NavigationProp }) => {
    const [weight, setWeight] = useState('');
    const [nature, setNature] = useState('');
    const [truckType, setTruckType] = useState('');

    const handleNext = () => {
        navigation.navigate('Page2', { weight, nature, truckType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Poids de la marchandise (kg)</Text>
            <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
            
            <Text style={styles.label}>Nature de la marchandise</Text>
            <TextInput style={styles.input} value={nature} onChangeText={setNature} />
            
            <Text style={styles.label}>Type de camion</Text>
            <TextInput style={styles.input} value={truckType} onChangeText={setTruckType} />
            
            <Button title="Suivant" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { marginBottom: 5, fontSize: 16 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10 },
});

export default Page1;