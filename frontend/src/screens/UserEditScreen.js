import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {getUserDetails, updateUser} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";

export default function UserEditScreen({history, match}) {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            // If the user is not login, redirect him to the login page
            history.push("/login");
        } else {
            // If update successful, update the user state and redirect to the user list
            if (successUpdate) {
                dispatch({type: USER_UPDATE_RESET});
                history.push("/admin/userlist");
            } else {
                // If the user details don't exist or the user id does not match the URL
                if (!user || user._id !== userId) {
                    dispatch(getUserDetails(userId));
                } else {
                    setName(user.name);
                    setEmail(user.email);
                    setIsAdmin(user.isAdmin);
                }
            }
        }
    }, [dispatch, history, user, userId, successUpdate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}));
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}
