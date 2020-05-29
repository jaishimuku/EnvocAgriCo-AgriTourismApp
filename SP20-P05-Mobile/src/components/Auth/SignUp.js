import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Alert, View, FlatList, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Logo from "../Auth/logo.png";
import SERVER_ROOT from '../../baseUrl';

const SignUp = props => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");

  const handleSignUp = async () => {
    fetch(`${SERVER_ROOT}/api/customers`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username: Username,
        Password: Password,
        PhoneNumber: PhoneNumber,
        Email: Email
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Alert.alert("Invalid User or User Already Exists");
          window.stop();
        }
      })
      .then(data => {
        Alert.alert("Sucessful SignUp", data);
        props.props.navigation.push("LogIn");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View styles={styles.logoPosition}>
        <Image source={Logo} style={styles.logo}></Image>
      </View>
      
      <TextInput
        label="UserName"
        style={styles.inputStyle}
        mode="outlined"
        theme={theme}
        onChangeText={text => setUsername(text)}
      />
      
      <TextInput
        label="Email"
        style={styles.inputStyle}
        mode="outlined"
        autoCapitalize="none"
        theme={theme}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        label="PhoneNumber"
        style={styles.inputStyle}
        mode="outlined"
        autoCapitalize="none"
        theme={theme}
        onChangeText={text => setPhoneNumber(text)}
      />

      <TextInput
        label="Password"
        style={styles.inputStyle}
        mode="outlined"
        secureTextEntry={true}
        autoCapitalize="none"
        theme={theme}
        onChangeText={text => setPassword(text)}
      />        
      <Button
        mode="contained"
        style={styles.signUpButton}
        onPress={() => handleSignUp()}
      >
        Sign-Up
      </Button>
    </View>
  );
};

const theme = {
  colors: {
    primary: "green"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    marginLeft: 30,
    height: 200,
    width: 400,
    marginTop:40,
    resizeMode: "contain"
  },
  logoPosition: {
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    margin: 8, //shouldnt be in string form
    height: 50,
    width: 350,
    marginLeft: 40
  },
  signUpButton: {
    backgroundColor: "green",
    width: 150,
    margin: 30,
    alignSelf: "center"
  }
});

export default SignUp;
