import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator } from "react-native";
import style from "./style";
import LinearGradient from "react-native-linear-gradient"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            ulangiPassword: '',
            cekPassword: true,
            ulangiCekPassword: true,
            mata: true,
            loading: false
        };
    }

    register = () => {
        const { name, email, password, ulangiPassword } = this.state;
        this.setState({ loading: true })

        var dataToSend = {
            name: name,
            email: email,
            password: password,
            password_confirmation: ulangiPassword,
        };

        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://restful-api-laravel-7.herokuapp.com/api/register', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const { token } = responseJson;
                if (token) {
                    alert('register sukses');
                    this.props.navigation.goBack();
                    this.setState({ loading: false })
                } else {
                    alert('Pastikan Form Sudah Terisi dengan benar');
                    this.setState({ loading: false })
                }
            })

            .catch((error) => {
                alert('Pastikan Form Sudah Terisi dengan benar');
            });
    };
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
                        <View style={style.view5}>
                            <Text style={style.text1}>Sign Up</Text>
                            <View style={style.view2}>
                                <Image
                                    source={require("../assets/orang.png")}
                                    style={style.image2}
                                />
                                <TextInput
                                    placeholder="Username"
                                    style={style.text2}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                            </View>
                            <View style={style.view2}>
                                <Image
                                    source={require("../assets/email.png")}
                                    style={style.image3}
                                />
                                <TextInput
                                    keyboardType = "email-address"
                                    placeholder="Email"
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
                            <View style={style.view2}>
                                <Image
                                    source={require("../assets/gembok.png")}
                                    style={style.image2}
                                />
                                <TextInput
                                    secureTextEntry={this.state.mata}
                                    placeholder="Confirm Password"
                                    style={style.text2}
                                    onChangeText={(ulangiPassword) => this.setState({ ulangiPassword })}
                                />
                                <TouchableOpacity onPress={() => this.ubaheye()}>
                                    <Image
                                        source={this.state.mata ? require("../assets/eyeClosed.png") : require("../assets/eyeOpened.png")}
                                        style={style.image5}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.register()}
                                style={style.view3}>
                                    {this.state.loading ?
                                    (<ActivityIndicator color="white" />)
                                    : (<Text style={{ opacity: 0.8 }}>Register</Text>)}
                            </TouchableOpacity>
                            <View style={style.view4}>
                                <Text style={style.text5}>You have account ?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                    <Text style={style.text6}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default Register;