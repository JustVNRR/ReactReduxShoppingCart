import { INIT_BASKET, ADD_BASKET, REMOVE_BASKET, SHOW_HIDE_BASKET_MODAL } from "redux/actions/produits.actions"

const initialState = { basket: [], modal: false }

export default function productReducer(state = initialState, action) {

    switch (action.type) {

        case INIT_BASKET:

            return { ...state, basket: action.payload }

        case ADD_BASKET:

            //return { ...state, basket: addToBasket(action.payload) }

            //Je conserve cette syntaxe plutôt que celle du dessus
            //pour conserver un exemple de syntaxe permettant de modifier plus d'une variable du state.
            return Object.assign({}, state, addToBasket(action.payload))

        case REMOVE_BASKET:
            
             return { ...state, basket: removeFromBasket(action.payload) }

        case SHOW_HIDE_BASKET_MODAL:

            return Object.assign({}, state, {
                modal: !state.modal,
            });

        default:
            // Action de type inconnu => retour du stade actuel 
            return state
    }

    function addToBasket(prod) {

        let currentBasket = state.basket.slice();

        const foundBasket = currentBasket.find(element => element.id === prod.id);

        if (foundBasket) {

            if (foundBasket.stock > 0) {
                foundBasket.quantite++;
                foundBasket.stock--;
            }
        }
        else {
            currentBasket.push({ id: prod.id, nom: prod.nom, prix: prod.prix, stock: prod.stock - 1, quantite: 1 });
        }

        return { basket: currentBasket }
    }

    function removeFromBasket(id) {

        let basket = state.basket.slice();

        const item = basket.find(element => element.id === id);

        if (item && item.quantite > 0) {

            item.quantite--;
            item.stock++;

            if(item.quantite === 0) basket.splice(basket.indexOf(item), 1);
        }

        return  basket 
    }

}


