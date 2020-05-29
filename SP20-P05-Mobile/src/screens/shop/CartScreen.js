import React, { useState, useEffect } from "react";
import { View, Alert, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import QRCode from "react-native-qrcode-svg";

import SERVER_ROOT from "../../baseUrl";

const CartScreen = (props) => {
  const [renderQR, setRenderQR] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        farmId: key,
        farmTitle: state.cart.items[key].farmTitle,
        farmPrice: state.cart.items[key].farmPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems.sort((a, b) => (a.farmId > b.farmId ? 1 : -1));
  });
  const dispatch = useDispatch();

  const message = () => {
    Alert.alert("Checked-Out Successfully");
  };

  const generateQRCode = async () => {
    console.log("Hello from generate QR Code");
    let res = await fetch(`${SERVER_ROOT}/api/Transactions`);
    let response = await res.json();
    let qrcodeobj = [];
    let myJsonConst = response[response.length - 1];
    qrcodeobj.push({ CartId: myJsonConst.cartId });
    qrcodeobj.push({ TransId: myJsonConst.id });
    let itemsDto = [];

    for (var i = 0; i < myJsonConst.itemsDto.length; i++) {
      let sizeName,
        farmFieldName,
        quantity = "";
      sizeName = myJsonConst.itemsDto[i].sizeName;
      farmFieldName = myJsonConst.itemsDto[i].farmFieldName;
      quantity = myJsonConst.itemsDto[i].quantity;
      itemsDto.push({
        SizeName: sizeName,
        FarmFieldName: farmFieldName,
        Quantity: quantity,
      });
    }
    qrcodeobj.push({ TotalPrice: myJsonConst.totalPrice });
    qrcodeobj.push(itemsDto);
    let newArr = [...qrcodeobj];
    var testArr = [...itemsInCart, newArr];
    setRenderQR(true);
    setItemsInCart(testArr);
  };

  const sendTransaction = () => {
    let myData = [];

    cartItems.forEach((item) => {
      myData.push({
        FarmFieldId: Number(item.farmId),
        Quantity: item.quantity,
        Price: item.sum / item.quantity,
      });
    });

    console.log(myData);

    fetch(`${SERVER_ROOT}/api/Transactions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    })
      .then((response) => {
        console.log("Transaction created");
        //console.log(response.status);
        if (response.ok) {
          console.log("Response OK"); // cannot return response.json coz api is sending nothing
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((response) => {})
      .catch((error) => {
        console.log("Problem with fetch", error);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
        </Text>
        <Button
          color={Colors.primary}
          title="Buy Ticket"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
            message();
            //generateQRCode();
            sendTransaction();
            generateQRCode();
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.farmId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.farmTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.farmId));
            }}
            onAdd={() => {
              dispatch(cartActions.AddItemFromCart(itemData.item.farmId));
            }}
          />
        )}
      ></FlatList>
      <View>
        {renderQR ? (
          <QRCode
            value={JSON.stringify({ itemsInCart })}
            size={200}
            color="black"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
