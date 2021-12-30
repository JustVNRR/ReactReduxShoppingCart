import './User.css'
import axios from "axios"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import { signIn } from 'redux/actions/auth.actions';

import { ACTIONS } from 'hoooks/useUserSearch'
import authHeader from "services/auth-header";
import eventBus from "common/EventBus";
import { showModale } from 'redux/actions/auth.actions'

const User = ({ user, setUsers }) => {

    const [loginInput, setLoginInput] = useState(false);
    const [pseudoInput, setPseudoInput] = useState(false);
    const [roleInput, setRoleInput] = useState(false);

    const [login, setLogin] = useState(user.login);
    const [pseudo, setPseudo] = useState(user.pseudo);
    const [role, setRole] = useState(user.role);

    const { isLoggedIn } = useSelector((state) => state.auth);

    let url = 'http://localhost:3200/user';

    const deleteUser = (id) => {
        url = url + '/' + id;

        axios.delete(url, { headers: authHeader() })
            .then(() => {
                setUsers({ type: ACTIONS.REMOVE_USER, payload: { id: id } });
            })
            .catch(function (err) {

                eventBus.dispatch("logout");

                dispatch(showModale());
            })
    }

    const dispatch = useDispatch();

    const changeAvatar = (e, id) => {

        let formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        axios({
            method: 'patch',
            url: "http://localhost:3200/user/avatar/" + id,
            data: formData,
            headers: authHeader()
        })
            .then(function () {
                axios({
                    method: 'get',
                    url: "http://localhost:3200/user/" + id,
                    headers: authHeader()
                }).then(function (response) {

                    setUsers({ type: ACTIONS.UPDATE_USER, payload: { res: response.data } });

                    if (user.login === isLoggedIn) {
                        dispatch(signIn({ login: user.login, password: user.password }));
                    }
                }).catch(function (err) {
                    alert(err.message);
                });
            })
            .catch(function (err) {
                alert(err.message);
            });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setLoginInput(false);
            setPseudoInput(false);
            setRoleInput(false);

            axios({
                method: 'put',
                url: "http://localhost:3200/user/" + user.id,
                data: { id: user.id, pseudo, login, role },
                headers: authHeader()
            })
                .then(function () {
                    axios({
                        method: 'get',
                        url: "http://localhost:3200/user/" + user.id,
                        headers: authHeader()
                    }).then(function (response) {

                        setUsers({ type: ACTIONS.UPDATE_USER, payload: { res: response.data } });

                        if (user.login === isLoggedIn) {
                            dispatch(signIn({ login: user.login, password: user.password }));
                        }
                    }).catch(function (err) {
                        alert(err.message);
                    });
                })
                .catch(function (error) {
                    alert(error.response.status + ' : ' + error.response.data.message.message);

                    eventBus.dispatch("logout");

                    dispatch(showModale());
                });
        }
    }

    return (
        <>
            <div className="m-2 card-user" >
                <input type="file" className="d-none" id={"hidden-input" + user.id} onChange={(e) => changeAvatar(e, user.id)} />
                <img className="card-avatar" src={user.avatar} alt={user.nom} onClick={() => { document.getElementById('hidden-input' + user.id).click() }} />
                <div>
                    {!pseudoInput && <div onClick={() => setPseudoInput(true)}>{pseudo}</div>}
                    {pseudoInput && <Form.Control type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} onKeyDown={handleKeyDown} />}

                    {!loginInput && <div onClick={() => setLoginInput(true)}>{login}</div>}
                    {loginInput && <Form.Control type="email" value={login} onChange={e => setLogin(e.target.value)} onKeyDown={handleKeyDown} />}

                    {!roleInput && <div onClick={() => setRoleInput(true)}>{role}</div>}
                    {roleInput && <Form.Control type="text" value={role} onChange={e => setRole(e.target.value)} onKeyDown={handleKeyDown} />}

                    <Button variant="link" onClick={() => deleteUser(user.id)}><FaTrashAlt color="red" fontSize="1.2em" /></Button>
                </div>
            </div >
        </>
    )
}

export default User