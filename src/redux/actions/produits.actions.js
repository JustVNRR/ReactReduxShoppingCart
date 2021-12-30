export const INIT_BASKET = "INIT_BASKET"
export const ADD_BASKET = "ADD_BASKET"
export const REMOVE_BASKET = "REMOVE_BASKET"
export const SHOW_HIDE_BASKET_MODAL = "SHOW_HIDE_BASKET_MODAL";

export const showHideModale = () => {

    return (dispatch) => {

        dispatch({
            type: SHOW_HIDE_BASKET_MODAL,
            payload: null
        });
    }
}

export const initBasket = (data) => {

    return (dispatch/*, getState*/) => {

        dispatch({
            type: INIT_BASKET,
            payload: data
        })
    }
}

export const addToBasket = (id) => {
    return {
        type: "ADD_BASKET_MIDDLEWARE",
        payload: id
    }
}

export const removeFromBasket = (id) => {
    return {
        type: "REMOVE_BASKET",
        payload: id
    }
}

