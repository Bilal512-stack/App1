import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Crosshair, Navigation } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005; // Smaller value = more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface LocationMapProps {
  initialLocation?: { latitude: number; longitude: number } | null;
  onLocationSelect: (location: { 
    latitude: number; 
    longitude: number;
    address: string;
  }) => void;
  onClose: () => void;
}

export default function LocationMap({
  initialLocation,
  onLocationSelect,
  onClose
}: LocationMapProps) {
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [gettingUserLocation, setGettingUserLocation] = useState<boolean>(false);
  
  // Animation values
  const pinScale = useSharedValue(1);
  const addressOpacity = useSharedValue(0);
  
  useEffect(() => {
    initializeMap();
  }, []);
  
  const initializeMap = async () => {
    setLoading(true);
    try {
      let region;
      
      if (initialLocation) {
        region = {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        await getAddressFromCoordinates(initialLocation.latitude, initialLocation.longitude);
      } else {
        // Get current user location
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
          setGettingUserLocation(true);
          const position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest
          });
          
          region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          
          await getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
        } else {
          // Default region if permission not granted
          region = {
            latitude: 4.0511,  // Cameroon default (Yaoundé)
            longitude: 9.7679,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          };
          setAddress('Location permission not granted');
        }
        setGettingUserLocation(false);
      }
      
      setMapRegion(region);
      // Show address with animation
      addressOpacity.value = withTiming(1, { duration: 500 });
    } catch (error) {
      console.error('Error initializing map:', error);
      setAddress('Failed to get location');
    } finally {
      setLoading(false);
    }
  };
  
  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      
      // Animate pin when getting address
      pinScale.value = withSequence(
        withTiming(1.2, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      
      // Get detailed address information
      const addressResult = await Location.reverseGeocodeAsync(
        { latitude, longitude }
      );
      
      if (addressResult && addressResult.length > 0) {
        const addressObj = addressResult[0];
        
        // Format address with more detail
        const addressComponents = [
          addressObj.name,
          addressObj.street,
          addressObj.district,
          addressObj.subregion,
          addressObj.city,
          addressObj.region,
          addressObj.postalCode,
          addressObj.country
        ].filter(Boolean);
        
        // Create a more detailed address string
        const formattedAddress = addressComponents.join(', ');
        setAddress(formattedAddress);
        return formattedAddress;
      } else {
        setAddress('Address not found');
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setAddress('Failed to get address');
      return 'Failed to get address';
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegionChangeComplete = async (region: Region) => {
    const newAddress = await getAddressFromCoordinates(region.latitude, region.longitude);
    setMapRegion(region);
  };
  
  const handleConfirmLocation = () => {
    if (mapRegion) {
      onLocationSelect({
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        address: address
      });
    }
  };
  
  const moveToUserLocation = async () => {
    try {
      setGettingUserLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest
        });
        
        if (mapRegion) {
          const newRegion = {
            ...mapRegion,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          
          setMapRegion(newRegion);
          await getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
        }
      } else {
        setAddress('Location permission not granted');
      }
    } catch (error) {
      console.error('Error getting user location:', error);
    } finally {
      setGettingUserLocation(false);
    }
  };
  
  // Animated styles
  const animatedPinStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pinScale.value }],
    };
  });
  
  const animatedAddressStyle = useAnimatedStyle(() => {
    return {
      opacity: addressOpacity.value,
    };
  });
  
  if (!mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        showsScale
        showsBuildings
        showsTraffic
        showsIndoors
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
      />
      
      {/* Center Pin */}
      <View style={styles.pinContainer}>
        <Animated.View style={[styles.pinInner, animatedPinStyle]}>
          <Crosshair size={30} color="#000" strokeWidth={2.5} />
        </Animated.View>
      </View>
      
      {/* Address Box */}
      <Animated.View style={[styles.addressContainer, animatedAddressStyle]}>
        <Text style={styles.addressLabel}>Address</Text>
        <Text style={styles.addressText} numberOfLines={3}>
          {loading ? 'Getting address...' : address}
        </Text>
      </Animated.View>
      
      {/* My Location Button */}
      <TouchableOpacity 
        style={styles.myLocationButton} 
        onPress={moveToUserLocation}
        disabled={gettingUserLocation}
      >
        {gettingUserLocation ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Navigation size={24} color="#000" />
        )}
      </TouchableOpacity>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? 'Getting Address...' : 'Confirm Location'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15,
    zIndex: 2,
  },
  pinInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 16,
    color: '#000',
  },
  myLocationButton: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});