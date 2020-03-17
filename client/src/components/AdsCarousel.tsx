import { Carousel } from "react-bootstrap";
import React from "react";
import palette from "../utils/palette";

const images = palette.map((p, i) => `https://via.placeholder.com/720x220/${p}/ffffff?text=Interesting+ad+%23${i + 1}`);

function carouselItems() {
    return images.map(image =>
        <Carousel.Item key={image}>
            <img
                className="d-block w-100"
                src={image}
                alt="First slide"
            />
            {/* <Carousel.Caption>
                    <h3>#{index + 1} slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
        </Carousel.Item>
    );
}

type AdsCarouselProps = {
    controls: boolean
}

export function AdsCarousel(props: AdsCarouselProps) {
    return (
        <Carousel controls={props.controls} indicators={false} className="m-0 m-lg-4">
            {carouselItems()}
        </Carousel>
    );
}