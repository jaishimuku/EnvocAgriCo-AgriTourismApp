import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CartItem = props => {
    return (
        <View style={styles.cartItem}>
        <View style={styles.itemData}>
          <Text style={styles.quantity}>{props.quantity}   </Text>
          <Text style={styles.mainText}>{props.title}</Text>
          <Text style={styles.mainText}>      M</Text>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.mainText}>${props.amount}</Text>
          <TouchableOpacity onPress={props.onAdd} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-arrow-dropup' : 'ios-arrow-dropup'}
              size={23}
              color="green"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-arrow-dropdown' : 'ios-arrow-dropdown'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20
    },
    itemData: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    quantity: {
      color: 'blue',
      fontSize: 16
    },
    mainText: {
      fontSize: 16
    },
    deleteButton: {
      marginLeft: 20
    }
  });
  
  export default CartItem;
  