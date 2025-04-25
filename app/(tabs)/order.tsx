import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


const Order = () => {

    const router = useRouter();
    const [weight, setWeight] = useState(1); // Poids initialisé à 1
    const [nature, setNature] = useState('');
    const [truckType, setTruckType] = useState(' Camion à Plateau'); // Type de camion par défaut

    const handleNext = () => {
        router.push(`/create-order/page2?weight=${weight}&nature=${encodeURIComponent(nature)}&truckType=${encodeURIComponent(truckType)}`);
    };

    const incrementWeight = () => {
        setWeight(prevWeight => prevWeight + 1);
    };

    const decrementWeight = () => {
        setWeight(prevWeight => (prevWeight > 1 ? prevWeight - 1 : 1)); // Ne pas descendre en dessous de 1
    };

    return (
        <><Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'black',
            headerStyle: { backgroundColor: '#fff' }, 
        }}></Tabs>
        <><View style={{ padding: 15, paddingTop: 5, backgroundColor: '#fff' }}>
            <TouchableOpacity>
                <Ionicons name="arrow-back" size={30} color="black"
                    onPress={() => router.back()} style={{ marginTop: 50, marginLeft: 20 }} />
            </TouchableOpacity>
        </View><View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Création de la Commande</Text>
                    </View>

                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Poids de la marchandise (kg)</Text>
                            <View style={styles.weightControls}>
                                <TouchableOpacity onPress={decrementWeight} style={styles.button}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.weightDisplay}>{weight}</Text>
                                <TouchableOpacity onPress={incrementWeight} style={styles.button}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nature de la marchandise</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#000', padding: 10, borderRadius: 5 }}
                                value={nature}
                                onChangeText={setNature}
                                placeholder="Entrez la nature de la marchandise" />
                        </View>
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
                </View></></>
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
        backgroundColor: '#070707FF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 25,
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
    label: {
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'outfit',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    weightControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityControls: {
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
        width: 50,
        textAlign: 'center',
    },
    quantityDisplay: {
        fontSize: 18,
        width: 50,
        textAlign: 'center',
    },
    buttonNext: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNextText: {
        fontSize: 17,
        fontFamily: 'outfit',
        color: 'white',
        textAlign: 'center',
    },
});

export default Order;