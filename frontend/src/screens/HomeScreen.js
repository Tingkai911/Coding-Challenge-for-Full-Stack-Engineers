import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Button} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import {createProduct, listProducts} from "../actions/productActions";

export default function HomeScreen({history, match}) {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    useEffect(() => {
        if (!userInfo) {
            // If the user is not login, redirect him to the login page
            history.push("/login");
        }

        if (successCreate) {
            // If the product is created successfully, redirect them to the edit product screen
            history.push(`/admin/product/${createdProduct.sku}/edit`);
        } else {
            dispatch(listProducts(keyword, pageNumber));
        }
    }, [dispatch, history, userInfo, successCreate, keyword, pageNumber]);

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
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
