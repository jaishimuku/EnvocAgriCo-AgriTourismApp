import { ADD_TO_CART,  REMOVE_FROM_CART, ADD_SAME_ITEM} from "../actions/cart";
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {

        //Adding items to cart
        case ADD_TO_CART:
            const addedFarmfield = action.farmfield;
            const farmPrice = addedFarmfield.mprice;
            const farmTitle = addedFarmfield.title;

            let updatedOrNewCartItem;

            if(state.items[addedFarmfield.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedFarmfield.id].quantity + 1,
                    farmPrice,
                    farmTitle,
                    state.items[addedFarmfield.id].sum + farmPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, farmPrice, farmTitle, farmPrice); 
            }   
            return {
                ...state,
                items: { ...state.items, [addedFarmfield.id]: updatedOrNewCartItem }, // access dynamic property
                totalAmount: state.totalAmount + farmPrice
            };  


        //increase item
        case ADD_SAME_ITEM:
            const selectedItem = state.items[action.fid];
            const currentQtyAdd = selectedItem.quantity;
            let addCartItems;

            if (currentQtyAdd > 0) {
            // need to increase it
            const addCartItem = new CartItem(
                selectedItem.quantity + 1,
                selectedItem.farmPrice,
                selectedItem.farmTitle,
                selectedItem.sum + selectedItem.farmPrice
            );
            addCartItems = { ...state.items, [action.fid]: addCartItem };
            } else {
                addCartItems = { ...state.items };
            }
            return {
            ...state,
            items: addCartItems,
            totalAmount: state.totalAmount + selectedItem.farmPrice
            };


        //removing items from cart
        case REMOVE_FROM_CART: 
            const selectedCartItem = state.items[action.fid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;

            if (currentQty > 1) {
            // need to reduce it, not erase it
            const updatedCartItem = new CartItem(
                selectedCartItem.quantity - 1,
                selectedCartItem.farmPrice,
                selectedCartItem.farmTitle,
                selectedCartItem.sum - selectedCartItem.farmPrice
            );
            updatedCartItems = { ...state.items, [action.fid]: updatedCartItem };
            } else {
            updatedCartItems = { ...state.items };
            delete updatedCartItems[action.fid];
            }
            return {
            ...state,
            items: updatedCartItems,
            totalAmount: state.totalAmount - selectedCartItem.farmPrice
            };
        case ADD_ORDER:
            return initialState; 
    }
    return state;
};