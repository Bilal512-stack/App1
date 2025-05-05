import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Order } from '../../types/Order';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'; // Assurez-vous que ce chemin est correct

interface OrderCardProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (orderId: string) => void; // Changez le type pour l'ID de commande
}

const OrderCard = ({ order, onEdit, onDelete }: OrderCardProps) => {
  const handlePress = () => {
    Alert.alert(
      'Options',
      'Que souhaitez-vous faire?',
      [
        {
          text: 'Voir les détails',
          onPress: () => showDetails(order),
        },
        {
          text: 'Modifier',
          onPress: () => handleEdit(order),
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleLongPress = () => {
    Alert.alert(
      'Supprimer la commande',
      'Êtes-vous sûr de vouloir supprimer cette commande?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => handleDelete(order.id), // Utilisez l'ID de la commande
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const showDetails = (order: Order) => {
    Alert.alert(
      'Détails de la commande',
      `Poids: ${order.weight}\nNature: ${order.nature}\nType de camion: ${order.truckType}\nAdresse expéditeur: ${order.senderAddress}\nNom expéditeur: ${order.senderName}\nTéléphone expéditeur: ${order.senderPhone}\nNom destinataire: ${order.recipientName}\nTéléphone destinataire: ${order.recipientPhone}\nAdresse destinataire: ${order.recipientAddress}\n`,
      [{ text: 'OK' }]
    );
  };

  const handleDelete = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId)); // Supprimez la commande de la BD
      Alert.alert('Commande supprimée', 'La commande a été supprimée avec succès.');
      onDelete(orderId); // Appel à la fonction de rappel pour mettre à jour l'état dans le parent
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
      Alert.alert('Erreur', 'Échec de la suppression de la commande. Veuillez réessayer.');
    }
  };

  const handleEdit = (order: Order) => {
    // Supprimez la commande existante avant de rediriger
    handleDelete(order.id);
    onEdit(order); // Appel à la fonction de rappel pour passer à l'étape de création
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      onLongPress={handleLongPress}
      underlayColor="#f5f5f5"
      style={styles.card}
    >
      <View>
        <View style={styles.header}>
          <Text style={styles.statusBadge}>Crée</Text>
          <Text style={styles.dateText}>Date de création: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Poids:</Text>
            <Text style={styles.value}>{order.weight}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Nature:</Text>
            <Text style={styles.value}>{order.nature}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Type de Camion:</Text>
            <Text style={styles.value}>{order.truckType}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expéditeur</Text>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Nom:</Text>
              <Text style={styles.value}>{order.senderName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Téléphone:</Text>
              <Text style={styles.value}>{order.senderPhone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Adresse:</Text>
              <Text style={styles.value}>{order.senderAddress}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destinataire</Text>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Nom:</Text>
              <Text style={styles.value}>{order.recipientName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Téléphone:</Text>
              <Text style={styles.value}>{order.recipientPhone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Adresse:</Text>
              <Text style={styles.value}>{order.recipientAddress}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusBadge: {
    color: 'white',
    backgroundColor: '#e53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: '#757575',
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  label: {
    flex: 0.4,
    fontSize: 14,
    fontWeight: '500',
    color: '#616161',
  },
  value: {
    flex: 0.6,
    fontSize: 14,
    color: '#212121',
  },
  section: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#424242',
  },
});

export default OrderCard;