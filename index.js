const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//use midlewares
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jubair1:kvTt4bMebEaqbxRY@cluster0.phm7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("warehouse").collection("products");

        // add to inventory api
        app.post('/add-products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send({ result })
        })

        // get the products api
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

    }
    finally {
        // do some thing
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("welcome to my warehous-management-systems")
})

app.listen(port, () => {
    console.log('Server is running at ', port);
})