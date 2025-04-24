// Page4.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Page4 = ({ navigation }) => {
    const handleSubmit = () => {
        // Logique de soumission ici (peut-être un appel API)
        alert('Commande soumise avec succès !');
        navigation.navigate('Page1'); // Retour à la première page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Merci pour votre commande !</Text>
            <Button title="Soumettre" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, marginBottom: 20 },
});

export default Page4;