import express from 'express';
import path from 'path';

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (_req, res) => {
    const list = buildArray(20, () => 1 + Math.floor(Math.random() * 10));
    console.log(list);
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

function buildArray<T>(len: number, each: (index: number) => T): T[] {
    const res = [];
    for (let i = 0; i < len; i++) {
        res.push(each(i));
    }
    return res;
}