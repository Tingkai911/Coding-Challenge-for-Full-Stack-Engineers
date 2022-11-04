import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    ListGroupItem, Button,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
    deleteProduct,
    listProductDetails,
} from "../actions/productActions";
import {LinkContainer} from "react-router-bootstrap";
import {PRODUCT_DELETE_RESET} from "../constants/productConstants";

export default function ProductScreen({history, match}) {
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteProduct(id));
        }
    };

    useEffect(() => {
        if (successDelete) {
            // If the product is deleted successfully, redirect them to the homescreen
            dispatch({type: PRODUCT_DELETE_RESET});
            window.confirm("Product is deleted")
            history.push(`/`);
        } else {
            dispatch(listProductDetails(match.params.sku));
        }
    }, [dispatch, match, history, successDelete]);

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    {loadingDelete && <Loader/>}
                    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                    <Meta title={product.title}/>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.title} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{product.title}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h5>SKU: {product.sku}</h5>
                                </ListGroupItem>
                                {
                                    userInfo.isAdmin && (
                                        <ListGroupItem>
                                            <LinkContainer to={`/admin/product/${product.sku}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    Edit
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() => deleteHandler(product.sku)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </ListGroupItem>
                                    )
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}
