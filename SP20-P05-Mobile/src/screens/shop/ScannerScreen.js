import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  Alert,
  TouchableHighlight,
  Modal,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ListItem } from "react-native-elements";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import SERVER_ROOT from "../../baseUrl";

const ScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [itemsInCart, setItemsInCart] = useState();
  const [array, setArray] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log("This is items in cart from useeffect", itemsInCart);
  }, [itemsInCart]);

  const handleBarCodeScanned = (items) => {
    setScanned(true);
    console.log(items);
    let arrayOfObjects = JSON.parse(items.data);
    let cartId = arrayOfObjects.itemsInCart[0].CartId;
    let transId = arrayOfObjects.itemsInCart[1].TransId;

    fetch(`${SERVER_ROOT}/api/Transactions/redeem/${cartId}/${transId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Sucessfully Redeemed");
          console.log("Successfully redeemed");
          return res.json();
        } else {
          Alert.alert("This Ticket has already been Redeemed.");
        }
      })
      .catch((error) => {
        console.log("There is problem fetching data ", error);
      });

    let newArr = { ...arrayOfObjects };
    setItemsInCart(newArr);
    let testArr = [...arrayOfObjects.itemsInCart[3]];
    setArray(testArr);
    setRenderModal(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {renderModal && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                PURCHASE
              </Text>

              {Object.keys(array).map((item, i) => {
                return (
                  <ListItem
                    key={i}
                    title={
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginRight: "auto",
                            width: 200,
                          }}
                        >
                          {array[item].SizeName}
                          {"  "}
                          {array[item].FarmFieldName}
                          {"  "}
                          {array[item].Quantity}
                        </Text>
                      </View>
                    }
                    leftIcon={{ name: "star" }}
                    style={{ width: 280 }} // style for length of divider
                    bottomDivider
                  />
                );
              })}
              <ListItem
                subtitle={
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        width: 200,
                        marginBottom: 5,
                      }}
                    >
                      Total Price: ${itemsInCart.itemsInCart[2].TotalPrice}
                    </Text>
                  </View>
                }
                leftIcon={{ name: "forward" }}
                style={{ width: 280, height: 50 }}
                bottomDivider
              />

              <TouchableHighlight
                style={{
                  backgroundColor: "green",
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  width: 100,
                  marginTop: 50,
                }}
                onPress={() => {
                  setRenderModal(false);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Okay
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      )}

      {scanned && (
        <Button
          style={{ color: "green" }}
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};

ScannerScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Scanner",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ScannerScreen;
