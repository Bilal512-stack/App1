import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/FirebaseConfig';
import { ArrowLeft } from 'lucide-react-native'; // Ensure to import

const Order = () => {
    const router = useRouter();
    const [weight, setWeight] = useState(1);
    const [nature, setNature] = useState('');
    const [truckType, setTruckType] = useState('');
    const [formProgress, setFormProgress] = useState(0);

    // Update form progress when fields change
    useEffect(() => {
        let progress = 0;
        if (weight) progress += 0.33;
        if (nature) progress += 0.33;
        if (truckType) progress += 0.34;
        setFormProgress(progress);
    }, [weight, nature, truckType]);

    const handleNext = async () => {
        const orderDetails = {
            weight,
            nature,
            truckType,
            userEmail: auth.currentUser?.email,
        };

        try {
            const docRef = await addDoc(collection(db, 'orders'), orderDetails);
            console.log('Commande enregistrée avec ID :', docRef.id);
            router.push(`/create-order/page2?orderId=${docRef.id}`);
        } catch (e) {
            console.error('Erreur lors de l\'enregistrement de la commande :', e);
            Alert.alert('Erreur', 'Impossible d\'enregistrer la commande.');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <ArrowLeft size={20} color="#000"  />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Création de la Commande</Text>
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${formProgress * 100}%` }]} />
                    </View>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Poids de la marchandise (tonnes)</Text>
                        <View style={styles.weightControls}>
                            <TouchableOpacity onPress={() => setWeight(prev => Math.max(prev - 1, 1))} style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.weightDisplay}>{weight}</Text>
                            <TouchableOpacity onPress={() => setWeight(prev => prev + 1)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nature de la marchandise</Text>
                        <TextInput
                            style={styles.input}
                            value={nature}
                            onChangeText={setNature}
                            placeholder="Entrez la nature de la marchandise"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Type de camion</Text>
                        <Picker
                            selectedValue={truckType}
                            style={styles.picker}
                            onValueChange={(itemValue) => setTruckType(itemValue)}
                        >
                            <Picker.Item label="Camion frigorifique" value="Camion frigorifique" />
                            <Picker.Item label="Camion à plateau" value="Camion à plateau" />
                            <Picker.Item label="Camion à benne" value="Camion à benne" />
                            <Picker.Item label="Camion-citerne" value="Camion-citerne" />
                        </Picker>
                    </View>

                    <TouchableOpacity onPress={handleNext} style={styles.buttonNext}>
                        <Text style={styles.buttonNextText}>Suivant</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        marginTop: 0,
    },
    header: {
        flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'outfit-Bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },

    backButton: {
        padding: 8,
        marginRight: 12,
        borderRadius: 8,
},
       headerTitle: {
        fontSize: 18,
        fontWeight: '600',
},

    progressContainer: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    progressBarBackground: {
        height: 1,
        backgroundColor: '#f3f3f3',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 4,
    },
    content: {
        flex: 1,
    },

    label: {
        padding: 20,
        marginBottom: 10,
        fontSize: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    weightControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    weightDisplay: {
        fontSize: 18,
        width: 40,
        textAlign: 'center',
    },
    buttonNext: {
        backgroundColor: '#000',
        marginTop: 20,
        paddingVertical: 15,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonNextText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
});

export default Order;