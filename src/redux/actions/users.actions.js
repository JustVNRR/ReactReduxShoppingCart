import axios from "axios"

import {
    CHANGE_AVATAR,
    CHANGE_AVATAR_FAIL
} from "redux/actions/types"

export const changeUserAvatar = (formData) => {

    return (dispatch, getState) => {

        const id = getState().userReducer.id;
        const pseudo = getState().userReducer.pseudo;
        const login = getState().userReducer.login;
        const role = getState().userReducer.role;
        const token = getState().userReducer.token;

        return axios({
            method: 'patch',
            url: "http://localhost:3200/user/avatar/" + id,
            data: formData,
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(function () {
                return axios({
                    method: 'get',
                    url: "http://localhost:3200/user/" + id,
                    headers: {Authorization: `Bearer ${token}`}
                })
                    .then(function (response) {

                        const toto = {
                            id: id,
                            pseudo: pseudo,
                            login: login,
                            role: role,
                            token: token,
                            avatar: response.data.avatar
                        };

                        localStorage.setItem('token', JSON.stringify(toto));

                        dispatch({
                            type: CHANGE_AVATAR,
                            payload: response.data
                        });
                    })
                    .catch(function (erreur) {
                        dispatch({
                            type: CHANGE_AVATAR_FAIL,
                            payload: erreur
                        })
                    });

            })
            .catch(function (erreur) {
                dispatch({
                    type: CHANGE_AVATAR_FAIL,
                    payload: erreur
                })
            });
    }
}




