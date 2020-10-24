import React from "react";
import { View, Text, Image, ImageBackground, ActivityIndicator, } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import style from "./style"
import Navigation from "./navigation"

class Splash extends React.Component {
    constructor() {
        super()
        this.state = {role: true}
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({role: false})
        }, 2000);
    }

    render() {
        if (this.state.role) {
            return (
                <View>
                    <LinearGradient
                        colors = {["#037ffc", "#52fade"]}
                        style={style.imagebackground}>
                        <Image
                            source={require("../assets/chatbubbles.png")}
                            style={{height: 100, width: 100, tintColor: "white", marginBottom: 10}}
                        />
                        <Text style={style.text7}>ChatApp</Text>
                        <ActivityIndicator style={{marginTop: 35}} size="large" color="dodgerblue" />
                    </LinearGradient>
                </View>
            )
        } else {
            return <Navigation/>
        }
    }
}

export default Splash;