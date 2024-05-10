const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

console.log(process.env.MONGO_URI)
const app = express();
const port = 3000;
app.use(bodyparser.json())
app.use(cors())


client.connect();
console.log('Connected successfully to server');


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.find({}).toArray();
    res.json(findresult)
})
// save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.insertOne(password);
    res.send({ success: true })
})
//delete password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.deleteOne(password);
    res.send({ success: true })
})

app.listen(port, () => {
    console.log(`app is listen at ${port}`)
})