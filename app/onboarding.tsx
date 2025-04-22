import React from "react";
import Onboarding from 'react-native-onboarding-swiper';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import { useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';


const {width} = Dimensions.get('window');

export default function OnboardingSwiper() {

    const navigation = useNavigation();

    const handleDone = ()=> {
        // @ts-ignore
         navigation.navigate(`Login`);

    }

    const doneButton =  ({...props}) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
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
                        backgroundColor: '#eae4e2',
                        image: (
                            <View style={styles.lottie}>
                                <Image source={require('../assets/images/camion.mp4')}/>
                            </View>
                        ),
                        title: 'Votre Partenaire dans la recherche de vos transporteurs',
                        subtitle: 'Découvrez la simplicité de trouver le bon camion.',
                    },
                    {
                        backgroundColor: '#e6e8ec',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie source={require('../assets/animations/track.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Rapidité et Fiabilité',
                        subtitle: 'Accédez à des transporteurs de confiance.',
                    },
                    {
                        backgroundColor: '#eae4e4',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie source={require('../assets/animations/World.json')} autoPlay loop />
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
    lottie: {
        width:width * 0.9,
        height:350,

    },
    doneButton: {
        padding: 20,
     //   backgroundColor: '#fff',
      //  borderTopLeftRadius: '100%',
       // borderBottomLeftRadius: '100%',
    }
});