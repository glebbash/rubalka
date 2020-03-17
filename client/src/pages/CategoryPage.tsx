import { useParams, useLocation } from "react-router";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Categories } from "../components/Categories";
import { ProductsList } from "../components/ProductsList";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function CategoryPage() {
    const { id } = useParams();
    const query = useQuery().get("q");

    const url = (query === null)
        ? `/api/categories/${id}`
        : `/api/search?q=${query}`;

    return (
        <Container fluid className="fh">
            <Row className="h-100">
                <Col xs={3} className="pl-4 pt-2 d-none d-md-block">
                    <Categories />
                </Col>
                <Col xs={0} style={{ backgroundColor: "gray", width: "1px" }}></Col>
                <Col className="p-0">
                    <ProductsList url={url} />
                </Col>
            </Row>
        </Container>
    );
}