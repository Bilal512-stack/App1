import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation }  from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { auth } from './../../../config/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUpScreen = () => {
  const navigation=useNavigation();
  const router=useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[]);


  const onCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  return (
    <View style={{
      padding:25,
      paddingTop: 80,
      backgroundColor: '#fff',
      height: '100%',
    }}>
      <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
            <Text style={{
        fontSize: 30,
         fontFamily: 'outfit-bold',
         marginTop: 20,}}>Create New Account</Text>

    <View style={{
            marginTop: 50,
            }}>
            <Text style={{
              fontFamily: 'outfit',  
            }}>Full Name</Text>
            <TextInput style={styles.input} placeholder='Enter Full Name'/>
          </View>
    
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
            }}>Password</Text>
            <TextInput style={styles.input} placeholder='Enter Password'/>
          </View>
    
         
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default SignUpScreen