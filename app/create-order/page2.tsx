import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Map } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../config/FirebaseConfig';
import { CountryCode } from '../../constants/CountryCodes';
import LocationMap from '../../components/MyOrder/LocationMap';

export default function Page2() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+237');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputHasFocus, setInputHasFocus] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);

  // Get initial location
  useEffect(() => {
    const getInitialLocation = async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });

          const newLocation = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          };
          
          setLocation(newLocation);
          
          // Get address from coordinates
          const addressResponse = await Location.reverseGeocodeAsync(newLocation);
          
          if (addressResponse && addressResponse.length > 0) {
            const addressObj = addressResponse[0];
            const address = [
              addressObj.name,
              addressObj.street,
              addressObj.district,
              addressObj.subregion,
              addressObj.city,
              addressObj.region,
              addressObj.postalCode,
              addressObj.country
            ].filter(Boolean).join(', ');
            
            setSenderAddress(address);
            setFormattedAddress(address);
          }
        }
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialLocation();
  }, []);
  
  // Update form progress when fields change
  useEffect(() => {
    let progress = 0;
    if (senderName) progress += 0.33;
    if (senderAddress) progress += 0.33;
    if (senderPhone) progress += 0.34;
    
    setFormProgress(progress);
  }, [senderName, senderAddress, senderPhone]);

  const handleLocationSelect = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setLocation({ latitude, longitude });
    setSenderAddress(address);
    setFormattedAddress(address);
    setShowMap(false);
  };

  const handleNext = async () => {
    if (!orderId || typeof orderId !== 'string') {
      alert('Invalid order ID. Please try again.');
      return;
    }

    if (!senderName || !senderAddress || !senderPhone) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const fullPhoneNumber = `${countryCode}${senderPhone}`;
      const senderDetails = {
        senderName,
        senderAddress,
        senderPhone: fullPhoneNumber,
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : null,
        formattedAddress,
        userEmail: auth.currentUser?.email,
      };

      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, senderDetails);
      console.log('Sender details updated successfully');
      
     
      router.push(`/create-order/page3?orderId=${orderId}`);
    } catch (error) {
      console.error('Error updating sender details:', error);
      alert('Failed to update sender details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Information sur l'expediteur</Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${formProgress * 100}%` }]} />
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom de l'expediteur</Text>
              <TextInput
                style={[
                  styles.input, 
                  inputHasFocus === 'name' && styles.inputFocused
                ]}
                value={senderName}
                onChangeText={setSenderName}
                placeholder="Nom Complet"
                onFocus={() => setInputHasFocus('name')}
                onBlur={() => setInputHasFocus(null)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Adresse de l'expediteur</Text>
              <View style={styles.addressContainer}>
                <TextInput
                  style={[
                    styles.addressInput,
                    inputHasFocus === 'address' && styles.inputFocused
                  ]}
                  value={senderAddress}
                  onChangeText={setSenderAddress}
                  placeholder="Adresse"
                  multiline
                  onFocus={() => setInputHasFocus('address')}
                  onBlur={() => setInputHasFocus(null)}
                />
                <TouchableOpacity 
                  style={styles.mapButton}
                  onPress={() => setShowMap(true)}
                  activeOpacity={0.7}
                >
                  <Map size={20} color="#000" />
                </TouchableOpacity>
              </View>
              {formattedAddress ? (
                <View style={styles.currentAddressContainer}>
                  <Text style={styles.currentAddressLabel}>Adresse actuelle:</Text>
                  <Text style={styles.currentAddress} numberOfLines={2}>
                    {formattedAddress}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Numéro de l'expediteur</Text>
              <View style={styles.phoneContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={countryCode}
                    onValueChange={(itemValue) => setCountryCode(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#000"
                  >
                    {CountryCode.map((country) => (
                      <Picker.Item 
                        key={country.code}
                        label={`${country.flag} ${country.code} ${country.country}`}
                        value={country.code}
                      />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={[
                    styles.phoneInput,
                    inputHasFocus === 'phone' && styles.inputFocused
                  ]}
                  value={senderPhone}
                  onChangeText={setSenderPhone}
                  placeholder="Numéro de téléphone"
                  keyboardType="phone-pad"
                  onFocus={() => setInputHasFocus('phone')}
                  onBlur={() => setInputHasFocus(null)}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.nextButtonContainer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
            disabled={loading || formProgress < 1}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.nextButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Map Modal */}
        <Modal
          visible={showMap}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowMap(false)}
        >
          <LocationMap
            initialLocation={location}
            onLocationSelect={handleLocationSelect}
            onClose={() => setShowMap(false)}
          />
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#f3f3f3',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputFocused: {
    borderColor: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 80,
  },
  mapButton: {
    backgroundColor: '#f3f3f3',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 55,
  },
  currentAddressContainer: {
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  currentAddressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  currentAddress: {
    fontSize: 12,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    width: 120,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 54,
    width: '100%',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginLeft: 8,
    backgroundColor: '#f9f9f9',
  },
  nextButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});