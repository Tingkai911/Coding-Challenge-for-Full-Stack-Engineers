import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Button} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import {listProducts} from "../actions/productActions";

export default function HomeScreen({history, match}) {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    useEffect(() => {
        if (!userInfo) {
            // If the user is not login, redirect him to the login page
            history.push("/login");
        }
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, history, userInfo, keyword, pageNumber]);

    const createProductHandler = () => {
        history.push(`/admin/product/null/edit`);
    }

    return (
        <>
            <Meta/>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </>
    );
}
