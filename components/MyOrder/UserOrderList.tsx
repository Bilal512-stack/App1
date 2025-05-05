import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Order } from '../../types/Order';
import OrderCard from './OrderCard';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'; // Assurez-vous que ce chemin est correct

interface UserOrderListProps {
  orderData: Order[];
  onUpdateOrder?: (order: Order) => void;
  onDeleteOrder?: (orderId: string) => void; // Changez le type pour l'ID de commande
}

export default function UserOrderList({ 
  orderData,
  onUpdateOrder,
  onDeleteOrder
}: UserOrderListProps) {
  
  const handleEditOrder = (order: Order) => {
    if (onUpdateOrder) {
      onUpdateOrder(order);
    } else {
      Alert.alert(
        'Modifier la commande',
        'Cette action ouvrirait un formulaire pour modifier la commande.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (onDeleteOrder) {
      await onDeleteOrder(orderId); // Passez l'ID de la commande
    } else {
      Alert.alert(
        'Suppression',
        'La commande a été supprimée.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {orderData.map((order, index) => (
        <OrderCard
          key={index}
          order={order}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 1.5,
    paddingVertical: 10,
  },
});