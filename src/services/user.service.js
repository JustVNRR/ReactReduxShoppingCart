import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};


const changeUserAvatar = (formData) => {

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
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(function () {
                return axios({
                    method: 'get',
                    url: "http://localhost:3200/user/" + id,
                    headers: { Authorization: `Bearer ${token}` }
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
                    type: LOGIN_FAIL,
                    payload: erreur
                })
            });
    }
}

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    changeUserAvatar
};
