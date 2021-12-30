// https://www.pluralsight.com/guides/working-with-bootstraps-modals-react
import { useDispatch, useSelector } from 'react-redux'
import './ModalProfil.css';

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button, Nav, Alert } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { signIn, signUp, signOut, showHideModale, changeAvatar } from 'redux/actions/auth.actions'

import { useState } from 'react';
import useFormValidation from 'hoooks/useFormValidation';
import { showModale } from 'redux/actions/auth.actions'
import eventBus from "common/EventBus";
import { isEmpty } from 'Utils';
function ModalProfil() {

  const { isLoggedIn, user, modal } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const [signInProp, setSignIn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUAvatar = async (e) => {

    let formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    dispatch(changeAvatar(user.id, formData))
      .catch((error) => {

        //alert(error)
        eventBus.dispatch("logout");

        dispatch(showModale());
      });
  }

  const handleSignOut = async () => {

    dispatch(signOut())
    // .then(() => {
    navigate('/');
    //});
  }

  const handleCallbackSubmit = async () => {

    if (signInProp) {
      dispatch(signIn(values))
        .then(() => {
          // props.history.push("/profile");
          //window.location.reload();
        })
        .catch(() => {
          // setLoading(false);
        });
    }
    else {
      dispatch(signUp(values))
        .then(() => {
          dispatch(signIn(values))
            .then(() => {
            })
            .catch(() => {
            });
        })
        .catch(() => {
          // setLoading(false);
        });
    }
  }

  const { values, errors, handleChange, handleSubmit } = useFormValidation(handleCallbackSubmit);

  return (

    <Modal show={modal} onHide={() => { dispatch(showHideModale()) }}>
      {!isLoggedIn &&
        <>
          <Modal.Header>
            <Nav className="w-100 justify-content-around">
              <Nav.Link
                onClick={() => { setSignIn(true) }}
                className={`signIn ${signInProp ? "active" : ""}`}>
                Sign In
              </Nav.Link>
              <Nav.Link
                onClick={() => { setSignIn(false) }}
                className={`signOut ${signInProp ? "" : "active"}`}>
                Sign Up
              </Nav.Link>
            </Nav>
            <Button variant="close" onClick={() => { dispatch(showHideModale()) }}></Button>
          </Modal.Header>

          <Modal.Body>
            <Form>
              {!signInProp &&
                <>
                  <Form.Group className="mb-3" >
                    <Form.Control type="text" name="pseudo" minLength="5" required onBlur={handleChange} placeholder="pseudo" />
                    {errors.pseudo && <Alert variant="danger">{errors.pseudo}</Alert>}
                  </Form.Group>
                </>
              }
              <Form.Group className="mb-3" >
                <Form.Control type="email" name="login" required onBlur={handleChange} placeholder="login" />
                {errors.login && <Alert variant="danger">{errors.login}</Alert>}
              </Form.Group>

              <Form.Group >
                <Form.Control type="password" name="password" minLength="8" required onBlur={handleChange} placeholder="password" />
                {errors.password && <Alert variant="danger">{errors.password}</Alert>}
              </Form.Group>
              {!isEmpty(message) &&
                <Alert variant="danger">{message}</Alert>
              }
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-grid w-100">
              <Button type="submit" variant="outline-info" onClick={handleSubmit} disabled={Object.keys(errors).length > 0 || Object.keys(values).length === 0}>
                {signInProp ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </Modal.Footer>
        </>
      }
      {isLoggedIn &&
        <>
          <Modal.Header>
            <Modal.Title> Hi {user.pseudo}</Modal.Title>
            <Button variant="close" onClick={() => { dispatch(showHideModale()) }}></Button>
          </Modal.Header>
          <Modal.Body>
            <div className="profil-wrapper">
              <input type="file" className="d-none" id="hidden-input" onChange={changeUAvatar} />
              <img className="profil-avatar" src={user.avatar} alt="prout" onClick={() => { document.getElementById('hidden-input').click() }} />
              <p className="mt-3" >{user.login} </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-grid w-100">
              <Button type="submit" variant="outline-info" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </Modal.Footer>
        </>
      }
    </Modal>
  );
}

export default ModalProfil;
