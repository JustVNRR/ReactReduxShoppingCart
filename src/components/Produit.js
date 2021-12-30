// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToBasket } from 'redux/actions/produits.actions'
import axios from "axios"
import { useState, useEffect } from 'react';
import './Produit.css'
import { isEmpty } from 'Utils'
import { Button } from 'react-bootstrap'
import { FaTrashAlt } from "react-icons/fa";

import { ACTIONS } from 'hoooks/useProductSearch'

import Rating from './Rating'

import eventBus from "common/EventBus";
import { showModale } from 'redux/actions/auth.actions'

const Produit = ({ product, setProducts }) => {

    const { user } = useSelector(state => state.auth);

    const basket = useSelector((state) => state.productReducer.basket);

    const [stock, setStock] = useState(product.stock)
    const [addOrRemove, setAddOrRemove] = useState(-1)

    const dispatch = useDispatch();

    useEffect(() => {

        if (addOrRemove !== -1) {
            if (!isEmpty(basket) && !isEmpty(basket.filter(b => b.id === product.id))) {
                setStock(basket.filter(b => b.id === product.id)[0].stock)
            }
            else {
                setStock(product.stock)
            }
        }
    }, [addOrRemove, basket, product]);

    const addToCart = () => {

        dispatch(addToBasket({ id: product.id, nom: product.nom, prix: product.prix, stock: product.stock }));

        setAddOrRemove(Math.random())
    }

    const deleteProduct = (id) => {

        const authorizationToken = `Bearer ${user.token}`;

        axios({
            method: 'delete',
            url: 'http://localhost:3200/produit/' + id,
            headers: { Authorization: authorizationToken }
        })
            .then(() => {

                setProducts({ type: ACTIONS.REMOVE_PRODUCT, payload: { id: id } });
            })
            .catch(function (err) {
                alert(err.message);

                eventBus.dispatch("logout");

                dispatch(showModale());
            })
    }

    return (
        <>
            <p className="d-none">{!isEmpty(basket)}</p>
            <div className="card-produit">
                <img className="top img-produit" src={product.img} alt={product.nom} />
                <div>
                    <div>{product.nom}</div>
                    <div><strong>{product.prix}€</strong></div>
                    <Rating rating={product.rating}/>
                    <div className={` mt-2 mb-2 ${!stock > 0 ? "alert alert-danger" : ""}`} >{stock > 0 ? 'Stock : ' + stock : "épuisé"}</div>
                    {stock > 0 && ((user && "admin" !== user.role) || !user) &&
                        <Button variant="outline-primary" onClick={() => addToCart(product.id)}>Ajouter au panier</Button>
                    }
                    {user && "admin" === user.role &&
                        <Button variant="link" onClick={() => deleteProduct(product.id)}><FaTrashAlt color="red" fontSize="1.2em" /></Button>
                    }
                </div>
            </div>
        </>
    )
}

export default Produit


///////////////////////////////////////////////////////////////////
//////////////////////AUTRE SYNTAXE //////////////////////////////
//////////////////////////////////////////////////////////////////


// import { Link } from 'react-router-dom'
// import { connect, useSelector } from 'react-redux'
// import {addToBasket} from '../redux/actions/actions'

// const ConnectedProduit = ({ prod, addToBasket }) => {

//     const toto = useSelector((state) => state.productReducer.erreur)
//     return (
//         <>
//             <div className="col">
//                 <div className="card m-2 card-produit" >
//                     <img className="card-img-top " src={prod.img} alt="" />
//                     <div className="card-body">
//                         <h5 className="card-title">{prod.nom} - {prod.prix}€ - ({prod.stock > 0 ? prod.stock + ' disp' : "Epuisé"})</h5>
//                         <p className="card-text resume">{prod.desc} <Link to={"/products/" + prod.id}>Detail</Link> </p>
//                         {prod.stock > 0 && <button className="btn btn-outline-primary" onClick={() => addToBask(prod.id)}>Ajouter au panier</button>}
//                     </div>
//                 </div >
//                 <p>{toto}</p>
//             </div >
//         </>
//     )
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToBasket: (item) => dispatch(addToBasket(item))
//     }
// }

// const Produit = connect(null, mapDispatchToProps)(ConnectedProduit)

// export default Produit

