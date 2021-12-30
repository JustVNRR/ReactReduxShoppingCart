import axios from "axios"

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { isEmpty } from 'Utils'
import useUserSearch from 'hoooks/useUserSearch'

import PageNotAllowed from 'components/PageNotAllowed'
import User from "components//User"
import { Button, Form, Alert } from 'react-bootstrap';
import { FcPlus } from "react-icons/fc";

import useFormValidation from 'hoooks/useFormValidation';
import './ListUsers.css'

import { ACTIONS } from 'hoooks/useUserSearch'
import eventBus from "common/EventBus";
import { showModale/*, updateToken*/ } from 'redux/actions/auth.actions'

import authHeader from "services/auth-header";

const ListUsers = ({ query }) => {

    const [pageNumber, setPageNumber] = useState(1);

    const [isOpen, setIsOpen] = useState(false);

    const { message } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {
        users,
        setUsers,
        hasMore,
        loading,
        error
    } = useUserSearch(query, pageNumber, user);

    useEffect(() => {
        setPageNumber(1)
    }, [query])

    const observer = useRef()

    const lastUserRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    // useEffect(() => {
    //     console.log("message")
    //     console.log(message)
    // }, [message])

    const handleCreateUser = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3200/user',
            data: values,
            headers: authHeader()
        })
            .then((response) => {

                setUsers({ type: ACTIONS.ADD_USER, payload: { res: response.data } });
                setIsOpen(false);
            })
            .catch(function (error) {

                setIsOpen(false);
                alert('Error Status Code : ' + error.response.status + ' : ' + error.response.data);

                eventBus.dispatch("logout");

                dispatch(showModale());
            })
    }

    const { values, errors, handleChange, handleSubmit } = useFormValidation(handleCreateUser);

    return (
        <>
            {user && "admin" === user.role && !isEmpty(users) &&
                <div className="wrapper-users">
                    {/*user && "admin" === currentRole &&*/
                        <div className="d-flex flex-column justify-content-center">
                            <Button variant="link" onClick={() => setIsOpen(true)}><FcPlus fontSize="3em" /></Button>
                        </div >
                    }
                    {users.map((item, indice) => {

                        if (users.length === indice + 1) {
                            return <div ref={lastUserRef} key={indice}>
                                <User user={item} setUsers={setUsers} />
                            </div>
                        }
                        else {
                            return <User key={indice} user={item} setUsers={setUsers} />
                        }
                    })}
                </div>
            }
            {loading && user && user.token &&
                <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            }
            {!loading && user && "admin" !== user.role &&
                <PageNotAllowed />
            }
            <div>{error && 'Error'}</div>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Header>
                    <Modal.Title> New user</Modal.Title>
                    <Button variant="close" onClick={() => setIsOpen(false)}></Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name="pseudo" minLength="5" required onBlur={handleChange} placeholder="pseudo" />
                            {errors.pseudo && <Alert variant="danger">{errors.pseudo}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" name="login" required onBlur={handleChange} placeholder="login" />
                            {errors.login && <Alert variant="danger">{errors.login}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" name="password" minLength="8" required onBlur={handleChange} placeholder="password" />
                            {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                        </Form.Group>
                        <Form.Group >
                            <Form.Select name="role" onBlur={handleChange} defaultValue={"user"}>
                                <option disabled> -- select a role -- </option>
                                <option>user</option>
                                <option>moderator</option>
                                <option>admin</option>
                            </Form.Select>
                            {errors.role && <Form.Text className="alert alert-danger">{errors.role}</Form.Text>}
                        </Form.Group>
                        {!isEmpty(message) &&
                            <Alert variant="danger">Message : {message}</Alert>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-grid w-100">
                        <Button variant="outline-info" as="input" type="submit" value="Create User" onClick={handleSubmit} />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListUsers