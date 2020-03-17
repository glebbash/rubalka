import express, { Router } from 'express';
import { MongoClient } from "mongodb";
import path from 'path';
import { Product } from "../shared/api/Product";
import { Category } from "../shared/api/Category";

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://root:pass@cluster-1-iqrcj.mongodb.net/test?retryWrites=true&w=majority";

type Promo = {
    name: string,
    ids: string[],
}

type CategoryMapping = {
    id: string,
    name: string,
}

const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// https://images-na.ssl-images-amazon.com/images/I/31XUxbr1fnL._SL500_AC_SS350_.jpg

(async () => {
    await client.connect();

    const db = client.db("rubalka"),
        categoriesCollection = db.collection<CategoryMapping>("categories"),
        promosCollection = db.collection<Promo>("promos"),
        productsCollection = db.collection<Product>("products");

    express()
        // Serve the static files from the React app
        .use(express.static(path.join(__dirname, '../client/build')))
        .use("/api", Router()
            .get("/categories", async (_req, res) => {
                const categories = await
                    categoriesCollection
                        .find()
                        .toArray();

                res.json(categories);
            })
            .get('/categories/:id', async (req, res) => {
                const id = req.params.id;
                const category = await
                    categoriesCollection
                        .findOne({ id });

                if (category !== null) {
                    const name = category.name;
                    const products = await
                        productsCollection
                            .find({ category: id })
                            .toArray();

                    res.json(<Category>{
                        name,
                        products,
                    });
                }
            })
            .get('/promos', async (_req, res) => {
                const promoNames = await
                    promosCollection
                        .find()
                        .map(x => x.name)
                        .toArray();

                res.json(promoNames);
            })
            .get('/promos/:id', async (req, res) => {
                const id = req.params.id;

                const promo = await
                    promosCollection
                        .findOne({ name: id });

                if (promo !== null) {
                    const { name, ids } = promo;
                    const products: Product[] = [];

                    for (let id of ids) {
                        const product = await
                            productsCollection
                                .findOne({ id });

                        if (product !== null)
                            products.push(product);
                    }

                    res.json(<Category>{
                        name,
                        products,
                    });
                }
            })
            .get('/products/:id', async (req, res) => {
                const id = req.params.id;
                const product = await
                    productsCollection
                        .findOne({ id });

                res.json(product);
            })
            .get('/search', async (req, res) => {
                const query = req.query.q;

                const products = await
                    productsCollection
                        .find({ name: { $regex: query, $options: "i" } })
                        .toArray();

                res.json(<Category>{
                    name: `Search results for '${query}'`,
                    products,
                });
            })
        )
        // Handles any requests that don't match the ones above
        .get('*', (_req, res) => {
            res.sendFile(path.join(__dirname + '../client/build/index.html'));
        })
        .listen(PORT);

    console.log('App is listening on port ' + PORT);
})();