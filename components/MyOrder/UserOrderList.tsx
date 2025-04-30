import { View, Text, Image } from 'react-native'
import React from 'react'

interface Order {
  senderName: string;
  senderPhone: number;
  senderCountryCode: number;
  recipientName: string;
  recipientPhone: number;
  recipientCountryCode: number;
  recipientAddress: string;  
  senderAddress: string;
  id: string;
  weight: number;
  nature: string;
  truckType: string;
  
}

export default function UserOrderList({ orderData }: { orderData: Order[] }) {
  return (
    <View>
        {orderData.map((order, index) => (
            <View key={index} style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order ID: {order.id}</Text>
            <Text>Weight: {order.weight}</Text>
            <Text>Nature: {order.nature}</Text>
            <Text>Truck Type: {order.truckType}</Text>
            <Text>SenderAddress:  {order.senderAddress} </Text>
            <Text>Sender Name: {order.senderName}</Text>
            <Text>Sender Phone: {order.senderPhone}</Text>
            <Text>Sender Country Code: {order.senderCountryCode}</Text>
            <Text>Recipient Name: {order.recipientName}</Text>
            <Text>Recipient Phone: {order.recipientPhone}</Text>
            <Text>Recipient Country Code: {order.recipientCountryCode}</Text>
            <Text>Recipient Address: {order.recipientAddress}</Text>
            
            </View>
        ))}
    </View>
  )
}