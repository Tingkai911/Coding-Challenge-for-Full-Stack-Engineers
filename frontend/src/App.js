import React from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen}/>
                    <Route path="/register" component={RegisterScreen}/>
                    <Route path="/profile" component={UserProfileScreen}/>
                    <Route path="/product/:sku" component={ProductScreen}/>
                    <Route path="/admin/userlist" component={UserListScreen}/>
                    <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
                    <Route path="/admin/product/:sku/edit" component={ProductEditScreen}/>
                    <Route path="/search/:keyword" component={HomeScreen} exact/>
                    <Route path="/page/:pageNumber" component={HomeScreen} exact/>
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        exact
                        component={HomeScreen}
                    />
                    <Route path="/" exact component={HomeScreen}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
