import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Page2 = ({ weight, nature, truckType }: { weight: string; nature: string; truckType: string; }) => {
    const router = useRouter();
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

    const handleNext = () => {
        router.push(`/create-order/page3?weight=${encodeURIComponent(weight)}&nature=${encodeURIComponent(nature)}&truckType=${encodeURIComponent(truckType)}&senderName=${encodeURIComponent(senderName)}&senderAddress=${encodeURIComponent(senderAddress)}&recipientName=${encodeURIComponent(recipientName)}&recipientAddress=${encodeURIComponent(recipientAddress)}`);
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
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 20,
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