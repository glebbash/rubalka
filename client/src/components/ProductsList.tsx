import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Product, ProductProps } from "./Product";
import { Category } from "../../../shared/api/Category";
import { take } from "../utils/arrays";

function products(products: ProductProps[], max?: number) {
    if (max === undefined || max > products.length) {
        max = products.length;
    }
    return take(max, products).map((product) => (
        <Col key={product.id}>
            <Product {...product} />
        </Col>
    ));
}

type ProductsListProps = {
    url: string,
    max?: number
};

export function ProductsList(props: ProductsListProps) {
    const [category, setCategory] = useState<Category | null>(null);

    fetch(props.url)
        .then(res => res.json())
        .then(setCategory);

    if (category === null) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Container>
            <div className="p-2 font-weight-bold">{category.name}</div>
            <Row>
                {products(category.products, props.max)}
            </Row>
        </Container>
    );
}