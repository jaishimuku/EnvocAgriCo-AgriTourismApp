import React, { useState } from "react";
import { FlatList, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FarmfieldItem from "../../components/shop/FarmfieldItem";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";


const FarmfieldOverviewScreen = (props) => {
  const farmfields = useSelector(
    (state) => state.farmfields.availableFarmfields
  );  

  const dispatch = useDispatch();
  const message = () => {
    Alert.alert('Added To Cart')
  }

  return (
    <FlatList
      data={farmfields}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <FarmfieldItem
          image={itemData.item.src}
          title={itemData.item.title}
          price={itemData.item.mprice}
          onViewDetail={() => {
            props.navigation.navigate("FarmfieldDetail", {
              farmId: itemData.item.id,
              farmfieldTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
            message();
          }}
        />
      )}
    />
  );
};
FarmfieldOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Envoc Agri Co FarmFields",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FarmfieldOverviewScreen;
