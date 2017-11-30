const INIT_STATE = { 
    selectedGifts : []
};

const GiftReducer = (state = INIT_STATE, action) => {

    const gifts = state.selectedGifts;
    switch (action.type) {
        case "AddGift":
            gifts.push(action.payload);
            state = {
                ...state,
                selectedGifts : gifts
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
    }

    return state;
}

export default GiftReducer;