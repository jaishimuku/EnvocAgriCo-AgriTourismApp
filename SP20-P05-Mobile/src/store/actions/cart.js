export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_SAME_ITEM = 'ADD_SAME_ITEM';

export const addToCart = farmfield => {
    return {
        type: ADD_TO_CART,
        farmfield: farmfield
    };
}

export const removeFromCart = farmId => {
    return { 
        type: REMOVE_FROM_CART, 
        fid: farmId 
    };
  };

export const AddItemFromCart = farmId => {
    return { 
        type: ADD_SAME_ITEM, 
        fid: farmId 
    };
};