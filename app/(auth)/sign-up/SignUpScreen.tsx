import { View, Text, ToastAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from './../../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = async () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Envoi de l'email de vérification
      await sendEmailVerification(user);
      ToastAndroid.show('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.', ToastAndroid.LONG);
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;

      console.log(errorMessage, errorCode);

      if (errorCode === 'auth/weak-password') {
        ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.LONG);
      } else if (errorCode === 'auth/email-already-in-use') {
        ToastAndroid.show('Email already in use', ToastAndroid.LONG);
      } else if (errorCode === 'auth/invalid-email') {
        ToastAndroid.show('Invalid Email', ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 80, backgroundColor: '#fff', height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', marginTop: 10 }}>Create New Account</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Full Name'
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Password'
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        onPress={onCreateAccount}
        style={{
          padding: 20,
          marginTop: 60,
          backgroundColor: '#000',
          borderRadius: 15,
          borderWidth: 1,
        }}
      >
        <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default SignUpScreen;