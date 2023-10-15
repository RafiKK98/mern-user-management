const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const usersCollection = client.db('usersDB').collection('users');

        // Get routes
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id)};
            const result = await usersCollection.findOne(filter);
            res.send(result);
        })

        // Post routes
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

        // Put route
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const currentUser = req.body;
            const filter = { _id: new ObjectId(id)};
            const updatedUser = {
                $set: {
                    name: currentUser.name,
                    email: currentUser.email,
                    gender: currentUser.gender,
                    status: currentUser.status
                }
            }
            const options = { upsert: true}
            const result = await usersCollection.updateOne(filter, updatedUser, options)
            res.send(result);
        })

        // Delete route
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id)};
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server running!')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})