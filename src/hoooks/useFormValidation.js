import { useState } from 'react';
import { omit } from 'lodash';

const useFormValidation = (callback) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {

        switch (name) {
            case 'pseudo':
                if (value.length <= 4) {

                    setErrors({
                        ...errors,
                        pseudo: 'Username at least have 5 letters'
                    })
                }
                else {

                    //omit function removes/omits the vzlue from given object and returns a new object
                    let newObj = omit(errors, "pseudo");
                    setErrors(newObj)
                }

                break;

            case 'login':
                if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)) {
                    setErrors({
                        ...errors,
                        login: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "login");
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
                    //  if (false) {
                    setErrors({
                        ...errors,
                        password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

            case 'role':
                if ("admin" !== value && "user" !== value) {
                    setErrors({
                        ...errors,
                        role: 'Please select a role'
                    })
                } else {

                    let newObj = omit(errors, "role");
                    setErrors(newObj);
                }
                break;
            case 'nom':
                if (value.length <= 4) {

                    setErrors({
                        ...errors,
                        nom: 'Product name at least have 5 letters'
                    })
                }
                else {

                    //omit function removes/omits the vzlue from given object and returns a new object
                    let newObj = omit(errors, "nom");
                    setErrors(newObj)
                }

                break;

            case 'desc':
                if (value.length <= 4) {

                    setErrors({
                        ...errors,
                        desc: 'Product description at least have 5 letters'
                    })
                }
                else {

                    //omit function removes/omits the vzlue from given object and returns a new object
                    let newObj = omit(errors, "desc");
                    setErrors(newObj)
                }

                break;

            case 'prix':
                if (parseFloat(value) <= 0) {

                    setErrors({
                        ...errors,
                        prix: 'Product price must be positive'
                    })
                }
                else {

                    //omit function removes/omits the vzlue from given object and returns a new object
                    let newObj = omit(errors, "prix");
                    setErrors(newObj)
                }

                break;

            case 'stock':
                if (parseFloat(value) < 0) {

                    setErrors({
                        ...errors,
                        stock: 'Product stock can not be negative'
                    })
                }
                else {

                    //omit function removes/omits the vzlue from given object and returns a new object
                    let newObj = omit(errors, "stock");
                    setErrors(newObj)
                }

                break;

            default:
                break;
        }

    }

    const handleChange = (event) => {

        // To stop default events
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);

        setValues({
            ...values,
            [name]: val,
        })
    }

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
            callback();
        }
        else {
            alert("there is an error");
        }
    }
    return { values, errors, handleChange, handleSubmit }
}

export default useFormValidation
