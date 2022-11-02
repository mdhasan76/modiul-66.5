const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middlware
app.use(express.json())
app.use(cors());


// userName: Hasan3 
// pass: 38yoH2hzcWlxTbH8 

app.get('/', (req, res) => {
    res.send('Running')
})


app.get('/hack', (req, res) => {
    res.send({ name: 'hacker' })
})

const uri = "mongodb+srv://Hasan3:38yoH2hzcWlxTbH8@cluster0.q1tp36g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const userCollection = client.db("Project3").collection("User");
        const userCollection2 = client.db("Project3").collection("hackStore");
        // const user = {
        //     name: "Hasan",
        //     email: "hasan8064@gmail.com",
        //     password: "123456"
        // }
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.send(result)
        })

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            res.send(user)
        })

        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result)
        })


        app.post('/hack', async (req, res) => {
            const user = req.body;
            const result = await userCollection2.insertOne(user);
            console.log(result)
            res.send(result)
        })

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result)
            console.log(result)
        })

        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true };
            const user = {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                }
            };
            const result = await userCollection.updateOne(filter, user, option);
            // console.log(result)
            res.send(result)

        })
    }
    catch {

    }
}
run().catch(err => console.log(err))





app.listen(port, () => {
    console.log('server is running on port', port)
})