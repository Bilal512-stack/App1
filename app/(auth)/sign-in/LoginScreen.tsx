import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect} from 'react' 
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const LoginScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    headerShown: false;
  },[])
       return (
    <View
      style={{
        padding:25,
        paddingTop: 80,
        backgroundColor: '#fff',
        height: '100%',
              }}>
                <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text 
      style={{
        fontSize: 30, fontFamily: 'outfit-bold',color: '#86808056'}}>
        Let's Sign You In !</Text>
      <Text 
      style={{
        fontSize: 30, fontFamily: 'outfit-bold',color: '#86808056'}}>
      Welcome Back</Text>
      <Text 
      style={{
        fontSize: 30, fontFamily: 'outfit',color: '#86808056',}}>
      You've been missed</Text>

      <View style={{
        marginTop: 50,
        }}>
        <Text style={{
          fontFamily: 'outfit',  
        }}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter Email'/>
      </View>

      <View style={{
        marginTop: 50,
        }}>
        <Text style={{
          fontFamily: 'outfit',  
        }}>PassWord</Text>
        <TextInput 
        secureTextEntry={true}
        style={styles.input} placeholder='Enter Password'/>
      </View>


     <TouchableOpacity
     onPress ={()=>router.replace('../sign-up')}
     style={{
      padding:20,
      marginTop: 20,
      backgroundColor:'#fff',
      borderRadius: 15,
      borderWidth: 1, 
     }}>
       <Text style={{
        color: '#86808056',
        textAlign: 'center',
       }}> Create Account</Text>
     </TouchableOpacity>

      </View>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default LoginScreen;
