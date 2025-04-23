import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../config/FirebaseConfig';

const LoginScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Fix header not hiding
  }, [navigation]);

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show('Veuillez entrer l\'email et le mot de passe', ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      
      // Rediriger vers la page d'accueil après une connexion réussie
      router.push('/home'); // Ajustez le chemin selon votre configuration
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;
      console.log(errorMessage, errorCode);

      if (errorCode === 'auth/invalid-credential') {
        ToastAndroid.show('Identifiants invalides', ToastAndroid.LONG);
      } else if (errorCode === 'auth/user-not-found') {
        ToastAndroid.show('Aucun utilisateur trouvé avec cet email', ToastAndroid.LONG);
      } else if (errorCode === 'auth/wrong-password') {
        ToastAndroid.show('Mot de passe incorrect', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('Erreur lors de la connexion', ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 80, backgroundColor: '#fff', height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: '#86808056' }}>
        Let's Sign You In!
      </Text>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: '#86808056' }}>
        Welcome Back
      </Text>
      <Text style={{ fontSize: 30, fontFamily: 'outfit', color: '#86808056' }}>
        You've been missed
      </Text>

      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          placeholder='Enter Email'
        />
      </View>

      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder='Enter Password'
        />
      </View>

      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: '#000',
          borderRadius: 15,
          borderWidth: 1,
        }}>
        <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up/SignUpScreen')}
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: '#fff',
          borderRadius: 15,
          borderWidth: 1,
        }}>
        <Text style={{ color: '#000', fontFamily: 'outfit', textAlign: 'center' }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

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