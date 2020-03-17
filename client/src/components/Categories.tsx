import React, { useState } from "react";

type Category = {
    id: number,
    name: string
}

export function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    fetch("/api/categories")
        .then(res => res.json())
        .then(setCategories);

    if (categories.length === 0) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (<div>{
        categories.map(cat =>
            <div key={cat.id} className="p-1 align-middle">
                <i className="material-icons d-inline align-middle">category</i>
                <a className="text-center p-1 d-inline align-middle" href={"/category/" + cat.id}>{cat.name}</a>
            </div>
        )
    }</div>);
}