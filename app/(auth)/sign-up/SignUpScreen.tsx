import { View, Text, ToastAndroid } from 'react-native'
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

    if(!email || !password || !fullName) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
      return;
    }

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
                marginTop: 10,
                 }}>Create New Account</Text>

    <View style={{
            marginTop: 30,
            }}>
            <Text style={{
              fontFamily: 'outfit',  
            }}>Full Name</Text>
            <TextInput style={styles.input} 
            placeholder='Enter Full Name'
            onChangeText={(value)=>setFullName(value)}/>
          </View>
    
    <View style={{
            marginTop: 30,
            }}>
            <Text style={{
              fontFamily: 'outfit',  
            }}>Email</Text>
            <TextInput style={styles.input} 
            placeholder='Enter Email'
            onChangeText={(value)=>setEmail(value)}/>
          </View>
    
    <View style={{
            marginTop: 30,
            }}>
            <Text style={{
              fontFamily: 'outfit',  
            }}>Password</Text>
            <TextInput style={styles.input}
             placeholder='Enter Password'
             onChangeText={(value)=>setPassword(value)}/>
          </View>

          
               <TouchableOpacity onPress={onCreateAccount}
                style={{
                padding:20,
                marginTop: 60,
                backgroundColor:'#000',
                borderRadius: 15,
                borderWidth: 1, 
               }}>
                 <Text style={{
                  fontFamily: 'outfit',
                  color: '#fff',
                  textAlign: 'center',
                 }}> Create Account</Text>
               </TouchableOpacity>
    
         
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