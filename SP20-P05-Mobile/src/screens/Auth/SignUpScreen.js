import React, { useState } from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import SignUp from "../../components/Auth/SignUp";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
const SignUpScreen = props => {
  return (
    <View style={styles.container}>
      <SignUp props={props} />
    </View>
  );
};

SignUpScreen.navigationOptions = navData => {
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

export default SignUpScreen;
