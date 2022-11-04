import axios from "axios";
import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        // To send the content type in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Send the request to the backend
        const {data} = await axios.post(
            "/api/users/login",
            {email, password},
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message // From custom error handler
                    : error.message, // Default error message in express js
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: USER_LIST_RESET});
    document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        // To send the content type in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Send the request to the backend
        const {data} = await axios.post(
            "/api/users",
            {name, email, password},
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        // Login the user right away after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message // From custom error handler
                    : error.message, // Default error message in express js
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
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

        // Send the request to the backend to get the user details
        const {data} = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message // From custom error handler
                    : error.message, // Default error message in express js
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
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

        // Send request to update the user profile
        const {data} = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        // Login the user again with the new user profile
        // must pass in the token to login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the token in the header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send request to update the user profile
        const {data} = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the token in the header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send request to delete the user
        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        // Get the token
        const {
            userLogin: {userInfo},
        } = getState();

        // To send the token in the header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send request to update the user
        const {data} = await axios.put(`/api/users/${user._id}`, user, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        });
    }
};
