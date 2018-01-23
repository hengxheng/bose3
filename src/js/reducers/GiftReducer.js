const INIT_STATE = { 
    selectedGifts : [],
    newAdded: false,
    newGift: {
        name:"",
        qty: 0,
        color:""
    },
    total: 0
};

const GiftReducer = (state = INIT_STATE, action) => {

    const gifts = state.selectedGifts;
    let TotalPoints = 0;
    switch (action.type) {
        case "AddGift":
            gifts.push(action.payload);
            gifts.map(()=>{
                gifts.map( (i, k) => {
                  TotalPoints += i.point*i.qty;
                });
            });

            state = {
                ...state,
                selectedGifts: gifts,
                newGift: action.payload,
                newAdded: true,
                total: TotalPoints
            }       
            break;

        case "RemoveGift":
            const index = action.payload;
            if(index > -1){
                gifts.splice(index, 1);
            }
            gifts.map(()=>{
                gifts.map( (i, k) => {
                  TotalPoints += i.point*i.qty;
                });
            });
            state = {
                ...state,
                selectedGifts : gifts,
                total: TotalPoints
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