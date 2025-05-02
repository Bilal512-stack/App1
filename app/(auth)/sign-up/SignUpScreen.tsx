import { View, Text, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from './../../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = async () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Veuillez remplir tous les champs', ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      router.replace('/(tabs)/home')

      // Envoi de l'email de vérification
      await sendEmailVerification(user);
      ToastAndroid.show('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.', ToastAndroid.LONG);

      // Rediriger vers la page de connexion
      router.push('/(auth)/sign-in/LoginScreen'); // Ajustez le chemin selon votre configuration de routage
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;

      console.log(errorMessage, errorCode);

      if (errorCode === 'auth/weak-password') {
        ToastAndroid.show('Le mot de passe doit comporter au moins 6 caractères', ToastAndroid.LONG);
      } else if (errorCode === 'auth/email-already-in-use') {
        ToastAndroid.show('L\'email est déjà utilisé', ToastAndroid.LONG);
      } else if (errorCode === 'auth/invalid-email') {
        ToastAndroid.show('Email invalide', ToastAndroid.LONG);
      }
    }
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        ToastAndroid.show('Email de vérification renvoyé.', ToastAndroid.LONG);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('An unknown error occurred');
        }
        ToastAndroid.show('Erreur lors de l\'envoi de l\'email de vérification.', ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 40, backgroundColor: '#fff', height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-Bold', marginTop: 10 }}>Créer un Compte</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit-Bold' }}>Nom Complet</Text>
        <TextInput
          style={styles.input}
          placeholder='Nom Complet'
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit-Bold' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='entrer une adresse email valide'
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontFamily: 'outfit-Bold' }}>Mot de Passe</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showPassword} // Utilise l'état pour contrôler l'affichage
            style={styles.passwordInput}
            onChangeText={(value) => setPassword(value)}
            placeholder='entrer un mot de passe '
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
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
        <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendVerificationEmail} style={{marginTop: 40 }}>
        <Text style={{ color: 'black', textAlign: 'center' }}>Renvoyer l'email de vérification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor:'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    paddingHorizontal: 10,
     
  },
  eyeIcon: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: 'gray',
  },
});

export default SignUpScreen;