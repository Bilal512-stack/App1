import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Page2 = ({ navigation, route }) => {
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
            <Text style={styles.label}>Nom de l'expéditeur</Text>
            <TextInput style={styles.input} value={senderName} onChangeText={setSenderName} />
            
            <Text style={styles.label}>Adresse de l'expéditeur</Text>
            <TextInput style={styles.input} value={senderAddress} onChangeText={setSenderAddress} />
            
            <Text style={styles.label}>Nom du destinataire</Text>
            <TextInput style={styles.input} value={recipientName} onChangeText={setRecipientName} />
            
            <Text style={styles.label}>Adresse du destinataire</Text>
            <TextInput style={styles.input} value={recipientAddress} onChangeText={setRecipientAddress} />
            
            <Button title="Suivant" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { marginBottom: 5, fontSize: 16 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10 },
});

export default Page2;