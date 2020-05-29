import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Alert,
    Button,
    StyleSheet
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const FarmfieldDetailScreen = props => {
    const farmId = props.navigation.getParam('farmId');
    const selectedFarmfield = useSelector(
        state => state.farmfields.availableFarmfields.find(farm => farm.id === farmId)
    );
    const dispatch = useDispatch();
    const message = () => {
      Alert.alert("Added to Cart");
    }

    return (
      
      <ScrollView>
      <Image style={styles.image} source={{ uri: selectedFarmfield.src }} />

      <Text style={styles.price}>${selectedFarmfield.mprice}/Medium</Text>
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {
          dispatch(cartActions.addToCart(selectedFarmfield));
          message();
        }} />
      </View>
      <Text style={styles.description}>{selectedFarmfield.description}</Text>
    </ScrollView>
    )
}
FarmfieldDetailScreen.navigationOptions = navData=>{
    return {
        headerTitle: navData.navigation.getParam('farmfieldTitle')
    }
};
const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 300
    },
    actions: {
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '25%',
      paddingHorizontal: 20
    },
    price: {
      fontSize: 25,
      color: 'black',
      textAlign: 'center',
      marginVertical: 10
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20,
      marginTop: 20
    }
  });
export default FarmfieldDetailScreen;