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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleForgotPassword = () => {
    // Rediriger l'utilisateur vers la page de réinitialisation du mot de passe
    router.push('/(auth)/ForgotPasswordScreen'); // Ajustez le chemin selon votre configuration
  };

  return (
    <View style={{ padding: 25, paddingTop: 80, backgroundColor: '#fff', height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontFamily: 'outfit-Bold', color: '#000000F3' }}>
        Let's Sign You In!
      </Text>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: '#232121B5' }}>
        Welcome Back
      </Text>
      <Text style={{ fontSize: 30, fontFamily: 'outfit', color: '#232121B5' }}>
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
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showPassword} // Utilise l'état pour contrôler l'affichage
            style={styles.passwordInput}
            onChangeText={(value) => setPassword(value)}
            placeholder='Enter Password'
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          marginTop: 50,
          backgroundColor: '#000',
          borderRadius: 15,
          borderWidth: 1,
        }}>
        <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleForgotPassword}
        style={{
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Text style={{ color: '#000', fontFamily: 'outfit' }}>Mot de passe oublié ?</Text>
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
        <Text style={{ color: '#000', fontFamily: 'outfit', textAlign: 'center' }}>Créer un compte</Text>
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

export default LoginScreen;