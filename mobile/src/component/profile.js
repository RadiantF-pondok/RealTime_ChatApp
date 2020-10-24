import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import style from "./style"
import LinearGradient from "react-native-linear-gradient"

class Profile extends Component {
    render() {
        return (
            <View>
                <LinearGradient
                    colors={["#037ffc", "#52fade"]}
                    style={style.view15}>
                    <TouchableOpacity
                        style={{ alignSelf: "flex-start" ,marginLeft: 10, marginTop: 7}}
                        onPress={() => this.props.navigation.goBack()}>
                        <Image
                            source={require("../assets/back.png")}
                            style={{ height: 25, width: 25, tintColor: "white" }}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require("../assets/profile.png")}
                        style={style.image6}
                    />
                    <Text style={style.text9}>Jujun Setiawan</Text>
                    <TouchableOpacity>
                        <Text style={style.text10}>@jujunsetiawan</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <TouchableOpacity style={style.view16}>
                            <Text style={{ color: "white", fontSize: 23, fontWeight: "bold" }}>999,9 M</Text>
                            <Text style={{ color: "white" }}>followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.view17}>
                            <Text style={{ color: "white", fontSize: 23, fontWeight: "bold" }}>6</Text>
                            <Text style={{ color: "white" }}>following</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={style.view18}>
                    <Image
                        source={require("../assets/email.png")}
                        style={{ height: 17, width: 25 }}
                    />
                    <Text>jujunsetiawan@gmail.com</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
                <View style={style.view19}>
                    <Image
                        source={require("../assets/phone-call.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text>+62  85695078232</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
                <View style={style.view20}>
                    <Image
                        source={require("../assets/monitor.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 35 }}>Mobile Development</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
                <View style={style.view20}>
                    <Image
                        source={require("../assets/placeholder.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 35 }}>Indonesia</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
                <View style={style.view20}>
                    <Image
                        source={require("../assets/instagram.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 35 }}>@jujunsetiawan9</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
                <View style={style.view20}>
                    <Image
                        source={require("../assets/youtube.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 35 }}>Shorai~ No Yume</Text>
                </View>
                <Text style={{ opacity: 0.3 }}>_______________________________________________________________</Text>
            </View>
        )
    }
}

export default Profile;
