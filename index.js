const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://jubair1:kvTt4bMebEaqbxRY@cluster0.phm7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("warehouse").collection("products");

        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
        // const pd = {
        //     name: 'laptop',
        //     price: 200
        // }

        // const result = await productCollection.insertOne(pd);
        // console.log("pd added");

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