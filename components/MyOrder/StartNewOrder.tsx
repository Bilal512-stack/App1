import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function StartNewOrder() {
  const route = useRouter();


  return (
    <View style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap:20
    }} 
    >
        <FontAwesome name="folder-open" size={24} color="black" />
        <Text style={{
            fontSize: 25,
            fontFamily: 'outfit-SemiBold',
            }}>No Order Planned Yet</Text>

        <Text style={{
            fontSize: 20,
            fontFamily: 'outfit',
            textAlign: 'center',
            color: '#A0A0A0',
            }}>Time to pass a new order</Text>

            <TouchableOpacity onPress={() => route.push('/order')}
             style={{
                padding: 15,
                backgroundColor: '#151414FF',
                borderRadius: 15,
                paddingHorizontal: 30,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'outfit',
                    color: 'white',
                }}>
                Start a new order</Text>
            </TouchableOpacity>
      
    </View>
  )
}