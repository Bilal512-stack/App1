import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const Page4 = () => {
    const router = useRouter();
    const {
        weight,
        nature,
        truckType,
        senderName,
        senderAddress,
        recipientName,
        recipientAddress,
    } = useLocalSearchParams();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://YOUR_SERVER_URL/api/orders', {
                weight,
                nature,
                truckType,
                senderName,
                senderAddress,
                recipientName,
                recipientAddress,
            });
            console.log(response.data);
            Alert.alert('Commande soumise avec succès !');
            router.push('/'); // Retour à la page d'accueil ou autre
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur lors de la soumission de la commande');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Récapitulatif de la commande</Text>
            <Text style={styles.info}>Poids : {weight} kg</Text>
            <Text style={styles.info}>Nature : {nature}</Text>
            <Text style={styles.info}>Type de camion : {truckType}</Text>
            <Text style={styles.info}>Expéditeur : {senderName}</Text>
            <Text style={styles.info}>Adresse de l'expéditeur : {senderAddress}</Text>
            <Text style={styles.info}>Destinataire : {recipientName}</Text>
            <Text style={styles.info}>Adresse du destinataire : {recipientAddress}</Text>

            <Button title="Soumettre la commande" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        padding: 20,
        marginTop: 50,
        backgroundColor: '#000',
        borderRadius: 15,
        borderWidth: 1,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Page4;