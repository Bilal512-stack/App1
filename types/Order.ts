export interface Order {
    id: string; // ID de la commande
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