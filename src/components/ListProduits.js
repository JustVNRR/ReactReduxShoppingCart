import Produit from "components/Produit"
import { isEmpty } from 'Utils'

import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios"

import { useSelector, useDispatch } from 'react-redux'
import useProductSearch from 'hoooks/useProductSearch'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';

import { FcPlus } from "react-icons/fc";
import useFormValidation from 'hoooks/useFormValidation';
import './ListProduits.css'
import { ACTIONS } from 'hoooks/useProductSearch'
import eventBus from "common/EventBus";
import { showModale } from 'redux/actions/auth.actions'

const ListProduits = ({ query }) => {

    const [pageNumber, setPageNumber] = useState(1);

    const [isOpen, setIsOpen] = useState(false);

    const erreur = useSelector((state) => state.productReducer.erreur);

    const { user } = useSelector(state => state.auth);

    const [visual, setVisual] = useState();

    const dispatch = useDispatch();

    const {
        products,
        setProducts,
        hasMore,
        loading,
        error
    } = useProductSearch(query, pageNumber)

    useEffect(() => {
        setPageNumber(1)
    }, [query])

    const observer = useRef()

    const lastProductRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })

        if (node) observer.current.observe(node)

    }, [loading, hasMore])

    const handleCreateProduct = () => {

        let formData = new FormData();
        formData.append("nom", values.nom);
        formData.append("desc", values.desc);
        formData.append("prix", values.prix);
        formData.append("stock", values.stock);
        formData.append("visual", visual);

        const authorizationToken = `Bearer ${user.token}`;

        axios({
            method: 'post',
            url: 'http://localhost:3200/produit',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authorizationToken
            }
        })
            .then((res) => {
                setProducts({ type: ACTIONS.CREATE_PRODUCT, payload: { res: res.data } });

                setIsOpen(false);
            })
            .catch(function (err) {
                setIsOpen(false)
                alert(err.message);
                eventBus.dispatch("logout");

                dispatch(showModale());
            })
    }

    const { values, errors, handleChange, handleSubmit } = useFormValidation(handleCreateProduct);

    return (
        <>
            {!isEmpty(products) &&
                <div className="wrapper-produits">
                    {user && "admin" === user.role &&
                        <div className="d-flex flex-column justify-content-center">
                            <Button variant="link" onClick={() => setIsOpen(true)}><FcPlus fontSize="3em" /></Button>
                        </div >
                    }
                    {products.map((item, indice) => {
                        if (products.length === indice + 1) {
                            return <div ref={lastProductRef} key={indice}><Produit product={item} setProducts={setProducts} /></div>
                        }
                        else {
                            return <Produit key={indice} product={item} setProducts={setProducts} />
                        }
                    })}
                </div>
            }
            {loading &&
                <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            }
            <div>{error && 'Something went wrong...'}</div>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Header>
                    <Modal.Title>New Product</Modal.Title>
                    <Button variant="close" onClick={() => setIsOpen(false)}></Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name="nom" minLength="5" required onBlur={handleChange} placeholder="nom du produit" />
                            {errors.nom && <Alert variant="danger">{errors.nom}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Row>
                                <Col>
                                    <Form.Control type="text" name="prix" onBlur={handleChange} placeholder="prix" />
                                    {errors.prix && <Alert variant="danger">{errors.prix}</Alert>}
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="stock" onBlur={handleChange} placeholder="stock" />
                                    {errors.stock && <Alert variant="danger">{errors.stock}</Alert>}
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control as="textarea" name="desc" rows={3} onBlur={handleChange} placeholder="description" />
                            {errors.desc && <Alert variant="danger">{errors.desc}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control id="formFileLg" type="file" name="visual" onChange={e => setVisual(e.target.files[0])} />
                            {/* {errors.visual && <Alert variant="danger">{errors.visual}</Alert>} */}
                        </Form.Group>
                        {erreur &&
                            <Alert variant="danger">{erreur}</Alert>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-grid w-100">
                        <Button type="submit" variant="outline-info" onClick={handleSubmit}>Create Product</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListProduits


///////////////////////////////////////////////////////////////////
//////////////////////AUTRE SYNTAXE //////////////////////////////
//////////////////////////////////////////////////////////////////


// import { useParams } from 'react-router-dom'
// import Produit from "./Produit"
// import { connect } from 'react-redux'

// const ConnectedListProduits = ({ slice, produits }) => {

//     let { id } = useParams();

//     let listeProduits;

//     if (id) {

//         const found = produits.find(element => element.id === parseInt(id, 10));

//         if (found) {
//             listeProduits = <Produit prod={found} />
//         }
//         else {
//             listeProduits = <h2>Aucun article correspondant</h2>
//         }
//     }
//     else {
//         listeProduits = produits.slice(0, slice).map((item, indice) => {
//             return (<Produit key={indice} prod={item} />)
//         })
//     }

//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     {listeProduits}
//                 </div>
//             </div>
//         </>
//     )
// }
// const mapStateToProps = (state) => {
//     return {
//         produits: state.productReducer.produits
//     }
// }
// const ListProduits = connect(mapStateToProps)(ConnectedListProduits)

// export default ListProduits

