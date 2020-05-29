import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigation";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import cartReducer from '../SP20-P05-Mobile/src/store/reducers/cart';
import farmfieldsReducer from "../SP20-P05-Mobile/src/store/reducers/farmfields"
import orderReducer from './src/store/reducers/orders';


const rootReducer = combineReducers({
  farmfields: farmfieldsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
