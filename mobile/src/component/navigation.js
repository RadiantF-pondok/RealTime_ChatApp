import React from "react"
import { NavigationContainer, useLinkProps } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {createDrawerNavigator} from "@react-navigation/drawer"
import Login from "./login"
import Home from "./home"
import Register from "./register"
import Forgot from "./forgotpassword"
import DrawerContent from "./drawer"
import Chat from "./chat"
import Profile from "./profile"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootDrawer = () => {
    return (
        <Drawer.Navigator drawerContent = {(props) => <DrawerContent {...props}/>}>
            <Drawer.Screen name = "Home" component = {Home}/>
        </Drawer.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={RootDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation;