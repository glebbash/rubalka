import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Categories } from '../components/Categories';
import { useMediaQuery } from 'react-responsive';
import { ProductsList } from '../components/ProductsList';
import { AdsCarousel } from '../components/AdsCarousel';

function useTrioSize<T>(smVal: T, mdVal: T, lgVal: T): T {
    const large = useMediaQuery({ minWidth: 1280 });
    const medium = useMediaQuery({ minWidth: 720 });

    return large ? lgVal
        : medium ? mdVal
            : smVal;
}

export function HomePage() {
    const carouselControls = useTrioSize(false, true, true);
    const showAmount = useTrioSize(2, 4, 6);

    const [ids, setIds] = useState([]);

    fetch("/api/promos")
        .then(res => res.json())
        .then(setIds);

    return (
        <Container fluid className="fh">
            <Row className="h-100">
                <Col xs={3} className="pl-4 pt-2 d-none d-md-block">
                    <Categories />
                </Col>
                <Col xs={0} style={{ backgroundColor: "gray", width: "1px" }}></Col>
                <Col className="p-0">
                    <AdsCarousel controls={carouselControls} />
                    {
                        ids.map(id =>
                            <ProductsList
                                key={id}
                                url={"/api/promos/" + id}
                                max={showAmount} />
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
}