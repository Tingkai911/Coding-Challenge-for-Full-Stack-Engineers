import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {listProductDetails, updateProduct, createProduct} from "../actions/productActions";
import {PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET} from "../constants/productConstants";

export default function ProductEditScreen({history, match}) {
    let sku = match.params.sku;

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    useEffect(() => {
        if (successCreate) {
            // If the product is created successfully, redirect them to the product screen
            sku = createdProduct.sku;
            dispatch({type: PRODUCT_CREATE_RESET});
            history.push(`/product/${sku}`)
        } else if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(listProductDetails(sku));
            history.push(`/product/${product.sku}`)
        } else {
            if (sku === "null") {
                setTitle("Sample Title");
                setImage("/images/sample.jpg");
            } else if (!product || product.sku !== sku) {
                dispatch(listProductDetails(sku));
            } else {
                setTitle(product.title);
                setImage(product.image);
            }
        }
    }, [dispatch, history, product, sku, successUpdate, successCreate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (sku === "null") {
            console.log("create")
            dispatch(
                createProduct({
                    title,
                    image,
                })
            );
        } else {
            console.log("update")
            dispatch(
                updateProduct({
                    sku,
                    title,
                    image,
                })
            );
        }
    };

    const uploadFileHandler = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const {data} = await axios.post("/api/upload", formData, config);

            setImage(data);
            setUploading(false);
        } catch {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <>
            <Link to="/" className="btn btn-light my3">
                Go Back
            </Link>
            <FormContainer>
                <h1>{sku === "null" ? "Create" : "Update"} Product</h1>
                {sku !== "null" && loadingUpdate && <Loader/>}
                {sku !== "null" && errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {sku === "null" && loadingCreate && <Loader/>}
                {sku === "null" && errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id="image-file"
                                label="Choose File"
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            {sku === "null" ? "Create" : "Update"}
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}
