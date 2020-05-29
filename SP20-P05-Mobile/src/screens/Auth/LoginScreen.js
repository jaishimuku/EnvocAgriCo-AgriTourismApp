import React, { useState } from "react";
import Login from "../../components/Auth/Login";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const LoginScreen = props => {
  return (
    <View style={styles.container}>
      <Login props={props} />
    </View>
  );
};
LoginScreen.navigationOptions = navData => {
  return {
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default LoginScreen;
