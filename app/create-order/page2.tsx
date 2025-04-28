import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; // Importez react-native-maps

const opencageApiKey = Constants.expoConfig?.extra?.opencageApiKey;
console.log('Opencage API Key:', opencageApiKey);

const Page2 = ({ weight, nature, truckType }: { weight: string; nature: string; truckType: string; }) => {
    const router = useRouter();
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [phoneSender, setPhoneSender] = useState('');
    const [countryCode, setCountryCode] = useState('+237');
    const [countryCodes, setCountryCodes] = useState<{ name: string; code: string; flag: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [showMap, setShowMap] = useState(false); // État pour afficher ou masquer la carte

    // Demander les permissions de localisation
    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'La permission de localisation est nécessaire pour continuer.');
                return;
            }

            // Obtenez la position actuelle
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                lat: currentLocation.coords.latitude,
                lng: currentLocation.coords.longitude,
            });
        };

        requestLocationPermission();
    }, []);

    const handleAddressPress = () => {
        setShowMap(true); // Affiche la carte lorsque l'utilisateur clique sur l'adresse
    };

    const handleMapClose = () => {
        setShowMap(false); // Ferme la carte
    };

    const handleMapSelect = (coordinate: { latitude: number; longitude: number }) => {
        setSenderAddress(`Lat: ${coordinate.latitude}, Lng: ${coordinate.longitude}`);
        setShowMap(false); // Ferme la carte après la sélection
    };

    return (
        <>
            <View style={{ padding: 15, paddingTop: 5, backgroundColor: '#fff' }}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={30} color="black"
                        onPress={() => router.back()} style={{ marginTop: 50, marginLeft: 20 }} />
                </TouchableOpacity>
            </View>
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
                    onFocus={handleAddressPress} // Affiche la carte lorsque l'utilisateur clique sur l'adresse
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Numéro de l'expéditeur</Text>
                <View style={styles.phoneContainer}>
                    {loading ? (
                        <Text>Chargement des pays...</Text>
                    ) : (
                        <Picker
                            selectedValue={countryCode}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCountryCode(itemValue)}
                        >
                            {countryCodes.map((country) => (
                                <Picker.Item key={country.code} label={`${country.flag} ${country.name} (${country.code})`} value={country.code} />
                            ))}
                        </Picker>
                    )}
                    <TextInput
                        style={[styles.input, styles.phoneInput]}
                        value={phoneSender}
                        onChangeText={setPhoneSender}
                        keyboardType="phone-pad"
                        placeholder="Numéro de téléphone"
                    />
                </View>
            </View>

            {location && (
                <Text>Votre position actuelle : {location.lat}, {location.lng}</Text>
            )}

            <TouchableOpacity onPress={() => router.push('/create-order/page3')} style={styles.button}>
                <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>

            {/* Modale pour afficher la carte */}
            <Modal visible={showMap} animationType="slide">
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location?.lat || 0,
                            longitude: location?.lng || 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={(e) => handleMapSelect(e.nativeEvent.coordinate)}
                    >
                        {location && (
                            <Marker
                                coordinate={{
                                    latitude: location.lat,
                                    longitude: location.lng,
                                }}
                                title="Votre position"
                            />
                        )}
                    </MapView>
                    <TouchableOpacity onPress={handleMapClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
        </View>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 0,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'outfit',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        height: 70,
        width: 130,
        marginRight: 10,
    },
    phoneInput: {
        flex: 1,
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
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Page2;