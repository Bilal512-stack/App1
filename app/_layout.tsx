import {SplashScreen, Stack} from "expo-router";
import './global.css';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import "./global.css";


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
    })

       useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    },  [fontsLoaded]);

  if (!fontsLoaded) return null;

  return  (
     <Stack screenOptions={{
       headerShown: false,
     }}>
         <Stack.Screen
             name="(tabs)"
             options={{headerShown: false}}
         />
         </Stack>
  );
}
