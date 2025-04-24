import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router'; // Pas besoin d'importer useRouter ici
import { TouchableOpacity } from 'react-native';

const Order = () => {
    const [weight, setWeight] = useState('');
    const [nature, setNature] = useState('');
    const [truckType, setTruckType] = useState('');

    const handleNext = () => {
        router.push('/create-order/page2', { weight, nature, truckType });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Poids de la marchandise (kg)</Text>
                <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nature de la marchandise</Text>
                <TextInput
                    style={styles.input}
                    value={nature}
                    onChangeText={setNature}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Type de camion</Text>
                <TextInput
                    style={styles.input}
                    value={truckType}
                    onChangeText={setTruckType}
                />
            </View>

            <TouchableOpacity
                onPress={() => router.push('/create-order/page2')}
                style={{
                    padding: 20,
                    marginTop: 50,
                    backgroundColor: '#000',
                    borderRadius: 15,
                    borderWidth: 1,
                }}>
                <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        backgroundColor: '#fff',
        padding: 30,
    },
    inputContainer: {
        marginBottom: 20, // Ajoute un espacement entre les champs
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default Order;