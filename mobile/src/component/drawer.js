import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import style from "./style"
import AsyncStorage from '@react-native-community/async-storage';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login")
  };
  render() {
    return (
      <View>
        <View style={style.view7}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image
              source={require("../assets/avatar.png")}
              style={style.image4}
            />
            <TouchableOpacity 
            onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require("../assets/back.png")}
                style={{ height: 25, width: 25, tintColor: "white", margin: 5 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={style.text9}>Jujun Setiawan</Text>
          <TouchableOpacity>
            <Text style={style.text10}>@jujunsetiawan</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", height: 250, width: "100%" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
            style={style.view14}>
            <Image
              source={require("../assets/user.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text style={{ marginTop: 3 }}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.view14}>
            <Image
              source={require("../assets/phone-call.png")}
              style={{ height: 20, width: 20, marginLeft: 15 }}
            />
            <Text style={{ marginTop: 3, marginLeft: 10 }}>Panggilan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.view14}>
            <Image
              source={require("../assets/star.png")}
              style={{ height: 20, width: 20, marginLeft: 10 }}
            />
            <Text style={{ marginTop: 3, marginLeft: 10 }}>Populars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.view14}>
            <Image
              source={require("../assets/navbar.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text style={{ marginTop: 3, marginRight: 15 }}>List</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#f1f1f13a", height: "100%", width: "100%" }}>
          <Text style={style.text13}>Sub Item Navigasi</Text>
          <TouchableOpacity style={style.view14}>
            <Image
              source={require("../assets/settings.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text style={{ marginTop: 3 }}>Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.view14}>
            <Image
              source={require("../assets/about.png")}
              style={{ height: 20, width: 20, borderRadius: 10 }}
            />
            <Text style={{ marginTop: 3, marginRight: 8 }}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={style.view13}>
            <Text style={style.text12}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DrawerContent;
