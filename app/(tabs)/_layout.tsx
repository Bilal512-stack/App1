import React from 'react'
import {Tabs} from 'expo-router'

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
            }}/>
            <Tabs.Screen
                name="commande"
                options={{
                    title: 'Order',
                    headerShown: false,
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                }}/>
        </Tabs>
    )
}
export default _Layout