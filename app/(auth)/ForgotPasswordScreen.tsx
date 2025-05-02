import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../config/FirebaseConfig'; // Adjusted the path to match the likely correct location
import { sendPasswordResetEmail } from 'firebase/auth';


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      ToastAndroid.show('Veuillez entrer votre email', ToastAndroid.LONG);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      ToastAndroid.show('Email de réinitialisation envoyé', ToastAndroid.LONG);
      router.push('/(auth)/sign-in/LoginScreen'); // Redirige vers la page de connexion
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Erreur lors de l\'envoi de l\'email', ToastAndroid.LONG);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Réinitialiser le Mot de Passe</Text>
      <Text style={styles.subtitle}>Entrez votre adresse email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setEmail(value)}
        placeholder='votre Email'
      />
      <TouchableOpacity
        onPress={handleResetPassword}
        style={styles.button}>
        <Text style={styles.buttonText}>Envoyer le lien de réinitialisation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    paddingBottom: 10,
    fontSize: 24,
    fontFamily: 'outfit',
    marginBottom: 20,
  },
  subtitle: {
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'outfit-Bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
  },
});

export default ForgotPasswordScreen;