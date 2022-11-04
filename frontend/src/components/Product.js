import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Product({product}) {
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
                </Link>
            </Card.Body>
        </Card>
    );
}
