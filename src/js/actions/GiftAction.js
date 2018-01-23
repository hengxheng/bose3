export function addGift(name){
    return {
        type: "AddGift",
        payload: name
    }
}

export function removeGift(index){
    return {
        type: "RemoveGift",
        payload: index
    }
}

export function HidePopup(){
    return {
        type: "HidePopup",
        payload: false
    }
}