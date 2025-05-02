import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { DocumentData } from 'firebase/firestore';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const ReviewOrder = () => {
    const router = useRouter();
    const { orderId } = useLocalSearchParams(); // Récupère l'ID de la commande depuis les paramètres
    const [orderData, setOrderData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            try {
                if (!orderId) {
                    Alert.alert('Erreur', 'ID de commande introuvable.');
                    return;
                }

                const docRef = doc(db, 'orders', Array.isArray(orderId) ? orderId[0] : orderId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrderData(docSnap.data());
                } else {
                    Alert.alert('Erreur', 'Aucune commande trouvée pour cet ID.');
                }
            } catch (e) {
                console.error('Erreur lors de la récupération des données :', e);
                Alert.alert('Erreur', 'Impossible de récupérer les données.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]);

    const handleSubmit = () => {
        Alert.alert(
            'Succès',
            'Commande soumise avec succès !',
            [
                {
                    text: 'OK',
                    onPress: () => router.push('/'), // Redirige vers la page d'accueil
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Chargement des données...</Text>
            </View>
        );
    }

    if (!orderData) {
        return (
            <View style={styles.container}>
                <Text>Aucune donnée disponible.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Review your order</Text>

            <Text style={styles.subtitle}>
                Before you place your order, please review the details below to ensure everything is correct.
            </Text>

            {/* Poids */}
            <View style={styles.row}>
                <FontAwesome5 name="weight" size={24} color="black" />
                <Text style={styles.label}>Weight</Text>
                <Text style={styles.value}>{orderData.weight} tonnes</Text>
            </View>

            {/* Nature */}
            <View style={styles.row}>
                <FontAwesome5 name="product-hunt" size={24} color="black" />
                <Text style={styles.label}>Nature</Text>
                <Text style={styles.value}>{orderData.nature}</Text>
            </View>

            {/* Type de camion */}
            <View style={styles.row}>
                <FontAwesome5 name="truck-moving" size={24} color="black" />
                <Text style={styles.label}>Truck Type</Text>
                <Text style={styles.value}>{orderData.truckType}</Text>
            </View>

            {/* Expéditeur */}
            <View style={styles.row}>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.label}>Sender</Text>
                <Text style={styles.value}>{orderData.senderName}</Text>
            </View>

            {/* Adresse de l'expéditeur */}
            <View style={styles.row}>
                <Entypo name="address" size={24} color="black" />
                <Text style={styles.label}>Sender Address</Text>
                <Text style={styles.value}>{orderData.senderAddress}</Text>
            </View>

            {/* Numéro de l'expéditeur */}
            <View style={styles.row}>
                <MaterialIcons name="numbers" size={24} color="black" />
                <Text style={styles.label}>Sender Phone</Text>
                <Text style={styles.value}>{orderData.senderPhone}</Text>
            </View>

            {/* Destinataire */}
            <View style={styles.row}>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.label}>Recipient</Text>
                <Text style={styles.value}>{orderData.recipientName}</Text>
            </View>

            {/* Adresse du destinataire */}
            <View style={styles.row}>
                <Entypo name="address" size={24} color="black" />
                <Text style={styles.label}>Recipient Address</Text>
                <Text style={styles.value}>{orderData.recipientAddress}</Text>
            </View>

            {/* Numéro du destinataire */}
            <View style={styles.row}>
                <MaterialIcons name="numbers" size={24} color="black" />
                <Text style={styles.label}>Recipient Phone</Text>
                <Text style={styles.value}>{orderData.recipientPhone}</Text>
            </View>

            {/* Bouton pour soumettre la commande */}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Soumettre la Commande</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'gray',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: 'outfit',
        color: 'gray',
        flex: 1,
    },
    value: {
        fontSize: 18,
        fontFamily: 'outfit-SemiBold',
        flex: 2,
    },
    button: {
        padding: 20,
        marginTop: 10,
        backgroundColor: '#000',
        borderRadius: 15,
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ReviewOrder;