import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showModale } from 'redux/actions/auth.actions'

import { useNavigate } from 'react-router-dom'
import authHeader from "services/auth-header";
import eventBus from "common/EventBus";

export const ACTIONS = {
    ADD_USER: "add-user",
    REMOVE_USER: "remove-user",
    GET_USERS: "get-users",
    EMPTY_USERS: "empty-users",
    UPDATE_USER: "update-user"
}

function reducer(users, action) {

    switch (action.type) {
        case ACTIONS.ADD_USER:
            return [...users, action.payload.res];
        case ACTIONS.REMOVE_USER:
            return [...users.filter(u => u.id !== action.payload.id)]
        case ACTIONS.GET_USERS:
            return [...users, ...action.payload.res];
        case ACTIONS.UPDATE_USER:
            return users.map(u => {
                if (u.id === action.payload.res.id) {
                    return action.payload.res;
                }
                else {
                    return u;
                }
            });
        case ACTIONS.EMPTY_USERS:
            return [];
        default:
            return users;
    }
}

export default function useUserSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [users, setUsers] = useReducer(reducer, []);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [hasMore, setHasMore] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setUsers({ type: ACTIONS.EMPTY_USERS });
    }, [query])

    useEffect(() => {

        setLoading(true);
        setError(false);
        let cancel;

        if (isLoggedIn) {
            axios({
                method: 'GET',
                url: 'http://localhost:3200/user',
                params: { page: pageNumber, size: 5, query: query, },
                cancelToken: new axios.CancelToken(c => cancel = c),
                headers: authHeader()
            }).then(res => {

                setUsers({ type: ACTIONS.GET_USERS, payload: { res: res.data } });
                setHasMore(res.data.length > 0)
                setLoading(false)
            }).catch(error => {
                if (axios.isCancel(error)) return
                setError(true)

                if (401 === error.response.status) {

                    if ('droits insuffisants' === error.response.data.message.message) {
                        navigate('/forbidden');
                    }
                    else {
                        eventBus.dispatch("logout");
                        dispatch(showModale());
                    }
                }
                else if (403 === error.response.status) {

                    eventBus.dispatch("logout");
                    dispatch(showModale());
                }
                else {
                    //alert('Error Status Code : ' + error.response.status + ' : ' + error.response.data.message.message);
                    alert('Error Status Code : ' + error.response.status + ' : ' + error.response.data);
                }
            })
            return () => cancel()
        }
        else {
            dispatch(showModale());
        }

    }, [query, pageNumber, dispatch, navigate, user, isLoggedIn])

    return { loading, error, users, setUsers, hasMore }
}