import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    navigation: StackNavigationProp<any, any>;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('onboarding'); // Remplacez par le nom de votre écran d'onboarding
        }, 3000); // Durée de l'écran splash (3 secondes)

        return () => clearTimeout(timer); // Nettoyage du timer
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/mta.png')} // Chemin vers votre image
                style={styles.image}
                resizeMode="contain" // Ajuster l'image pour qu'elle soit contenue dans la vue
            />
            <Text style={styles.title}>Bienvenue !</Text>
            <ActivityIndicator size="large" color="#2C82D8FF" /> {/* Indicateur de chargement */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Couleur de fond
    },
    image: {
        width: 150, // Ajustez la largeur selon vos besoins
        height: 150, // Ajustez la hauteur selon vos besoins
        marginBottom: 20, // Espacement entre l'image et le titre
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SplashScreen;