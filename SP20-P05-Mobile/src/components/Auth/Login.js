import React, { useState } from "react";
import { StyleSheet, View, Image, Alert} from "react-native";
import Logo from "../Auth/logo.png";
import { TextInput, Button } from "react-native-paper";
import SERVER_ROOT from '../../baseUrl';


const Login = props => {
  const [Username, setUserName] = useState();
  const [Password, setPassword] = useState();

  const submitData = async () => {
    fetch(`${SERVER_ROOT}/api/authentication/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username,
        Password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Alert.alert("Invalid Username or Password");
          window.stop();
        }
      })
      .then(data => {
        Alert.alert("Sucessful login");
        props.props.navigation.push("FarmfieldsOverview");
      })
      .catch(error => {  
        console.log("Problem with fetch", error);
      });
  };
  return (
    <View style={styles.myCard}>
      <View>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View>
        <TextInput
          label="UserName"
          style={styles.inputStyle}
          theme={theme}
          value={Username}
          mode="outlined"
          autoCapitalize="none"
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          label="Password"
          style={styles.inputStyle}
          theme={theme}
          value={Password}
          mode="outlined"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={() => submitData()}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};
const theme = {
  colors: {
    primary: "green"
  }
};
const styles = StyleSheet.create({
  myCard: {
    flex: 1
  },
  logo: {
    height: 200,
    width: 400,
    margin: 5,
    marginTop: 100,
    alignContent: "center"
  },
  inputStyle: {
    margin: 10
  },
  submitButton: {
    backgroundColor: "green",
    margin: 80,
    marginTop: 20
  }
});

export default Login;
