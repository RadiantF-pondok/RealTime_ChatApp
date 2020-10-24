import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import style from "./style";
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from "react-native-linear-gradient"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            mata: true,
            loading: false,
        };
    }

    gotoRegister() {
        this.props.navigation.navigate('Register');
    }

    gotoReset() {
        this.props.navigation.navigate('Forgot');
    }

    gotoHome() {
        this.props.navigation.navigate('Home');
    }

    login() {
        const { email, password } = this.state;

        this.setState({ loading: true });
        //POST json
        var dataToSend = {
            email: email,
            password: password,
        };

        //making data to send on server
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        //POST request
        fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
            method: 'POST', //Request Type
            body: formBody, //post body
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson));
                const { token } = responseJson;
                if (token) {
                    AsyncStorage.setItem('token', token).then((value) => {
                        this.gotoHome();
                    });
                    this.setState({ loading: false });
                } else {
                    alert('Email atau kata sandi salah');
                    this.setState({ loading: false });
                }
            })
            //If response is not in json then in error
            .catch((error) => {
                alert(JSON.stringify(error));
                console.error(error);
            });
    }
    ubaheye = () => {
        const eyey = !this.state.mata
        this.setState({ mata: eyey })
    }
    render() {
        return (
            <View>
                <LinearGradient
                    colors={["#037ffc", "#52fade"]}
                    style={style.imagebackground}>
                    <View>
                        <View style={style.view1}>
                            <Text style={style.text1}>Sign In</Text>
                            <View style={style.view2}>
                                <Image
                                    source={require("../assets/orang.png")}
                                    style={style.image2}
                                />
                                <TextInput
                                    keyboardType = "email-address"
                                    placeholder="Username Atau Email"
                                    style={style.text2}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                            <View style={style.view2}>
                                <Image
                                    source={require("../assets/gembok.png")}
                                    style={style.image2}
                                />
                                <TextInput
                                    secureTextEntry={this.state.mata}
                                    placeholder="Password"
                                    style={style.text2}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                <TouchableOpacity onPress={() => this.ubaheye()}>
                                    <Image
                                        source={this.state.mata ? require("../assets/eyeClosed.png") : require("../assets/eyeOpened.png")}
                                        style={style.image5}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.login()} style={style.view3}>
                                {this.state.loading ? (
                                    <ActivityIndicator color="white" />
                                ) : <Text style={{ opacity: 0.7 }}>Login</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgot")}>
                                <Text style={style.text3}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={style.text4}>__________________________</Text>
                        <View style={style.view4}>
                            <Text style={style.text5}>Don't a have account ?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                <Text style={style.text6}>REGISTER NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default Login;