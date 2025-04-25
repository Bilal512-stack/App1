import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Page4 = ({ weight, nature, truckType, senderName, senderAddress, recipientName, recipientAddress }: {
    weight: string; 
    nature: string; 
    truckType: string; 
    senderName: string; 
    senderAddress: string; 
    recipientName: string; 
    recipientAddress: string;
}) => {
    const router = useRouter();

    const handleSubmit = () => {
        // Logique pour soumettre la commande
        console.log({
            weight,
            nature,
            truckType,
            senderName,
            senderAddress,
            recipientName,
            recipientAddress,
        });
        // Naviguer vers une autre page ou afficher un message de confirmation
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Récapitulatif de la commande</Text>
            <Text>Poids: {weight} kg</Text>
            <Text>Nature: {nature}</Text>
            <Text>Type de camion: {truckType}</Text>
            <Text>Expéditeur: {senderName}</Text>
            <Text>Adresse de l'expéditeur: {senderAddress}</Text>
            <Text>Destinataire: {recipientName}</Text>
            <Text>Adresse du destinataire: {recipientAddress}</Text>

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
        fontSize: 20,
        marginBottom: 20,
    },
});

export default Page4;