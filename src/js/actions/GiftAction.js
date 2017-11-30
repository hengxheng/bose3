export function addGift(name){
    return {
        type: "AddGift",
        payload: name
    }
}

export function removeGift(name){
    return {
        type: "RemoveGift",
        payload: name
    }
}