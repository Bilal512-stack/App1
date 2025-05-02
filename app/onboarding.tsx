import React from "react";
import Onboarding from 'react-native-onboarding-swiper';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {useRouter} from "expo-router";
import LottieView from 'lottie-react-native';


const {width} = Dimensions.get('window');

export default function OnboardingSwiper() {
    const router = useRouter();

    const navigation = useNavigation();

    const handleDone = ()=> {
        // @ts-ignore
         router.push('/(auth)/sign-in/LoginScreen');

    }

    const doneButton =  ({...props}) => {
        // @ts-ignore
        return (
            <TouchableOpacity style={styles.doneButton} onPress={ () => {
                // @ts-ignore
                router.push('/(auth)/sign-in/LoginScreen');
            }} >
            <Text style={{ fontFamily:'outfit-Bold',color: 'white' }}>Get Started</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
              //  bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{paddingHorizontal: 15}}
                pages={[
                    {
                        backgroundColor: '#FFFFFFFF',
                        image: (
                            <View>
                                <LottieView
                               source={require('../assets/animations/colis.json')}
                              autoPlay
                             loop
                             style={styles.animation1}
                             />
                            </View>
                        ),
                        title : 'Optimisez Votre Transport en Toute Simplicité !',
                        subtitle: 'Découvrez la simplicité de trouver le bon camion.',
                    },
                    {
                        backgroundColor: '#29342C82',
                        image: (
                            <View>
                                <LottieView
                               source={require('../assets/animations/livraison.json')}
                              autoPlay
                             loop
                             style={styles.animation}
                             />
                            </View>
                        ),
                        title: 'Vitesse et Confiance pour Vos Livraisons',
                        subtitle: 'Livrez vos marchandises en toute confiance.',
                    },
                    {
                        backgroundColor: '#252323FF',
                        image: (
                            <View>
                                 <LottieView
                               source={require('../assets/animations/interface.json')}
                              autoPlay
                             loop
                             style={styles.animation2}
                             />
                            </View>
                        ),
                        title: 'Simplifiez Votre Logistique avec Notre Plateforme',
                        subtitle: 'Une interface intuitive pour tous.',
                    }
                ]}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFFFF' ,
        fontFamily: 'outfit-Bold',
    },
          doneButton: {
          padding: 20,
          backgroundColor: '#000',
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 100,
          position:'fixed' ,
          borderBottomLeftRadius: 100,
        },
        animation: {
            width: 300,
            height: 300,
        },
        animation1: {
            width: 350,
            height: 300,
        
        },
        animation2: {         
            marginTop: 50,
            width: 400,
            height: 300,
        },

});






