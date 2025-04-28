import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { CreateOrderContext } from '@/context/CreateOrderContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ReviewOrder(): JSX.Element {

    const navigation=useNavigation();
    const { orderData, setOrderData } = useContext(CreateOrderContext) || { orderData: null, setOrderData: () => {} }; // Provide fallback values

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: ''
            
        });
    }, [navigation]);


  return (
    <View style={{
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#fff',
        height: '100%',
    }}>
      <Text style={{
        fontFamily:'outfit-Bold',
        fontSize: 25,
        marginTop: 0,
      }}>Review your order</Text>

    <View style= {{
      marginTop: 20,
    }} >
      <Text style={{
        fontFamily:'outfit-SemiBold',
       fontSize: 20,       
      }}>
        Before you place your order,
         please review the details below to ensure everything is correct.
      </Text>
    </View>

    <View style={{
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
       <FontAwesome5 name="weight" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Weight</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} tonnes
        </Text>
      </View>
 <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
       <FontAwesome5 name="product-hunt" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Nature</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight}   
              </Text>
      </View>

      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
      <FontAwesome5 name="truck-moving" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Camion</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
      <Ionicons name="person" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Expediteur</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
       <Entypo name="address" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Adresse Expediteur</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
      <MaterialIcons name="numbers" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Numero Expediteur</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
      <Ionicons name="person" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Destinataire</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight}
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
      <Entypo name="address" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Adresse Destinataire</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
      <View style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap:20
      }}>
       <MaterialIcons name="numbers" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit',
            fontSize: 20,
            color: 'gray',
        }}>Numero Destinataire</Text>
        <Text style={{
            fontFamily:'outfit-SemiBold',
            fontSize: 20,                       
        }}>{orderData?.weight?.weight} 
        </Text>
      </View>
    </View>
  )
}

