import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Order } from '../../types/Order';
import OrderCard from './OrderCard';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { getCoordinates, calculateDistances, DistanceInfo } from '../../utils/distanceUtils'; // Assurez-vous que le chemin est correct

interface UserOrderListProps {
  orderData: Order[];
  setOrderData: React.Dispatch<React.SetStateAction<Order[]>>;
  onUpdateOrder?: (order: Order) => void;
}

const UserOrderList: React.FC<UserOrderListProps> = ({ 
  orderData,
  setOrderData,
  onUpdateOrder
}) => {
  const [distances, setDistances] = useState<Record<string, DistanceInfo>>({});

  useEffect(() => {
    const fetchDistances = async () => {
      const calculatedDistances = await calculateDistances(orderData);
      setDistances(calculatedDistances);
    };

    fetchDistances();
  }, [orderData]);

  const handleEditOrder = (order: Order) => {
    if (onUpdateOrder) {
      onUpdateOrder(order);
    } else {
      Alert.alert(
        'Modifier la commande',
        'Cette action ouvre un formulaire pour modifier la commande.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const orderDoc = doc(db, 'orders', orderId);
      await deleteDoc(orderDoc);
      console.log('Commande supprimée avec succès');
      
      setOrderData((prevOrders: Order[]) => prevOrders.filter(order => order.id !== orderId));
      Alert.alert('Commande supprimée', 'La commande a été supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
      Alert.alert('Erreur', 'Échec de la suppression de la commande. Veuillez réessayer.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {orderData.map((order) => (
        <OrderCard
          key={order.id}
          order={{ ...order, distance: distances[order.id]?.distance ?? 0 }} // Ajoutez la distance ici
          onEdit={handleEditOrder}
          onDelete={() => handleDeleteOrder(order.id)}
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

export default UserOrderList;