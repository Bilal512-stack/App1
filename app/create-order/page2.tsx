import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants'; // Assurez-vous que tout est configuré

const opencageApiKey = Constants.manifest.extra.opencageApiKey;
const Page2 = ({ weight, nature, truckType }: { weight: string; nature: string; truckType: string; }) => {
    const router = useRouter();
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [phoneSender, setPhoneSender] = useState('');
    const [countryCode, setCountryCode] = useState('+237'); // Code par défaut (Cameroun)
    const [countryCodes, setCountryCodes] = useState<{ name: string; code: string; flag: string }[]>([]);
    const [loading, setLoading] = useState(true); // État de chargement

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://countries.trevorblades.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            {
                                countries {
                                    name
                                    code
                                    phone
                                    emoji
                                }
                            }
                        `,
                    }),
                });
                const { data } = await response.json();
                if (data && data.countries) {
                    const formattedData = data.countries.map(country => ({
                        name: country.name,
                        code: country.phone,
                        flag: country.emoji, // Utilisation d'emoji pour le drapeau
                    }));
                    setCountryCodes(formattedData);
                } else {
                    console.error('Format de données inattendu:', data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des pays:', error);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchCountries();
    }, []);

    const geocodeAddress = async (address: string) => {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { geometry } = data.results[0];
                console.log('Coordonnées:', geometry.lat, geometry.lng);
                return { lat: geometry.lat, lng: geometry.lng }; // Retourne les coordonnées
            } else {
                console.error('Aucune donnée trouvée pour cette adresse.');
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de la géocodage:', error);
            return null;
        }
    };

    const handleNext = async () => {
        const coords = await geocodeAddress(senderAddress); // Appelle la fonction de géocodage
        if (coords) {
            // Passer les coordonnées à la page suivante si nécessaire
            router.push(`/create-order/page3?weight=${encodeURIComponent(weight)}&nature=${encodeURIComponent(nature)}&truckType=${encodeURIComponent(truckType)}&senderName=${encodeURIComponent(senderName)}&senderAddress=${encodeURIComponent(senderAddress)}&phoneSender=${encodeURIComponent(countryCode + phoneSender)}&lat=${coords.lat}&lng=${coords.lng}`);
        } else {
            alert('Erreur lors de la géocodage de l\'adresse, veuillez vérifier l\'adresse saisie.');
        }
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
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 100
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'outfit'
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
        flex: 1,
        padding: 15,
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
});

export default Page2;