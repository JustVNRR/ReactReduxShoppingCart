import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3200/api/auth/";

const register = (credentials) => {
    return axios({
        method: 'post',
        url: API_URL + 'signup',
        data: credentials
    });
};

const login = (credentials) => {
    return axios({
        method: 'post',
        url: API_URL + 'signin',
        data: credentials
    })
        .then((response) => {

            if (response.data.token) {

                localStorage.setItem("token", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {

    const user = JSON.parse(localStorage.getItem('token'));

    if (user && user.refreshToken) {
        console.log("REFRESH TOKEN")

        return axios({
            method: 'delete',
            url: API_URL + 'signout',
            data: {refreshToken: user.refreshToken}
        })
            .then((response) => {
    
                // if (Ok...) {
    
                localStorage.removeItem("token");
                // }
            });

    } else {

        console.log("NO REFRESH TOKEN")
        localStorage.removeItem("token");
    }
};

const changeAvatar = (id, formData) => {

    return axios({
        method: 'patch',
        url: "http://localhost:3200/user/avatar/" + id,
        data: formData,
        headers: authHeader()
    })
        .then(function () {

            return axios({
                method: 'get',
                url: "http://localhost:3200/user/" + id,
                headers: authHeader()
            })
                .then(function (response) {

                    const auth = JSON.parse(localStorage.getItem('token'));
                    auth.avatar = response.data.avatar;

                    localStorage.setItem('token', JSON.stringify(auth));

                    return auth
                })
                .catch(function (err) {
                })
        })
        .catch(function (err) {

            throw err;
        });

}

const exp =
{
    register,
    login,
    logout,
    changeAvatar
};

export default exp;