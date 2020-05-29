import FARMFIELDS from '../../data/dummy-data';
const initialState = {
    availableFarmfields: FARMFIELDS,
    userProduct: FARMFIELDS.filter(prod => prod.myfarmFieldId == 'a1')
};

export default (state = initialState, acttion)=> {
    return state;
};