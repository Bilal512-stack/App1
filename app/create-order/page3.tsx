// Page3.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Page3 = ({ navigation, route }) => {
    const { weight, nature, truckType, senderName, senderAddress, recipientName, recipientAddress } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Récapitulatif de votre commande</Text>
            <Text>Poids : {weight} kg</Text>
            <Text>Nature : {nature}</Text>
            <Text>Type de camion : {truckType}</Text>
            <Text>Expéditeur : {senderName}, {senderAddress}</Text>
            <Text>Destinataire : {recipientName}, {recipientAddress}</Text>
            <Button title="Confirmer" onPress={() => navigation.navigate('Page4')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, marginBottom: 20 },
});

export default Page3;