import React from "react";
import Onboarding from 'react-native-onboarding-swiper';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {router, useRouter} from "expo-router";


const Router = useRouter();

const {width} = Dimensions.get('window');

export default function OnboardingSwiper() {

    const navigation = useNavigation();

    const handleDone = ()=> {
        // @ts-ignore
         router.push('/(auth)/sign-up/SignUpScreen');

    }

    const doneButton =  ({...props}) => {
        // @ts-ignore
        return (
            <TouchableOpacity style={styles.doneButton} onPress={ () => {
                // @ts-ignore
                router.push('/(auth)/sign-in/LoginScreen');
            }} >
            <Text>Done</Text>
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
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.image}>
                                <Image source={require('../assets/images/1.png')}                        
                               />
                            </View>
                        ),
                        title: 'Votre Partenaire dans la recherche de vos transporteurs',
                        subtitle: 'Découvrez la simplicité de trouver le bon camion.',
                    },
                    {
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.image}>
                                <Image source={require('../assets/images/2.png')} />
                            </View>
                        ),
                        title: 'Rapidité et Fiabilité',
                        subtitle: 'Accédez à des transporteurs de confiance.',
                    },
                    {
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.image}>
                                <Image source={require('../assets/images/3.png')}/>
                            </View>
                        ),
                        title: 'Facilité d’Utilisation',
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
        backgroundColor: '#fff',
    },
    doneButton: {
        padding: 20,
         backgroundColor: '#fff',
        borderWidth: 1, 
        borderColor: '#000',
        borderRadius: 100,
        position: 'absolute',
        borderBottomLeftRadius: 100, 
    },
    image: {
        width: 100,
        height:100,
        resizeMode: 'cover',
        marginTop: 50,
    }
});
