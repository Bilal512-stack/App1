import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

interface Order {
  senderName: string;
  senderPhone: number;
  recipientName: string;
  recipientPhone: number;
  recipientAddress: string;
  senderAddress: string;
  weight: number;
  nature: string;
  truckType: string;
}

export default function UserOrderList({ orderData }: { orderData: Order[] }) {
  const handleOrderClick = (order: Order) => {
    Alert.alert(
      'Détails de la commande',
      `Poids: ${order.weight}\nNature: ${order.nature}\nType de camion: ${order.truckType}\nAdresse expéditeur: ${order.senderAddress}\nNom expéditeur: ${order.senderName}\nTéléphone expéditeur: ${order.senderPhone}\nNom destinataire: ${order.recipientName}\nTéléphone destinataire: ${order.recipientPhone}\nAdresse destinataire: ${order.recipientAddress}\n`
    );
  };

  return (
    <View>
      {orderData.map((order, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
          onPress={() => handleOrderClick(order)} // Action au clic
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            <Text style={{ color: 'red', fontSize: 14 }}>Crée</Text> {/* Texte "Crée" en rouge */}
          </Text>
          <Text>Date de création:</Text>
          <Text>Poids: {order.weight}</Text>
          <Text>Nature: {order.nature}</Text>
          <Text>Type de Camion: {order.truckType}</Text>
          <Text>Adresse de l'expediteur: {order.senderAddress}</Text>
          <Text>Nom de l'expediteur: {order.senderName}</Text>
          <Text>Numéro de l'expediteur: {order.senderPhone}</Text>
          <Text>Nom du destinataire: {order.recipientName}</Text>
          <Text>Numéro du destinataire: {order.recipientPhone}</Text>
          <Text>Adresse du destinataire: {order.recipientAddress}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}