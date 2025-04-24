import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Page2: { weight: string; nature: string; truckType: string };
    Page3: { weight: string; nature: string; truckType: string; senderName: string; senderAddress: string; recipientName: string; recipientAddress: string };
};

type Page2NavigationProp = StackNavigationProp<RootStackParamList, 'Page2'>;
type Page2RouteProp = RouteProp<RootStackParamList, 'Page2'>;

const Page2 = ({ navigation, route }: { navigation: Page2NavigationProp; route: Page2RouteProp }) => {
    const { weight, nature, truckType } = route.params;
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

    const handleNext = () => {
        navigation.navigate('Page3', {
            weight, nature, truckType,
            senderName, senderAddress,
            recipientName, recipientAddress
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom de l'expéditeur</Text>
                <TextInput
                    style={styles.input}
                    value={senderName}
                    onChangeText={setSenderName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Adresse de l'expéditeur</Text>
                <TextInput
                    style={styles.input}
                    value={senderAddress}
                    onChangeText={setSenderAddress}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom du destinataire</Text>
                <TextInput
                    style={styles.input}
                    value={recipientName}
                    onChangeText={setRecipientName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Adresse du destinataire</Text>
                <TextInput
                    style={styles.input}
                    value={recipientAddress}
                    onChangeText={setRecipientAddress}
                />
            </View>

            <TouchableOpacity
                onPress={handleNext}
                style={styles.button}>
                <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20, // Espace entre les champs
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
    button: {
        padding: 20,
        marginTop: 50,
        backgroundColor: '#000',
        borderRadius: 15,
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Page2;