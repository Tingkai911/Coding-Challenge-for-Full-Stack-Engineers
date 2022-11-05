import React from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

export default function Product({product, deleteHandler}) {
    return (
        <Card className="my-3 py-3">
            <Link to={`/product/${product.sku}`}>
                <Card.Img src={product.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product.sku}`}>
                    <Card.Title as="div">
                        <strong>{product.title}</strong>
                    </Card.Title>
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
                </Link>
            </Card.Body>
        </Card>
    );
}
