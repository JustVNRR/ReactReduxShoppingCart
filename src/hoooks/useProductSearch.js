import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'


export const ACTIONS = {
    CREATE_PRODUCT: "create-product",
    REMOVE_PRODUCT: "remove-product",
    GET_PRODUCTS: "get-products",
    EMPTY_PRODUCTS: "empty-products",
    UPDATE_PRODUCT: "update-product"
}

function reducer(products, action) {

    switch (action.type) {
        case ACTIONS.CREATE_PRODUCT:
            return [...products, action.payload.res];
        case ACTIONS.REMOVE_PRODUCT:
            return [...products.filter(u => u.id !== action.payload.id)]
        case ACTIONS.GET_PRODUCTS:
            return [...products, ...action.payload.res];
        case ACTIONS.UPDATE_PRODUCT:
            return products.map(u => {
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
            return products;
    }
}

export default function useProductSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    const [products, setProducts] = useReducer(reducer, []);

    useEffect(() => {
        setProducts({ type: ACTIONS.EMPTY_USERS });
    }, [query])

    useEffect(() => {

        setLoading(true)
        setError(false)
        let cancel

        axios({
            method: 'GET',
            url: 'http://localhost:3200/produit',
            params: { page: pageNumber, size: 5, query: query, },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setProducts({ type: ACTIONS.GET_PRODUCTS, payload: { res: res.data } });
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(error => {
            if (axios.isCancel(error)) return
            setError(true)
        })
        
        return () => cancel()

    }, [query, pageNumber])

    return { products, setProducts, hasMore, loading, error }
}