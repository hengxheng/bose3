const INIT_STATE = { 
    selectedGifts : [],
    newAdded: false,
    newGift: {
        name:"",
        qty: 0,
        color:""
    },
};

const GiftReducer = (state = INIT_STATE, action) => {

    const gifts = state.selectedGifts;
    switch (action.type) {
        case "AddGift":
            gifts.push(action.payload);
            state = {
                ...state,
                selectedGifts: gifts,
                newGift: action.payload,
                newAdded: true
            }  
            
            break;

        case "RemoveGift":
            const index = gifts.indexOf(action.payload);
            if(index > -1){
                gifts.splice(index, 1);
            }
            state = {
                ...state,
                selectedGifts : gifts
            }  
            break;
        case "HidePopup":
            state = {
                ...state,
                newAdded: false
            }
            break;
    }

    return state;
}

export default GiftReducer;