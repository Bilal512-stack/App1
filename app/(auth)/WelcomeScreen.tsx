import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const Router = useRouter();
    
        return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#fff' }}>
            <View className="flex-1 flex justify-around my-4">

               <Text 
               className="text-white font-bold text-4xl text-center">
                  Let,s Get Started
                </Text>
                <View className="flex-row justify-center">
                     <Image source={require('@/assets/images/splash-icon.png')} style={{ width: 400, height: 600 }} />
                </View >
                <View className="flex-row justify-center">
                  <TouchableOpacity onPress={()=> Router.push('/(auth)/sign-up/SignUpScreen')} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text className="text-center text-black font-bold text-xl">Sign Up</Text>                             
                  </TouchableOpacity> 
                  <View className="flex-row justify-center">
                    <Text className='text-white font-bold text-xl'>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => Router.push('/(auth)/sign-in/LoginScreen')} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text className='text-yellow-400 font-bold text-xl'>
                                Log In
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default WelcomeScreen; 