import StartNewOrder from '@/components/MyOrder/StartNewOrder';
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import  {View, Text, Image, StyleSheet} from 'react-native'


const Home = () => {

    const [userTrips,setUserTrips]=useState([]);

    return (
        <View style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: 'white',
            height: '100%',
        }}>
           <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-Bold',
                }}>My Order</Text>
                <Ionicons  name="add-circle" size={50} color="black"/>
           </View>
          {userTrips?.length === 0 ?  
          <StartNewOrder/>
          :null
          }

        </View>
    )
}



export default Home
