export const checkStockProduct = ({ dispatch, getState }) => {

    return function (next) {
        return function (action) {

            switch (action.type) {

                case "ADD_BASKET_MIDDLEWARE": // CE midddleware sert désormais à rien... je le laisse pour l'exemple

                    // let found = getState().productReducer.produits.filter(element => element.id === parseInt(action.payload, 10))

                    // return dispatch({
                    //     type: found ? ((found[0].stock > 0) ? "ADD_BASKET" : "ERR_NO_STOCK") : "ERR_NOT_FOUND",
                    //     payload: action.payload
                    // })

                    return dispatch({
                        type: "ADD_BASKET",
                        payload: action.payload
                    })

                default:
                    return next(action)
            }
        }
    }
}