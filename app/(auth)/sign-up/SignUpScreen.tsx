import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation }  from 'expo-router'

const SignUpScreen = () => {
  const navigation=useNavigation();
  

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  })

  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  )
}

export default SignUpScreen