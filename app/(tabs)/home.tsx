import StartNewOrder from '@/components/MyOrder/StartNewOrder';
import { auth, db } from '@/config/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import UserOrderList from '@/components/MyOrder/UserOrderList';

type Order = {
    id?: string; // ID de la commande, si nécessaire
    senderName: string;
    senderPhone: number;
    senderCountryCode: string;
    recipientName: string;
    recipientPhone: number;
    recipientAddress: string;
    weight: number;
    nature: string;
    truckType: string;
    userEmail: string;
    [key: string]: any; // Si vous avez des champs supplémentaires
};

const Home = () => {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('User email:', user.email); // Vérifiez l'email de l'utilisateur
            GetMyOrder();
        }
    }, [user]);

    const GetMyOrder = async () => {
        try {
            setLoading(true);
            setOrderData([]);
            const q = query(collection(db, 'orders'), where('userEmail', '==', user?.email));
            const querySnapshot = await getDocs(q);

            const orders: Order[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                orders.push({
                    id: doc.id, // Ajoutez l'ID de la commande ici
                    senderName: data.senderName || '',
                    senderPhone: data.senderPhone || '',
                    senderCountryCode: data.senderCountryCode || '',
                    recipientName: data.recipientName || '',
                    recipientPhone: data.recipientPhone || '',
                    recipientAddress: data.recipientAddress || '',
                    weight: data.weight || '',
                    nature: data.nature || '',
                    truckType: data.truckType || '',
                    userEmail: data.userEmail || '',
                    ...data, // Inclure d'autres champs si nécessaire
                });
            });

            setOrderData(orders);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes :', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 25, paddingTop: 55, backgroundColor: 'white', height: '100%' }}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                }}
            >
                <Text style={{ fontSize: 35, fontFamily: 'outfit-Bold' }}>My Order</Text>
                <Ionicons name="add-circle" size={50} color="black" />
            </View>
            {loading && <ActivityIndicator size={'large'} color={'black'} />}

            {orderData?.length === 0 ? <StartNewOrder /> : <UserOrderList orderData={orderData} setOrderData={setOrderData} />}
        </View>
    );
};

export default Home;