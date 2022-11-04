import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";

export const listProducts = (keyword = "", pageNumber = "") => async (
    dispatch, getState
) => {
    try {
        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the content type and the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        dispatch({type: PRODUCT_LIST_REQUEST});

        // Passing the search keyword and pageNumber to the backend as a query string
        const {data} = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`, config
        );

        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message // From custom error handler
                    : error.message, // Default error message in express js
        });
    }
};

export const listProductDetails = (id) => async (dispatch, getState) => {
    try {
        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the content type and the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`, config);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message // From custom error handler
                    : error.message, // Default error message in express js
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the content type and the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send get request to delete a product by id
        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the content type and the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send post request to create a product (need to send an empty object here in a post request)
        const {data} = await axios.post(`/api/products/`, {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the content type and the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        console.log(product)

        // Send put request to update a product
        const {data} = await axios.put(
            `/api/products/${product.sku}`,
            product,
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
};
