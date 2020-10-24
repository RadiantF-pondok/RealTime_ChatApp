import React, { Component } from 'react';
import { Text, View, Image, Modal, ImageBackground, TextInput, TouchableOpacity, Animated, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import AsyncStorage from "@react-native-community/async-storage"
import ImagePicker from "react-native-image-picker"
export class Home extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            todo: [],
            loading: true,
            photo: '',
            text: '',
            modal: false,
            modal1: false,
            addLoading: false,
        };
    }

    addtodo() {
        this.setAddLoading(true)
        const { text, todo } = this.state
        if (text == "") {
            alert("Harap Di Isi")
            this.setAddLoading(false)
        } else {
            this.setState({
                todo: [text, ...todo]
            });
            this.setAddLoading(false)
        }
        this.showModal(false)
    }

    removetodo(index) {
        this.setAddLoading(true)
        const { todo } = this.state
        this.setState({
            todo: todo.filter((value, id) => id != index)
        })
        this.setAddLoading(false)
        this.showModal1(false)
    };

    chek() {
        this.setState({
            cheklist: !this.state.cheklist
        })
    };

    componentDidMount() {
        this.getData();
    };

    async getData() {
        const data = await AsyncStorage.getItem("DataTodo");
        if (data != null) {
            const json = JSON.parse(data);
            this.setState({ todo: json })
            console.log(json);
        }
    }

    componentDidUpdate() {
        AsyncStorage.setItem("DataTodo", JSON.stringify(this.state.todo))
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                this.setState({ photo: response });
            }
        });
    };

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    createFormData = (photo, body) => {
        const data = new FormData();

        data.append('image', {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === 'android'
                    ? photo.uri
                    : photo.uri.replace('file://', ''),
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };

    logOut() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    showModal(visible) {
        this.setState({ modal: visible });
    }


    showModal1(visible) {
        this.setState({ modal1: visible });
    }

    setAddLoading(loading) {
        this.setState({ addLoading: loading });
    }

    render() {
        return (
            <View>
                <LinearGradient
                    colors={["#037ffc", "#52fade"]}
                    style={style.container}>
                    <Modal
                        style={{ flex: 1 }}
                        visible={this.state.modal}
                        transparent={true}
                        animationType="slide">
                        <LinearGradient
                            colors={["#037ffc", "#52fade"]}
                            style={style.modal}>
                            <TouchableOpacity style={style.closemodal}>
                                <Text style={{ marginBottom: 10, color: "white", fontSize: 18 }} onPress={() => this.showModal(false)}>x</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                {this.state.photo !== '' ? (
                                    <Image
                                        source={{ uri: this.state.photo.uri }}
                                        style={{ width: 65, height: 65, borderRadius: 32.5 }}
                                    />
                                ) : (
                                        <Image
                                            source={require("../assets/camera.png")}
                                            style={{ height: 65, width: 65 }}
                                        />
                                    )}
                            </TouchableOpacity>
                            <View style={style.view}>
                                <TextInput
                                    onChangeText={(inputan) => this.setState({ text: inputan })}
                                    placeholder="Masukan Nama"
                                    style={style.textinput} />
                            </View>
                            <TouchableOpacity
                                onPress={() => this.addtodo()}
                                style={style.tombol}>
                                {this.state.addLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                        <Text style={{ color: "white" }}>Tambah Kontak</Text>
                                    )}
                            </TouchableOpacity>
                        </LinearGradient>
                    </Modal>
                    <View style={style.header}>
                        <View style={style.containerlogo}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                                style={{ marginRight: 10 }}>
                                <Image
                                    source={require("../assets/menu.png")}
                                    style={style.logo}
                                />
                            </TouchableOpacity>
                            <Image
                                source={require("../assets/chatbubbles.png")}
                                style={style.logo}
                            />
                            <Text style={style.title}>ChatApp</Text>
                        </View>
                        <TouchableOpacity style={style.containerlogo}>
                            <Image
                                source={require("../assets/search.png")}
                                style={style.logo}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {this.state.todo.map((value, index) => (
                            <View key={index}>
                                <Modal
                                    style={{ flex: 1 }}
                                    visible={this.state.modal1}
                                    transparent={true}
                                    animationType="fade">
                                    <LinearGradient
                                        colors={["#037ffc", "#52fade"]}
                                        style={style.modal1}>
                                        <Text style={style.textmodal}>Hapus Chat</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                            <TouchableOpacity
                                                onPress={() => this.showModal1(false)}
                                                style={style.button}>
                                                <Text style={style.textbutton}>Cancle</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => this.removetodo(index)}
                                                style={style.button1}>
                                                <Text style={style.textbutton}>Ok</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </Modal>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("Chat")}
                                    onLongPress={() => this.showModal1()}
                                    style={style.user}>
                                    <Image
                                        source={require("../assets/profile.png")}
                                        style={style.avatar}
                                    />
                                    <View style={style.view1}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={style.nama}>{value}</Text>
                                            <Text style={style.time}>00:00</Text>
                                        </View>
                                        <Text style={style.history}>Pesan Terakhir</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                        }
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => this.showModal()}
                        style={style.add}>
                        <Text style={style.plus}>+</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}

export default Home;

const style = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "space-between"

    },
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
    containerlogo: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginRight: 10
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginLeft: 12,
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff3c",
        height: 80
    },
    nama: {
        marginTop: 20,
        fontSize: 19,
        marginLeft: 15,
        opacity: 0.7,
    },
    history: {
        marginLeft: 15,
        opacity: 0.7,
        marginTop: 5
    },
    time: {
        opacity: 0.5,
        marginTop: 22,
        marginLeft: 240,
        position: "absolute"
    },
    view1: {
        borderBottomColor: "#ffffff3f",
        borderBottomWidth: 1.5,
        height: 80,
        width: "100%"
    },
    add: {
        position: "absolute",
        bottom: 15,
        right: 15,
        height: 60,
        width: 60,
        backgroundColor: "dodgerblue",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5
    },
    plus: {
        fontSize: 70,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5
    },
    modal: {
        height: 200,
        width: 315,
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 25,
        borderRadius: 15,
        justifyContent: "center"
    },
    modal1: {
        height: 150,
        width: 250,
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 25,
        borderRadius: 15,
        justifyContent: "center"
    },
    view: {
        width: 200,
        height: 35,
        marginTop: 15
    },
    textinput: {
        borderColor: "#ffffff3f",
        borderWidth: 1,
        marginTop: 2,
        fontSize: 15,
        backgroundColor: "#ffffff3f",
        borderRadius: 10,
        padding: 5,
    },
    tombol: {
        height: 30,
        width: 200,
        marginTop: 5,
        backgroundColor: "dodgerblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 30
    },
    closemodal: {
        backgroundColor: '#ffffff3f',
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 10,
        marginTop: 10
    },
    textmodal: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        marginBottom: 25
    },
    textbutton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 80,
        backgroundColor: "red",
        borderRadius: 10,
        marginLeft: 10
    },
    button1: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 80,
        backgroundColor: "dodgerblue",
        borderRadius: 10,
        marginRight: 20
    }
})