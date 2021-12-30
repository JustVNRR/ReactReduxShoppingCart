import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket, showHideModale } from 'redux/actions/produits.actions'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function Basket() {

  const cartItems = useSelector((state) => state.productReducer.basket);
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantite * c.prix, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const isOpen = useSelector((state) => state.productReducer.modal);

  const dispatch = useDispatch();

  const onAdd = (item) => {
    document.activeElement.blur();
    dispatch(addToBasket({ id: item.id, nom: item.nom, prix: item.prix }));
  }

  const onRemove = (item) => {
    document.activeElement.blur();
    dispatch(removeFromBasket(item.id));
  }

  return (
    <Modal show={isOpen} onHide={() => { dispatch(showHideModale()) }}>

      {<Modal.Header>
        <Modal.Title>Mon panier</Modal.Title>
        <Button variant="close" onClick={() => { dispatch(showHideModale()) }}></Button>
      </Modal.Header>}

      <Modal.Body>
        <Container>
          {cartItems.length === 0 && <div>est vide...</div>}
          {cartItems.map((item) => (
            <Row key={item.id}>
              <Col xs={6}>{item.nom}</Col>
              <Col className="text-end">
                <Button variant="link" onClick={() => onRemove(item)} >
                  <FaMinusCircle color="red" fontSize="0.8em" />
                </Button>{' '}
                <Button variant="link" onClick={() => onAdd(item)} >
                  <FaPlusCircle color="green" fontSize="0.8em" />
                </Button>
              </Col>
              <Col className="text-end">
                {item.quantite} x €{item.prix.toFixed(2)}
              </Col>
            </Row>
          ))}

          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <Row>
                <Col>Articles</Col>
                <Col className="text-end">€{itemsPrice.toFixed(2)}</Col>
              </Row>
              <Row>
                <Col >T.V.A.</Col>
                <Col className="text-end">€{taxPrice.toFixed(2)}</Col>
              </Row>
              <Row>
                <Col >Livraison</Col>
                <Col className="text-end">€{shippingPrice.toFixed(2)}</Col>
              </Row>
              <Row>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col className="text-end">
                  <strong>€{totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Modal.Body>

      {cartItems.length > 0 &&
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => alert('Not yet implemented...')}>Valider</Button>
        </Modal.Footer>}

    </Modal>
  );
}