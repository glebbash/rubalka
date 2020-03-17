import React from "react";
import { Product as ProductInfo } from "../../../shared/api/Product";

export type ProductProps = ProductInfo;

export function Product(props: ProductProps) {
    return (
        <div className="text-center">
            <div className="position-relative d-inline-block">
                <i className="material-icons top-right p-2">favorite_border</i>
                <img width="120" height="160" alt="" src={props.image}></img>
            </div>
            <a href={"/product/" + props.id} className="text-center d-block">{props.name}</a>
            <div>{props.price}</div>
        </div>
    );
}