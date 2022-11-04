import React from "react";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";

export default function Header() {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>MJ Inventory</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Do not add the <SearchBox /> component directly as it will not have access to the history props that way */}
                        {/* Use a render prop */}
                        <Route render={({history}) => <SearchBox history={history}/>}/>
                        <Nav className="ml-auto">
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
