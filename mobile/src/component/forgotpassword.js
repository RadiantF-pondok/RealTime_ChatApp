import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, TextInput, Image } from 'react-native'
import style from "./style"
import LinearGradient from "react-native-linear-gradient"

class Forgotpassword extends Component {
    render() {
        return (
            <View>
                <LinearGradient
                    colors = {["#037ffc", "#52fade"]}
                    style={style.imagebackground}>
                    <View style={style.view6}>
                        <Text style={style.text1}>Forgot Password ?</Text>
                        <Text style={style.text11}>Confirm your email and we'll send the intruction</Text>
                        <View style={style.view2}>
                            <Image
                                source={require("../assets/email.png")}
                                style={style.image3}
                            />
                            <TextInput
                                keyboardType = "email-address"
                                placeholder="Email"
                                style={style.text2}
                                onChangeText={(text) => this.setState({ username: text })}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Login")}
                            style={style.view3}>
                            <Text style={{opacity:0.7}}>Kirim</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default Forgotpassword;
