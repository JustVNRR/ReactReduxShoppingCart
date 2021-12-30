import { applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers/root.reducer'
import {checkStockProduct} from '../middlewares/middleware'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Creation du magasin de l'application

const store = createStore(
    rootReducer, 
    // N'utiliser composeWithDevTools qu'en DEV !!!! Sinon on montrera notre store à tout le monde...
    // applyMiddleware(handleTexteValue, thunk))
    composeWithDevTools(applyMiddleware(checkStockProduct, thunk)))

export default store
