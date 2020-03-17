import React, { useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { Categories } from "../components/Categories";
import { Product } from "../../../shared/api/Product";

function showInfo(product: Product | null) {
    if (product === null) {
        return (
            <div className="p-4">
                Loading...
            </div>
        );
    }
    return (
        <div className="m-4">
            <div className="font-weight-bold">{product.name} (id: {product.id}, cat: {product.category})</div>
            <img width="240" height="320" src={product.image} alt="" />
            <div className="font-weight-bold">{product.price}</div>
        </div>
    );
}

export function ProductPage() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    fetch('/api/products/' + id)
        .then(res => res.json())
        .then(setProduct);

    return (
        <Container fluid className="fh">
            <Row className="h-100">
                <Col xs={3} className="pl-4 pt-2 d-none d-md-block">
                    <Categories />
                </Col>
                <Col xs={0} style={{ backgroundColor: "gray", width: "1px" }}></Col>
                <Col className="p-0">
                    {showInfo(product)}
                </Col>
            </Row>
        </Container>
    );
}