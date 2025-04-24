import React from 'react'
import {Tabs} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
const _Layout = () => {
    return (
        
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'black',
            }}>
            <Tabs.Screen
            name="home"
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={"black"} />,
                title: 'Home',
                headerShown: false,
            }}/>
            <Tabs.Screen
                name="order"
                options={{
                    tabBarLabel: 'Order',
                    tabBarIcon: ({color}) =><FontAwesome name="folder-open" size={24} color="black" />,
                    title: 'Order',
                    headerShown: false,
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={"black"} />,
                    title: 'Profile',
                    headerShown: false,
                }}/>
        </Tabs>
    )
}
export default _Layout