import AsyncStorage from '@react-native-community/async-storage';
import { flatMap } from 'lodash';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet, TouchableHighlightBase
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import io from "socket.io-client"

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.42.184:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage)
    this.setState({ chatMessage: "" });
  }

  showModal = (visible) => {
    this.setState({ modal: visible });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          style={{ flex: 1 }}
          visible={this.state.modal}
          transparent={true}
          animationType="fade">
          <View style={style.modal}>
            <TouchableOpacity style={style.valuemodal}>
              <Image
                source={require("../assets/phone-call.png")}
                style={style.logo3}
              />
              <Text style={style.item}>Telepon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.valuemodal}>
              <Image
                source={require("../assets/videocam.png")}
                style={style.logo3}
              />
              <Text style={style.item}>Panggilan Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.valuemodal}>
              <Image
                source={require("../assets/mute.png")}
                style={style.logo3}
              />
              <Text style={style.item}>Senyapkan Notifikasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.valuemodal}>
              <Image
                source={require("../assets/garbage.png")}
                style={style.logo3}
              />
              <Text style={style.item}>Hapus Obrolan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.showModal(false)}
              style={style.valuemodal}>
              <Image
                source={require("../assets/back.png")}
                style={style.logo3}
              />
              <Text style={style.item}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={style.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require("../assets/back.png")}
                style={style.logo} />
            </TouchableOpacity>
            <Image
              source={require("../assets/profile.png")}
              style={style.avatar}
            />
            <View style={{ marginLeft: 7 }}>
              <Text style={style.nama}>Username</Text>
              <Text style={style.status}>Online</Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => this.showModal()}>
            <Image
              source={require("../assets/titik3.png")}
              style={style.logo}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1 }}>
          {this.state.chatMessages.map((chatMessage, index) => (
            <View key={index} style={style.containermessage}>
                <Text style={{ color: "white", marginRight: 25 }}>{chatMessage}</Text>
                <Image
                  source={require("../assets/doublecheklist.png")}
                  style={{ height: 15, width: 15, tintColor: "white", alignSelf: "flex-end" }}
                />
            </View>
          ))}
        </ScrollView>
        <View style={style.massage}>
          <TouchableOpacity>
            <Image
              source={require("../assets/emoticon.png")}
              style={style.logo1}
            />
          </TouchableOpacity>
          <TextInput
            autoCorrect={false}
            onSubmitEditing={() => this.submitChatMessage()}
            value={this.state.chatMessage}
            onChangeText={chatMessage => { this.setState({ chatMessage }) }}
            placeholder="Ketikan Pesan"
            style={style.textinput} />
          <TouchableOpacity>
            <Image
              source={require("../assets/attachmen.png")}
              style={style.logo1} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/voice.png")}
              style={style.logo1}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.submitChatMessage()}
          style={style.send}>
          <Image
            source={require("../assets/sendbutton.png")}
            style={style.logo2}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Chat;

const style = StyleSheet.create({
  header: {
    height: 55,
    width: "100%",
    backgroundColor: "dodgerblue",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logo: {
    height: 25,
    width: 25,
    tintColor: "white",
    marginLeft: 10
  },
  logo1: {
    height: 20,
    width: 20,
    tintColor: "grey",
    marginLeft: 10
  },
  logo2: {
    height: 20,
    width: 20,
    tintColor: "dodgerblue",
    marginLeft: 5
  },
  logo3: {
    height: 20,
    width: 20,
    tintColor: "grey",
    marginLeft: 20
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15
  },
  nama: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },
  status: {
    color: "#25f53a"
  },
  massage: {
    height: 40,
    width: "83.5%",
    backgroundColor: "white",
    bottom: 10,
    left: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  textinput: {
    marginTop: 10,
    marginLeft: 5,
    borderBottomColor: "white",
    fontSize: 15,
    height: 50,
    width: "65%"
  },
  send: {
    position: "absolute",
    bottom: 10,
    right: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    height: 250,
    width: 225,
    backgroundColor: "white",
    alignSelf: "flex-end"
  },
  valuemodal: {
    flexDirection: "row",
    marginTop: 25
  },
  item: {
    fontSize: 18,
    marginLeft: 20
  },
  containermessage: {
    padding: 5,
    maxWidth: "70%",
    alignSelf: "flex-end",
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    marginTop: 5,
    marginRight: 10,
  }
})