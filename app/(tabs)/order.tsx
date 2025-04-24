import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const Order = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pickupAddress, setPickupAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    interface OrderResponse {
        success: boolean;
        orderId?: string;
        message?: string;
    }
    
    const handleSubmit = async () => {
            const orderData = {
                client: { name, phone, email },
                pickupAddress: { address: pickupAddress },
                deliveryAddress: { address: deliveryAddress },
                items: [{ description, weight, quantity }],
                deliveryOptions: { date, time },
                payment: { method: 'carte', status: 'payé' },
            };
    
            try {
                const response = await axios.post<OrderResponse>('http://<YOUR_SERVER_URL>/api/orders', orderData);
                if (response.data.success) {
                    Alert.alert('Commande soumise avec succès !', `ID de commande: ${response.data.orderId}`);
                } else {
                    Alert.alert('Erreur', response.data.message || 'Une erreur est survenue.');
                }
            } catch (error) {
                console.error('Erreur lors de la soumission de la commande:', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la soumission.');
            }
        };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nom complet</Text>
            <TextInput placeholder="Nom" value={name} onChangeText={setName} />
            <Text>Numéro de téléphone</Text>
            <TextInput placeholder="Téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <Text>Email</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <Text>Adresse de ramassage</Text>
            <TextInput placeholder="Adresse de ramassage" value={pickupAddress} onChangeText={setPickupAddress} />
            <Text>Adresse de livraison</Text>
            <TextInput placeholder="Adresse de livraison" value={deliveryAddress} onChangeText={setDeliveryAddress} />
            <Text>Description des articles</Text>
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
            <Text>Poids</Text>
            <TextInput placeholder="Poids" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <Text>Quantité</Text>
            <TextInput placeholder="Quantité" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <Text>Date de livraison</Text>
            <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
            <Text>Heure de livraison</Text>
            <TextInput placeholder="Heure (HH:MM)" value={time} onChangeText={setTime} />
            <Button title="Passer la commande" onPress={handleSubmit} />
        </View>
    );
};

export default Order;