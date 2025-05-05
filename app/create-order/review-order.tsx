import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { DocumentData } from 'firebase/firestore';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import haversine from 'haversine';

const ReviewOrder = () => {
    const router = useRouter();
    const { orderId } = useLocalSearchParams();
    const [orderData, setOrderData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState<number | null>(null);

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
                    const data = docSnap.data();
                    setOrderData(data);
                    calculateDistance(data.senderAddress, data.recipientAddress);
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

    const calculateDistance = async (senderAddress: string, recipientAddress: string) => {
        try {
            const senderResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: senderAddress,
                    key: 'a02dfb9bc224455ea4a328978eba5a78'
                }
            });

            const recipientResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: recipientAddress,
                    key: 'a02dfb9bc224455ea4a328978eba5a78'
                }
            });

            const senderLocation = senderResponse.data.results[0]?.geometry;
            const recipientLocation = recipientResponse.data.results[0]?.geometry;

            if (senderLocation && recipientLocation) {
                const senderCoords = {
                    latitude: senderLocation.lat,
                    longitude: senderLocation.lng
                };
                const recipientCoords = {
                    latitude: recipientLocation.lat,
                    longitude: recipientLocation.lng
                };

                const distanceInKm = haversine(senderCoords, recipientCoords, { unit: 'km' });
                setDistance(distanceInKm);
            } else {
                Alert.alert('Erreur', 'Impossible de récupérer les coordonnées des adresses.');
            }
        } catch (error) {
            console.error('Erreur lors du calcul de la distance:', error);
            Alert.alert('Erreur', 'Impossible de calculer la distance.');
        }
    };

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
            {/* Affichage de la distance */}
            {distance !== null && (
                <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} km</Text>
            )}
            {/* Autres détails de la commande */}
            {/* Poids */}
            <View style={styles.row}>
                <FontAwesome5 name="weight" size={24} color="black" />
                <Text style={styles.label}>  Poids</Text>
                <Text style={styles.value}>{orderData.weight} tonnes</Text>
            </View>
            {/* Nature */}
            <View style={styles.row}>
                <FontAwesome5 name="product-hunt" size={24} color="black" />
                <Text style={styles.label}>  Nature</Text>
                <Text style={styles.value}>{orderData.nature}</Text>
            </View>

            {/* Type de camion */}
            <View style={styles.row}>
                <FontAwesome5 name="truck-moving" size={24} color="black" />
                <Text style={styles.label}> Type de camion</Text>
                <Text style={styles.value}>{orderData.truckType}</Text>
            </View>

            {/* Expéditeur */}
            <View style={styles.row}>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.label}>  Nom de l'expediteur</Text>
                <Text style={styles.value}>{orderData.senderName}</Text>
            </View>

            {/* Adresse de l'expéditeur */}
            <View style={styles.row}>
                <Entypo name="address" size={24} color="black" />
                <Text style={styles.label}>  Adresse de l'expediteur</Text>
                <Text style={styles.value}>{orderData.senderAddress}</Text>
            </View>

            {/* Numéro de l'expéditeur */}
            <View style={styles.row}>
                <MaterialIcons name="numbers" size={24} color="black" />
                <Text style={styles.label}>  Numéro de l'expediteur</Text>
                <Text style={styles.value}>{orderData.senderPhone}</Text>
            </View>

            {/* Destinataire */}
            <View style={styles.row}>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.label}>  Nom du Destinataire</Text>
                <Text style={styles.value}>{orderData.recipientName}</Text>
            </View>

            {/* Adresse du destinataire */}
            <View style={styles.row}>
                <Entypo name="address" size={24} color="black" />
                <Text style={styles.label}>  Adresse du Destinataire</Text>
                <Text style={styles.value}>{orderData.recipientAddress}</Text>
            </View>

            {/* Numéro du destinataire */}
            <View style={styles.row}>
                <MaterialIcons name="numbers" size={24} color="black" />
                <Text style={styles.label}>  Numero du Destinataire</Text>
                <Text style={styles.value}>{orderData.recipientPhone}</Text>
            </View>
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
        fontFamily: 'outfit-Bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    distanceText: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        color: 'gray',
        flex: 1,
        fontFamily: 'outfit-Bold',
    },
    value: {
        fontSize: 18,
        flex: 2,
    },
    button: {
        padding: 20,
        marginTop: 10,
        backgroundColor: '#000',
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ReviewOrder;